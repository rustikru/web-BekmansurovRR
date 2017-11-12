<?php
	require_once( "block/bd.php" );
	require_once("lib/phpQuery-onefile.php");
	require_once("lib/simple_html_dom.php");
// парсер с помощью библиотеки simple_html_dom
function run_pars_dom () {
	$pagesCount=3;
	$i = 1;
	$products = array();
	$c = 0;
	do { 
		# Адресс сайта
		//$url = "https://biggeek.ru/catalog/cmartfony-xiaomi";
		$url = "https://biggeek.ru/catalog/noutbuki-apple?page=".$i;
		//echo $url;
		$html = file_get_html($url);
		foreach($html->find('div.item-wrap') as $product) {
			foreach($product->find('img') as $img){
				$products[$c]['imgUrl'] = $img->src;
				$products[$c]['name'] = $img->alt;
				//echo $img->alt;
			}
			foreach($product->find('div.price') as $price){
				if(empty($products[$c]['price'])) { 
					foreach($price->find('del') as $del){
						$products[$c]['price_del'] = trim($del->innertext());
					}
					foreach($price->find('ins') as $ins){
						$products[$c]['price_ins'] = trim($ins->innertext());
					}
				}
			}
			$c++;
		}
		$i++;
	} while($i<=$pagesCount);
	$r = mysql_query ("delete from tovar");
	foreach ($products as $key => $value) {
		$name=$products[$key]['name'];
		$imgUrl=$products[$key]['imgUrl'];
		$price_del=0;
		if (isset($products[$key]['price_del'])) { 
			$price_del = floatval(preg_replace("/[^-0-9\.]/","",$products[$key]['price_del']));
		}
		$price_ins= 0;
		if (isset($products[$key]['price_ins'])) { 
			$price_ins= floatval(preg_replace("/[^-0-9\.]/","",$products[$key]['price_ins']));
		} else $price_ins= 0;
		$r = mysql_query ("insert into tovar (name, imgurl, price_del, price_ins) values ('".$name."','".$imgUrl."',".$price_del.",".$price_ins.")");
	}
	//print_r($products);
};
// парсер с помощью регулярных выражений
function preg_rep(){
	$tovar = array();
	$html = file_get_contents("https://biggeek.ru/catalog/noutbuki-apple?page=1");
	preg_match_all("|<div class=\"item-wrap\">.+?<a.+?class=\"img\">.+?<img src=\"(.+?)\".+?>.+?</a>.+?<div class=\"item-info\">.+?<a.+?>(.+?)</a>.+?<div class=\"price\">.+?<ins>(.+?),-</ins>.+?</div>.+?</div>.+?</div>|s", $html, $tovar, PREG_SET_ORDER);
	//var_dump($tools);
	
	foreach ( $tovar as $item ) {
		$name=$item[2];
		$imgUrl=$item[1];
		$price_ins= 0;
		$price_del= 0;
		if (isset($item[3])) { 
			$price_ins= floatval(preg_replace("/[^-0-9\.]/","",$item[3]));
		} else $price_ins= 0;
		$r = mysql_query ("insert into tovar (name, imgurl, price_del, price_ins) values ('".$name."','".$imgUrl."',".$price_del.",".$price_ins.")");
	}
}
?>


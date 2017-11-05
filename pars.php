<?php
	require_once( "block/bd.php" );
	require_once("lib/phpQuery-onefile.php");
	require_once("lib/simple_html_dom.php");
function run_pars_phpquery(){
	$i = 1;
	$products = array();
	$pagesCount=1;
	$c = 0;
	do { 
		$url = "https://biggeek.ru/catalog/cmartfony-xiaomi";
		//echo $url;
		$html = file_get_contents($url);
		phpQuery::newDocument($html);
		foreach(pq('div.item-wrap') as $product){
			$products[$c]['img'] = pq($product)->find('a')->attr('href');
			$products[$c]['imgUrl'] = pq($product)->find('img')->attr('src');
			$products[$c]['name'] = pq($product)->find('img')->attr('alt');
			if(empty($products[$c]['price'])) { 
				$products[$c]['price_del'] = pq($product)->find('del')->text();
				$products[$c]['price_ins'] = pq($product)->find('ins')->text(); 
				$products[$c]['price_del'] = trim($products[$c]['price_del']);
				$products[$c]['price_ins'] = trim($products[$c]['price_ins']);
			}
			$c++;
		}
		$i++;
	} while($i<=$pagesCount);
	//$r = mysql_query ("delete from tovar");
	foreach ($products as $key => $value) {
		$name=$products[$key]['name'];
		$imgUrl=$products[$key]['imgUrl'];
		$price_del = floatval(preg_replace("/[^-0-9\.]/","",$products[$key]['price_del']));
		if ($price_del ==''){
			$price_del=0;
		}
		$price_ins= floatval(preg_replace("/[^-0-9\.]/","",$products[$key]['price_ins']));
		$r = mysql_query ("insert into tovar (name, imgurl, price_del, price_ins) values ('".$name."','".$imgUrl."',".$price_del.",".$price_ins.")");
	}
	//print_r($products);
}
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
function preg_rep(){
	$pagesCount=1;
	$i = 1;
	$products = array();
	$c = 0;
	//do { 
		#адресс сайта
		$url = "https://biggeek.ru/catalog/noutbuki-apple?page=1";//.$i;
		$html = file_get_contents($url);
		preg_match("/<div.item-wrap.'\/(.*?)<\/a>/", $html, $text);
		var_dump($text);
	//	$i++;
	//} while($i<=$pagesCount);
}
run_pars_dom();
//run_pars_phpquery();
?>


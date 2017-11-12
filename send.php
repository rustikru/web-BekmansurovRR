<?php
	require_once( "block/bd.php" );
	require_once("pars.php"); // файл с парсером
	$res='';
// функция обработки строки
function StrProcess($str)
{
      $str= stripslashes($str); // удаляем слэши
      $str= trim($str); // удаляем пробелы по бокам
      $str= htmlspecialchars($str); // переводим HTML в текст
      $str= preg_replace("~ +~", " ", $str); // множественные пробелы 

      return $str;
}
if ($_GET['action'] =='add'){
	$pname = '';
	$pemail='';
	$ptext='';
	if (isset($_POST['pname'])) {
		$pname = $_POST['pname'];
	} else {$pname = '';}
		
	if (isset($_POST['pemail'])) {
		$pemail = $_POST['pemail'];
	} else {$pemail = '';}
		
	if (isset($_POST['ptext'])) {
		$ptext = $_POST['ptext'];
	} else {$ptext = '';}
	
	if ($ptext =='' && $ptext =='' && $ptext ==''){
		$res = 'Не введены обязательные поля.';
	} else {
		$pname= StrProcess($pname); // обработка переменной
		$ptext= StrProcess($ptext); // обработка переменной
			
		// посылаем запрос на вставку данных в таблицу
		$r = mysql_query("insert into reedback (fio, email, text) values ('".$pname."','".$pemail."','".$ptext."')");
		if ($r == 'true') {
			$res = $pname.", cпасибо за ваше мнение!";
		} else {
			$res = "Возникла ошибка!".mysql_error();
		}
	}
	echo "<script type= 'text/javascript'> 
				 alert('".$res."');
			 document.location.href = 'http://localhost:8888/pstu/web2/contact.html'; 
		 </script>";
	exit;
}
if ($_GET['action']=='parser'){
	run_pars_dom();
	$result = mysql_query("select * from tovar");
	if (!$result)
	{
		exit(mysql_error());
	}
	while ($row = mysql_fetch_assoc($result)) {
		$rows[] = $row;
	}
	$res = json_encode($rows, JSON_UNESCAPED_UNICODE);
}

echo $res;
?>


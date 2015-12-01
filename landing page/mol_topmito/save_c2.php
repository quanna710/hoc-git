<?php

    require_once("Rest_client/Topica_Rest_Client.php");
    $config = array(
        'server' => 'http://mol.local.topicanative.edu.vn',
        'api_key' => 'SSeKfm7RXCJZxnFUleFsPf63o2ymZ93fWuCmvCjq',
        'api_name' => 'key',
        'http_user' => 'admin',
        'http_pass' => 'admin',
        'http_auth' => 'basic'
    );
    $restClient = new Topica_Rest_Client($config);
    $uri = "contact_collection_api/add";
    $param = array(
        'id_camp_landingpage' => isset($_GET["id"]) ? $_GET["id"] : "-100",
        'domain' => "http://$_SERVER[HTTP_HOST]" . $_SERVER["REQUEST_URI"],
        'http_referer' => $_SERVER["HTTP_REFERER"],
        'preview' => isset($_GET["preview"]) ? $_GET["preview"] : "-100",
        'code_chanel' => isset($_GET["code_chanel"]) ? $_GET["code_chanel"] : "-100",
		'ip' => $_SERVER['REMOTE_ADDR'],
    );
		//session_start(); 
	// store session data
//if(isset($_SESSION['views'])){
	//	unset($param['http_referer']);
	//}else{
//		$_SESSION['views']=1;
	//}

    $result = $restClient->post($uri, $param);
	//$result = $restClient->debug($uri, $param);
	
    //echo '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">';
    //echo "<pre>";
   // print_r($result);


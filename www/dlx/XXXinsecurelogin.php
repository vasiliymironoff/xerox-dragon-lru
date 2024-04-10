<?php

	//
	// insecurelogin.php
	//
	// Copyright (C) 2021 Edsko de Vries and jones@scss.tcd.ie
	//
	// 18/06/21 first version
	//

	session_name("dlx");
	session_start();

 	$_SESSION["username"] = "dlxmanager";
 	$_SESSION["userid"] = 1;

?>

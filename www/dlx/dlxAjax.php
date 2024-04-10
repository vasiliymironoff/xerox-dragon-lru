<?php

	//
	// ajax.php
	//
	// Copyright (C) 2021 - 2022 Edsko de Vries and jones@scss.tcd.ie
	//
	// 01/06/21 first version
	// 16/06/21 used transactions where appropriate
	// 17/06/21 integrate dlxmanager support
	//
	// returns state eg exit("1")
	//
	// state = 0 register or login
	// state = 1 failed to register or login
	// state = 2 save or load
	// state = 3 set password
	// state = 4 dlxmanager
	//
	// ops register, unregister, login, logout, save, getConfigs, deleteConfig and setPassword
	//
	// security
	//
	// empty index.htm file so contents of dlx directory cannot be listed
	// strings protected by patterns, htmlspecialchars() and $mysqli->real_escape_string()
	//

	session_name("dlx");
	session_start();

	function getUserid() {
		return isset($_SESSION["userid"]) ? $_SESSION["userid"] : 0;
	}

	include("setup.php");

	if ($_POST["op"] == "register") {

		if (!isset($_POST["username"]) || !isset($_POST["password"]))
			exit("1");

		$username = $mysqli->real_escape_string($_POST["username"]);
		$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

		$userid = crc32(microtime());	// random userid

		if (!$mysqli->query("INSERT INTO dlxusers SET username = '$username', password = '$password', created = NOW(), userid = $userid, configs = 0"))
			exit("1");			// username or userid already in table

 		$_SESSION["username"] = $username;
 		$_SESSION["userid"] = $userid;

 		exit("2");	// OK

	} else if ($_POST["op"] == "unregister") {

		$userid = getUserid();

		$mysqli->report_mode = MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT;
		try {
			$mysqli->begin_transaction();
			$mysqli->query("DELETE FROM dlxusers WHERE userid = $userid");
			if ($mysqli->affected_rows == 0)
				throw new mysqli_sql_exception("affected_rows == 0");
			$mysqli->query("DELETE FROM dlxconfigs WHERE userid = $userid");
			$mysqli->commit();
		} catch (mysqli_sql_exception $e) {
			$mysqli->rollback();
		}
		$mysqli->report_mode = MYSQLI_REPORT_OFF;
		session_unset();
		exit("0");

	} else if ($_POST["op"] == "login") {

		if (!isset($_POST["username"]) || !isset($_POST["password"]))
			exit("1");

		$username =  $mysqli->real_escape_string($_POST["username"]);
		$password = $_POST["password"];

		$res = $mysqli->query("SELECT userid, password FROM dlxusers WHERE username = '$username'");

		if ($res->num_rows == 1) {
		 	$row = $res->fetch_array(MYSQLI_NUM);
			if (password_verify($password, $row[1])) {
	 			$_SESSION["username"] = $username;
	 			$_SESSION["userid"] = $row[0];
	 			exit("2");	// OK
	 		} else {
	 			exit("1");	// incorrect password
	 		}
		}
		exit("1");			// username not found

	} else if ($_POST["op"] == "logout") {

		session_unset();
		exit("0");

	} else if ($_POST["op"] == "save") {

		$r = 2;	// OK

		if (!isset($_POST["name"]) || !isset($_POST["config"]))
			exit("$r");

		$userid = getUserid();
		$name =  $mysqli->real_escape_string($_POST["name"]);
		$description =  $mysqli->real_escape_string($_POST["description"]);
		$config =  $_POST["config"];

		$mysqli->report_mode = MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT;
		try {
			$mysqli->begin_transaction();
			$res = $mysqli->query("SELECT * FROM dlxusers WHERE userid = $userid FOR UPDATE");
			if ($res->num_rows == 0)
				throw new mysqli_sql_exception("num_rows == 0");
			$mysqli->query("REPLACE INTO dlxconfigs SET userid = $userid, name = '$name', description = '$description', config = '$config', count = 1");
			if ($mysqli->affected_rows == 1)
				$mysqli->query("UPDATE dlxusers SET configs = configs + 1 WHERE userid = $userid" );
			$mysqli->commit();
		} catch (mysqli_sql_exception $e) {
		    $mysqli->rollback();
		    session_unset();
		    $r = 1;
		}
		$mysqli->report_mode = MYSQLI_REPORT_OFF;
		exit("$r");

	} else if ($_POST["op"] == "getConfigs") {

		$str = "<i>None</i>";

		$userid = getUserid();
		$save = $_POST["save"];

		$res = $mysqli->query("SELECT name, description, count, DATE_FORMAT(lastused, '%d-%b-%y %T'), config FROM dlxconfigs WHERE userid = $userid ORDER BY name ASC");
		if ($res->num_rows > 0) {
			$str = "<tr><th>name</th><th>description</th><th>count</th><th style=\"width:8em;\">last used</th><th></th></tr>";
			while ($row = $res->fetch_array(MYSQLI_NUM)) {
				$str .= "<tr><td class=\"name\" id=\"$row[0]\">";
				if ($save) {
					$str .= htmlspecialchars($row[0]);
				} else {
					$str.= "<a href=play.php?name=" . urlencode($row[0]) . " title='load configuration \"$row[0]\"'>" . htmlspecialchars($row[0]) . "</a>";
				}
				$str .= "</td><td>$row[1]</td><td>$row[2]</td><td>$row[3]</td>";
				$str .= "<td><a href=javascript:deleteConfig(\"" . urlencode($row[0]) . "\")><img src=\"delete-16.png\" title='delete configuration \"" . htmlspecialchars($row[0]) . "\"'></a></td></tr>";
			}
		}
		exit($str);

	} else if ($_POST["op"] == "deleteConfig") {

		$userid = getUserid();
		$name = urldecode($_POST["name"]);

		$mysqli->report_mode = MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT;
		try {
			$mysqli->begin_transaction();
			$res = $mysqli->query("SELECT * FROM dlxusers WHERE userid = $userid FOR UPDATE");
			if ($res->num_rows == 0)
				throw new mysqli_sql_exception("num_rows == 0");
			$mysqli->query("DELETE FROM dlxconfigs WHERE userid = $userid AND name = '$name'");
			$mysqli->query("UPDATE dlxusers SET configs = configs - 1 WHERE userid = $userid" );
			$mysqli->commit();
		} catch (mysqli_sql_exception $e) {
		    $mysqli->rollback();
		}
		$mysqli->report_mode = MYSQLI_REPORT_OFF;
		exit("2");

	} else if ($_POST["op"] == "setPassword") {

		$userid = getUserid();
		$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

		$mysqli->query("UPDATE dlxusers SET password = '$password' WHERE userid = $userid");

		exit("2");		// SAVEORLOAD

	}

?>

<?php

	//
	// ajax.php
	//
	// Copyright (C) 2021 - 2022 Edsko de Vries and jones@scss.tcd.ie
	//
	// 01/06/21 first version
	// 16/06/21 used transactions where appropriate
	// 14/12/21 allow sorting of getUsers columns
	//
	// returns state eg exit("1")
	//
	// state = 0 register or login
	// state = 1 failed to register or login
	// state = 2 logged in
	//
	// ops register, unregister, login, logout, save, getConfigs, deleteConfig and setPassword
	//
	// security
	//
	// empty index.htm file so contents of dlx directory cannot be listed
	// strings protected by patterns, htmlspecialchars() and $mysqli->real_escape_string()
	//

	session_name("dlxmanager");
	session_start();

	if (!isset($_POST["op"]))
		exit("0");

	include("setup.php");

	//
	// check dlxmanager logged in
	//
	if ($_POST["op"] != "login") {
		if (!isset($_SESSION["userid"]))
			exit("0");
		$res = $mysqli->query("SELECT userid FROM dlxusers WHERE username = 'dlxmanager'");
		if ($res->num_rows != 1)
			exit("0");
		$row = $res->fetch_array(MYSQLI_NUM);
		if ($row[0] != $_SESSION["userid"])
			exit("0");
	}

	if ($_POST["op"] == "login") {

		if (!isset($_POST["username"]) || !isset($_POST["password"]))
			exit("1");

		if ($_POST["username"] != "dlxmanager")
			exit("1");

		$password = $_POST["password"];

		$res = $mysqli->query("SELECT userid, password FROM dlxusers WHERE username = 'dlxmanager'");

		if ($res->num_rows == 1) {
		 	$row = $res->fetch_array(MYSQLI_NUM);
			if (password_verify($password, $row[1])) {
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

	} else if ($_POST["op"] == "getUsers") {

		if (!$res = $mysqli->query("SELECT username, userid, DATE_FORMAT(created, '%d-%b-%y %T'), DATE_FORMAT(lastused, '%d-%b-%y %T'), configs FROM dlxusers " . $_POST["sortby"]))
			exit("<i>None</i>");

		$str = "<tr><th onclick='javascript:getUsers(\"ORDER BY username ASC\")' >username</th><th onclick='javascript:getUsers(\"ORDER BY userid ASC\")'>userid</th><th onclick='javascript:getUsers(\"ORDER BY created ASC\")'>created</th><th onclick='javascript:getUsers(\"ORDER BY lastused ASC\")'>last used</th><th onclick='javascript:getUsers(\"ORDER BY configs ASC\")'>configs</th><th></th><th></th></tr>";
		while ($row = $res->fetch_array(MYSQLI_NUM)) {
			$str .= "<tr><td><a href='javascript:getConfigs(\"$row[0]\", $row[1])' title=\"list saved configurations for $row[0]\")>$row[0]</a></td><td style=\"text-align:right;\">$row[1]</td><td>$row[2]</td><td>$row[3]</td><td style=\"text-align:right;\">$row[4]</td>";
			if ($row[0] == "dlxmanager") {
				$str .= "<td></td><td></td></tr>";	// {joj 10/12/21}
			} else {
				$str .= "<td><a href='javascript:setPassword(\"$row[0]\", $row[1])'>set password</a></td><td><a href='javascript:deleteUser(\"$row[0]\", $row[1])'><img src=\"delete-16.png\" title=\"delete user $row[0]\"></a></td></tr>";
			}
		}
		exit($str);

	} else if ($_POST["op"] == "deleteUser") {

		$userid = $_POST["userid"];

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
		//session_unset();
		exit("0");

	} else if ($_POST["op"] == "getConfigs") {

		$userid = $_POST["userid"] + 0;	//NB convert to an integer

		$str = "<i>None</i>";

		$res = $mysqli->query("SELECT name, description, count, DATE_FORMAT(lastused, '%d-%b-%y %T'), config FROM dlxconfigs WHERE userid = $userid ORDER BY name ASC");
		if ($res->num_rows > 0) {
			$str = "<tr><th>name</th><th>description</th><th>count</th><th style=\"width:8em;\">last used</th><th></th></tr>";
			while ($row = $res->fetch_array(MYSQLI_NUM)) {
				$str .= "<tr><td class=\"name\" id=\"$row[0]\">";
				$str .= htmlspecialchars($row[0]);
				$str .= "</td><td>$row[1]</td><td>$row[2]</td><td>$row[3]</td>";
				$str .= "<td><a href='javascript:deleteConfig($userid, \"" . urlencode($row[0]) . "\")'><img src=\"delete-16.png\" title='delete configuration \"" . htmlspecialchars($row[0]) . "\"'></a></td></tr>";
			}
		}
		exit($str);

	} else if ($_POST["op"] == "deleteConfig") {

		$userid = $_POST["userid"];
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

		$userid = $_POST["userid"];
		$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

		$mysqli->query("UPDATE dlxusers SET password = '$password' WHERE userid = $userid");

		exit("2");		// LOGGEDIN

	} else {

		exit("0");

	}

?>

<?php

	//
	// setup.php
	//
	// Copyright 2021 - 2022 jones@scss.tcd.ie
	//
	// 25/05/21 first version
	// 29/06/21 random userids
	//
	// mariadb configuration
	//

	//
	// some useful myqsl commands
	//
	// $mysql -h macneill -p jonesdb
	//
	// > show tables;
	// > drop table dlxusers;
	// > describe `MIPS programs`;
	// > select * from `MIPS programs` where username like "edsko%";
	// > select * from dlxconfigs where userid = 1;
	// > delete from dlxconfigs where userid = 1;
	//

	$host = "macneill";
	$user = "jones";
	$password = "Vivio303";
	$db = "jones_db";

	$master = "Avsp303";

	$mysqli = new mysqli($host, $user, $password, $db);

	if ($mysqli->connect_errno)
  		exit("Failed to connect to MySQL: " . $mysqli->connect_error);

	if (0) {	// change to 0 instead of commenting out code

  		$userid = crc32(microtime());	// random dlxmanager userid

		//
		// create dlxusers table
		//
		if ($mysqli->query("CREATE TABLE dlxusers (username VARCHAR(256) PRIMARY KEY NOT NULL, password VARCHAR(256) NOT NULL, created DATETIME, lastused TIMESTAMP, userid INTEGER UNSIGNED UNIQUE KEY NOT NULL, configs INTEGER)")) {

			//
			// usernames and userids will be unique (PRIMARY KEY and UNIQUE)
			// userids generated using php instead of mariadb CRC32(NOW96))
			// insert dlxmanager and get userid
			// use dlxmanager userid for edsko's tutorials
			//
			if (!$mysqli->query("INSERT INTO dlxusers SET username = 'dlxmanager', password = '"  . password_hash($password, PASSWORD_DEFAULT) . "', created = NOW(), userid = $userid, configs = 0"))
			 	exit("Unable to insert entry into dlxusers: " . $mysqli->error . "<br>");

		} else {
			exit("Unable to create table dlxusers: " . $mysqli->error . "<br>");
		}

		echo("dlxusers table created<br>");

		//
		// create dlxconfigs table from original "MIPS programs" table
		// transfer selected data
		// configurations assigned to dlxmanager (userid = 1)
		//
		if ($mysqli->query("CREATE TABLE dlxconfigs (userid INTEGER UNSIGNED NOT NULL, name VARCHAR(256) NOT NULL, description TEXT, config TEXT NOT NULL, count INTEGER, lastused TIMESTAMP, PRIMARY KEY(userid, name))")) {

			// transfer tcd/edsko configurations from MIPS programs

			//
			// get data from MIPS programs
			//
			$res = $mysqli->query("SELECT username, name, description, state, count FROM `MIPS programs` WHERE username LIKE 'tcd/edsko%'");

			//
			// insert into dlxconfigs
			//
			while ($row = $res->fetch_array(MYSQLI_NUM)) {
				$config = str_replace("'", "", $row[3]);
				if (!$mysqli->query("INSERT INTO dlxconfigs SET userid = $userid, name = '" . $row[1] . "', description = " . "'" . $mysqli->real_escape_string($row[2]) . "', config = " . "'" . $mysqli->real_escape_string($config) . "', count = $row[4], lastused = NOW()")) {
					echo("Unable to insert entry into dlxconfigs: " . $mysqli->error . "<br>");
				}
			}

			//
			// set number of configs
			//
			$mysqli->query("UPDATE dlxusers SET configs = " . $res->num_rows . " WHERE userid = $userid" );

			$res->close();


		} else {
			exit("Unable to create table dlxconfigs: " . $mysqli->error . "<br>");
		}

		echo("dlxconfigs table created<br>");

	}

?>

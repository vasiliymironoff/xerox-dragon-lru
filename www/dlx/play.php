<?php

	//
	// play.php
	//
	// Copyright 2021 - 2022 Edsko de Vries and jones@scss.tcd.ie
	//
	// play.php?tutorial=...			dlxmanager userid
	// play.php?name=...				getUserid
	//
	// 31/05/21 first version
	//

	if (!isset($_GET["tutorial"]) && !isset($_GET["name"])) {
		exit("NO configuration specified");
	}

	session_name("dlx");
	session_start();

	include("setup.php");

	if (!isset($_GET["tutorial"]) && !isset($_GET["name"]))
		exit("NO configuration specified");

	$name = isset($_GET["tutorial"]) ? $_GET["tutorial"] : $_GET["name"];

	if (isset($_GET["tutorial"])) {
		$res = $mysqli->query("SELECT userid FROM dlxusers WHERE username = 'dlxmanager'");
		if (!res)
			exit("NO dlxmanager");
		$row = $res->fetch_array(MYSQLI_NUM);
		$userid = $row[0];
	} else {
		if (!isset($_SESSION["userid"]))
			exit("NOT logged in");
		$userid = $_SESSION["userid"];
	}

	$res = $mysqli->query("SELECT config FROM dlxconfigs WHERE userid = $userid AND name = '$name'");

	if ($res->num_rows == 1) {

		$row = $res->fetch_array(MYSQLI_NUM);

		//
		// update count and lastused timestamp
		//
		$mysqli->query("UPDATE dlxconfigs SET count = count + 1 WHERE userid = $userid AND name = '$name'" );

?>

		<html>

			<head>
				<title>VivioJS DLX/MIPS</title>
				<script src="../funcs.js"></script>
				<script src="../vivio.js"></script>
				<script src="dlx.js"></script>
			</head>

			<body scroll="no" leftmargin=0 rightmargin=0 topmargin=0 bottommargin=0>

				<!-- tabindex needed for keyboard input -->
				<canvas id="canvas" tabindex="1" style="width:100%; height:100%; position:absolute; overflow:hidden; display:block;">
					No canvas support
				</canvas>

				<script>
					args = "<?="name='" . $name . "' "?>" + "<?=$row[0]?>" + " help=0";
					vplayer = new VPlayer("canvas", dlx, args);
					ajaxCounter("vivio", "dlx", 0);
				</script>

			</body>

		</html>

<?php

	} else {

		exit("$mysqli->error");

	}

?>

<?php

	//
	// selectTutorial.php
	//
	// Copyright 2021 - 2022 Edsko de Vries and jones@scss.tcd.ie
	//
	// 06/06/21 first version
	//

	include("setup.php");

?>

<html>

<head>
	<meta charset="utf-8">
	<title>Select DLX/MIPS tutorial</title>
	<meta name="description" content="Select DLX/MIPS tutorial">
	<script src="../funcs.js"></script>
	<style>
  		#configTable tr:nth-child(2n + 2) td {
		  	background-color:#e0e0e0;
  		}
  		#configTable tr:nth-child(2n + 3) td {
			background-color:#c0c0c0;
		}
  		#configTable th {
  			background-color:#00902a;
  			color:white;
  			font-weight:normal;
  			text-align:left;
  			padding-left:5px; padding-right:5px;
  		}
  		#configTable td {
  			padding-left:5px; padding-right:5px;
  		}
		#configTable th:nth-child(1) {
			border-radius:5px 0px 0px 0px;
		}
		#configTable th:nth-last-child(1) {
			border-radius:0px 5px 0px 0px;
		}
		#configTable tr:nth-last-child(1) > td:nth-last-child(1) {
			border-radius:0px 0px 5px 0px;
		}
		#configTable tr:nth-last-child(1) > td:nth-child(1) {
			border-radius:0px 0px 0px 5px;
		}
    </style>
</head>

<body scroll="no" style="margin:0; padding:0;">

	<script>
		header("Select DLX/MIPS Tutorial Configuration");
	</script>

	<table style="width:96%; margin:0 auto;">

		<tr><td style="font-size:large;"><br>Tutorial configurations:</td></tr>

		<tr><td>
			<table id="configTable" style="border-spacing:0;">

<?php
		$res = $mysqli->query("SELECT userid FROM dlxusers WHERE username = 'dlxmanager'");
		if (!res)
			exit("<i>None</i>");
		$row = $res->fetch_array(MYSQLI_NUM);
		$userid = $row[0];

		$res = $mysqli->query("SELECT name, description, count, DATE_FORMAT(lastused, '%d-%b-%y %T') FROM dlxconfigs WHERE userid = $userid ORDER BY name ASC");
		if ($res->num_rows > 0) {
			echo("<tr><th>name</th><th>description</th><th style=\"text-align:center; padding-right:2em;\">count</th><th style=\"width:8em;\">last used</th></tr>");
			while ($row = $res->fetch_array(MYSQLI_NUM)) {
				echo("<tr><td><a href=play.php?tutorial=" . urlencode($row[0]) . ">$row[0]</a></td><td>$row[1]</td><td style=\"text-align:right; padding-right:1em\">" . number_format($row[2]). "</td><td>$row[3]</td></tr>");
			}
		} else {
			echo("<i>None</i>");
		}

?>

			</table>
		</td></tr>

	</table>
	<br>

  <script>
    footer("dlx", 4);	// don't increment counter
  </script>

</body>
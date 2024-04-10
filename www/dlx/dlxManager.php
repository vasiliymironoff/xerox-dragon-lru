<?php

	//
	// dlxmanager.php
	//
	// Copyright (C) 2021 - 2022 jones@scss.tcd.ie
	//
	// 31/05/21 first version
	// 14/12/21 sort getUsers columns
	//
	// state = 0 register or login
	// state = 1 failed to login
	// state = 2 logged in
	//

	session_name("dlxmanager");
	session_start();

	function getUserid() {
		return isset($_SESSION["userid"]) ? $_SESSION["userid"] : 0;
	}

?>

<!DOCTYPE html>

<html lang="en">

<head>
	<meta charset="utf-8">
	<title>DLX/MIPS Manager</title>
	<link rel="shortcut icon" type="image/x-icon" href="../vivio.ico">
	<script src="../funcs.js"></script>
	<style>
  		.dlxdata tr:nth-child(2n + 2) td {
		  	background-color:#e0e0e0;
  		}
  		.dlxdata tr:nth-child(2n + 3) td {
			background-color:#c0c0c0;
		}
  		.dlxdata th {
  			background-color:#00902a;
  			color:white;
  			font-weight:normal;
  			text-align:left;
  			padding-left:5px; padding-right:5px;
  		}
  		.dlxdata td {
  			padding-left:5px; padding-right:5px;
  		}
		.dlxdata th:nth-child(1) {
			border-radius:5px 0px 0px 0px;
		}
		.dlxdata th:nth-last-child(1) {
			border-radius:0px 5px 0px 0px;
		}
		.dlxdata tr:nth-last-child(1) > td:nth-last-child(1) {
			border-radius:0px 0px 5px 0px;
		}
		.dlxdata tr:nth-last-child(1) > td:nth-child(1) {
			border-radius:0px 0px 0px 5px;
		}
    </style>
</head>

<body style="margin:0; padding:0;">

 	<script>

 		//
		// states
		//
		const LOGIN = 0;
		const RELOGIN = 1;
		const LOGGEDIN = 2;

		//
		// if $_SESSION["userid"] is set by another .php script in an attempted security breach,
		// its value will checked by dlxManagerAjax before returning data
		//
 		var state = <?=getUserid()?> ? LOGGEDIN: LOGIN;

		var configusername = "";
		var configuserid = 0;
		var lastsortby = "";

		header("");


	</script>

	<br>
	<table style="width:90%; margin-left:5%;">

		<tr id="formRow"><td><form id="form">
		<table>
			<tr><td colspan="2"><div id="status"></div></td></tr>
			<tr id="usernameRow"><td><label for="username">username&nbsp;&nbsp;</label></td><td><input type="text" id="username" pattern="[\w\.@'+-]+" title="one or more character: a-z A-Z 0-9 . @ ' + _ -"></td></tr>
			<tr id="passwordRow"><td><label id="passwordLabel" for="password">password</label></td><td><input type="password" id="password" pattern=".{6,}" title="at least six characters"></td></tr>
			<tr id="loginRow"><td></td><td><input type="submit" name="login" id="login" value="login"></td></tr>
		</table>
		</form></td></tr>

		<tr id="usersTitleRow"><td><br>Users:</td></tr>

		<tr id="usersTableRow"><td>
			<table id="usersTable" class="dlxdata" style="border-spacing:0;">
			</table>
		</td></tr>

		<tr id="configTitleRow"><td id="configTitle"><br>Saved configurations:</td></tr>

		<tr id="configTableRow"><td>
			<table id="configTable" class="dlxdata" style="border-spacing:0;">
			</table>
		</td></tr>

	</table>

	<script>

		//
		// setState
		//
		function setState() {

			statusDiv.style.display = "none";
			formRow.style.display = "none";
			usernameRow.style.display = "none"
			usernameText.removeAttribute("required");
			passwordRow.style.display = "none"
			passwordText.removeAttribute("required");
			loginRow.style.display = "none"
			usersTitleRow.style.display = "none"
			usersTableRow.style.display = "none"
			configTitleRow.style.display = "none"
			configTableRow.style.display = "none"

			if ((state == LOGIN) || (state == RELOGIN)) {
				subtitleHTML.innerHTML = "DLX/MIPS Manager Login";
				formRow.style.display = "table-row";
				statusDiv.style.display = "block"
				statusDiv.innerHTML = state == LOGIN ? "<div>You need to login</div><br>" : "<div style=\"color:red\">Error: you need to login again</div><br>"
				usernameRow.style.display = "table-row"
				usernameText.setAttribute("required", "");
				passwordRow.style.display = "table-row"
				passwordLabel.innerHTML = "password"
				passwordText.setAttribute("required", "");
				loginRow.style.display = "table-row"
			} else if (state == LOGGEDIN) {
				subtitleHTML.innerHTML = "DLX/MIPS Manager";
				formRow.style.display = "table-row"
				statusDiv.style.display = "block"
				statusDiv.innerHTML = "You are logged in as <b>dlxmanager</b> (<a href=\"javascript:logout()\">logout</a>)"
				usersTitleRow.style.display = "table-row"
				usersTableRow.style.display = "table-row";
				configTitleRow.style.display = "table-row"
				configTableRow.style.display = "table-row";
				getUsers();
				getConfigs();
			}

		}

		//
		// ajax rpc to login
		// called when form submitted
		//
		function login(event) {

			event.preventDefault();

			var request = new XMLHttpRequest();

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					//alert("responseText =" + request.responseText);
					state = request.responseText;
					setState();
				}
			}

			request.open("POST", "dlxManagerAjax.php", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			username = usernameText.value
			request.send("&op=login&username=" + username + "&password=" + password.value)

		}

		//
		// logout
		//
		function logout() {

			var request = new XMLHttpRequest();

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					state = 0;
					setState();
				}
			}

			request.open("POST", "dlxManagerAjax.php", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			request.send("&op=logout");

		}

		//
		// ajax rpc to get users
		//
		function getUsers(sortby = "ORDER BY username ASC") {

			let s = sortby;
			if (lastsortby == sortby) {
				s = s.replace("ASC", "DESC");	// invert sort
			}
			lastsortby = s;

			var request = new XMLHttpRequest();

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					//alert(request.responseText);
					usersTable.innerHTML = request.responseText;
				}
			}

			request.open("POST", "dlxManagerAjax.php", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			request.send("&op=getUsers&sortby=" + s);

		}

		//
		// ajax rpc to get saved configurations
		//
		// NB: setState not called
		//
		function getConfigs(username, userid) {

			if (username === undefined) {
				username = configusername
				userid = configuserid
			} else {
				configusername = username
				configuserid = userid
			}

			if (username.length) {

				var request = new XMLHttpRequest();

				request.onreadystatechange = function() {
					if (request.readyState == 4 && request.status == 200) {
						//alert(request.responseText);
						configTitle.innerHTML = "<br>Saved configurations for <b>" + username + ":<b>";
						configTable.innerHTML = request.responseText;
					}
				}

				request.open("POST", "dlxManagerAjax.php", true);
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.send("&op=getConfigs&userid=" + userid);

			} else {

				configTitle.innerHTML = "<br>Saved configurations:<b>";
				configTable.innerHTML = "";

			}

		}

		//
		// deleteConfig
		//
		function deleteConfig(userid, name) {

			if (confirm("Are your sure you want to delete configuration \"" + name + "\"?")) {

				var request = new XMLHttpRequest();

				request.onreadystatechange = function() {
					if (request.readyState == 4 && request.status == 200) {
						setState();
					}
				}

				request.open("POST", "dlxManagerAjax.php", true);
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.send("&op=deleteConfig&userid=" + userid + "&name=" + name);

			}
		}

		//
		// setPassword
		//
		function setPassword(username, userid) {

			if (newpassword = prompt("Please enter new password for " + username)) {

				if (newpassword.length >= 6) {

					var request = new XMLHttpRequest();

					request.onreadystatechange = function() {
						if (request.readyState == 4 && request.status == 200) {
							setState();
						}
					}

					request.open("POST", "dlxManagerAjax.php", true);
					request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					request.send("&op=setPassword&userid=" + userid + "&password=" + newpassword);

				} else {

					alert("Password needs to have at least 6 characters");

				}

			}

		}

		//
		// deleteUser
		//
		function deleteUser(username, userid) {

			if (confirm("Are your sure you want to delete user " + username + " and saved configurations?")) {

				var request = new XMLHttpRequest();

				request.onreadystatechange = function() {
					if (request.readyState == 4 && request.status == 200) {
						if (username == configusername) {
							configusername = "";
							configuserid = 0;
						}
						setState();
					}
				}

				request.open("POST", "dlxManagerAjax.php", true);
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.send("&op=deleteUser&userid=" + userid);

			}
		}

		subtitleHTML = document.getElementById("subtitle")
		statusDiv = document.getElementById("status")
		fromTable = document.getElementById("formRow")
		usernameRow = document.getElementById("usernameRow")
		usernameText = document.getElementById("username")
		passwordRow = document.getElementById("passwordRow")
		passwordLabel = document.getElementById("passwordLabel")
		passwordText = document.getElementById("password")
		loginRow = document.getElementById("loginRow")
		usersTitleRow = document.getElementById("usersTitleRow")
		usersTableRow = document.getElementById("usersTableRow")
		configTitleRow = document.getElementById("configTitleRow")
		configTitle = document.getElementById("configTitle")
		configTableRow = document.getElementById("configTableRow")
		configTable = document.getElementById("configTable")

		document.getElementById("form").addEventListener('submit', login);

		setState();

	</script>

	<br>
	<script>
    	footer("dlx", 4);	// don't increment counter
    </script>

</body>


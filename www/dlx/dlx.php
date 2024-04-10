<?php

	//
	// dlx.php?config=...
	// dlx.php
	//
	// Copyright (C) 2021 - 2022 Edsko de Vries and jones@scss.tcd.ie
	//
	// 31/05/21 first version
	//
	// save = 0 load saved config
	// save = 1 save config
	//
	// state = 0 register or login
	// state = 1 failed to register or login
	// state = 2 save or load
	// state = 3 set password
	//

	session_name("dlx");
	session_start();

	function getUserid() {
		return isset($_SESSION["userid"]) ? $_SESSION["userid"] : 0;
	}

	function getUsername() {
		return isset($_SESSION["username"]) ? $_SESSION["username"] : "";
	}

?>

<!DOCTYPE html>

<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Save DLX/MIPS configuration</title>
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
		const REGISTERORLOGIN = 0;
		const REREGISTERORLOGIN = 1;
		const SAVEORLOAD = 2;
		const SETPASSWORD = 3;

		var save = <?=isset($_GET["config"]) ? 1 : 0 ?>;
 		var state = <?=getUserid()?> == 0 ? REGISTERORLOGIN : SAVEORLOAD;
 		var username = "<?=getUsername()?>";

		header("");

	</script>

	<br>
	<table style="width:90%;margin-left:5%">

		<tr id="formRow"><td><form id="form">
		<table>
			<tr><td colspan="2"><div id="status"></div></td></tr>
			<tr id="usernameRow"><td><label for="username">username&nbsp;&nbsp;</label></td><td><input type="text" id="username" pattern="[\w\.@'+-]+" title="one or more character: a-z A-Z 0-9 . @ ' + _ -"></td></tr>
			<tr id="passwordRow"><td><label id="passwordLabel" for="password">password</label></td><td><input type="password" id="password" pattern=".{6,}" title="at least six characters"></td></tr>
			<tr id="nameRow"><td><label for="name">Save as</label></td><td><input type="text" id="name" pattern=".+" title="one or more characters"></td></tr>
			<tr id="descriptionRow"><td><label for="description">Description</label></td><td><input type="text" id="description" size=100></td></tr>
			<tr id="loginRow"><td></td><td><input type="submit" name="login" id="login" value="login"></td></tr>
			<tr id="registerRow"><td></td><td><input type="submit" name="register" id="register" value="register"></td></tr>
			<tr id="saveRow"><td></td><td><input type="submit" name="save" id="save" value="save"></td></tr>
			<tr id="setRow"><td></td><td><input type="submit" name="setPassword" id="setPassword" value="set password"></td></tr>
			<tr id="cancelRow"><td></td><td><input type="submit" name="cancel" id="cancel" value="cancel"></td></tr>
		</table>
		</form></td></tr>

		<tr id="configTitleRow"><td><br>Saved configurations:</td></tr>

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
			nameRow.style.display = "none"
			nameText.removeAttribute("required");
			descriptionRow.style.display = "none"
			loginRow.style.display = "none"
			registerRow.style.display = "none"
			saveRow.style.display = "none"
			setRow.style.display = "none"
			cancelRow.style.display = "none"
			configTitleRow.style.display = "none"
			configTableRow.style.display = "none"

			if ((state == REGISTERORLOGIN) || (state == REREGISTERORLOGIN)) {
				subtitleHTML.innerHTML = "DLX/MIPS Login or Register";
				formRow.style.display = "table-row";
				statusDiv.style.display = "block"
				statusDiv.innerHTML = state == REGISTERORLOGIN ? "<div>You need to login or register</div><br>" : "<div style=\"color:red\">Error: you need to login or register again</div><br>"
				usernameRow.style.display = "table-row"
				usernameText.setAttribute("required", "");
				passwordRow.style.display = "table-row"
				passwordLabel.innerHTML = "password"
				passwordText.setAttribute("required", "");
				loginRow.style.display = "table-row"
				registerRow.style.display = "table-row"
			} else if (state == SAVEORLOAD) {
				subtitleHTML.innerHTML = save ? "DLX/MIPS Save Configuration" : "DLX/MIPS Load Configuration";
				formRow.style.display = "table-row"
				statusDiv.style.display = "block"
				statusDiv.innerHTML = "You are logged in as <b>" + username + "</b> (<a href=\"javascript:logout()\">logout</a>, <a href=\"javascript:setPassword()\">set password</a>, <a href=\"javascript:unregister()\">unregister</a>)<br><br>"
				if (save) {
					statusDiv.innerHTML += "<i>Save the current DLX/MIPS configuration by filling in the \"save as\" field (and optional description) and then clicking the save button.</i><br><br>"
					nameRow.style.display = "table-row"
					nameText.value = localStorage.getItem("dlxSaveName")
					nameText.setAttribute("required", "");
					descriptionRow.style.display = "table-row"
					descriptionText.value = localStorage.getItem("dlxDescription")
					saveRow.style.display = "table-row"
				} else {
					statusDiv.innerHTML += "<i>Load a previously saved configuration by clicking the name field in the table below.</i>"
				}
				configTitleRow.style.display = "table-row"
				configTableRow.style.display = "table-row";
				getConfigs();
			} else if (state == SETPASSWORD) {
				subtitleHTML.innerHTML = "DLX/MIPS Set Password"
				formRow.style.display = "table-row"
				statusDiv.style.display = "block"
				statusDiv.innerHTML = "You are logged in as <b>" + username + "</b>"
				passwordRow.style.display = "table-row"
				passwordLabel.innerHTML = "new password"
				password.value = ""
				setRow.style.display = "table-row"
				cancelRow.style.display = "table-row"
			}
		}

		//
		// confirmSave
		//
		function confirmSave() {
			let matches = configTable.getElementsByClassName("name");
			for (let i = 0; i < matches.length; i++) {
				if (matches[i].id == nameText.value) {
					return confirm("Are you sure you want to overwrite configuration \"" + nameText.value + "\"?");
				}
			}
			return 1;
		}

		//
		// ajax rpc to register, login, set password and save config
		// called when form submitted
		//
		function registerLoginSaveSetPassword(event) {

			event.preventDefault();

			if (event.submitter.id == "save") {
				localStorage.setItem("dlxSaveName", nameText.value);
				localStorage.setItem("dlxDescription", descriptionText.value);
				if (confirmSave() == 0)
					return
			}

			var request = new XMLHttpRequest();

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					//alert("responseText =" + request.responseText);
					state = request.responseText;
					setState();
				}
			}

			request.open("POST", "dlxAjax.php", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			switch (event.submitter.id) {
			case "register":
				username = usernameText.value
				request.send("&op=register&username=" + username + "&password=" + password.value)
				break
			case "login":
				username = usernameText.value
				request.send("&op=login&username=" + username + "&password=" + password.value)
				break
			case "save":
				request.send("&op=save&name=" + nameText.value + "&description=" + description.value + "&config=<?=$_GET["config"]?>")
				break
			case "setPassword":
				request.send("&op=setPassword&password=" + password.value)
				break
			case "cancel":
				state = SAVEORLOAD;
				setState();
			}
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

			request.open("POST", "dlxAjax.php", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			request.send("&op=logout");

		}

		//
		// setPassword
		//
		function setPassword() {
			state = SETPASSWORD;
			setState();
			//statusDiv.innerHTML = "Set password for <b>" + ((typeof pusername == 'undefined') ? username : pusername) + "</b>";
		}

		//
		// unregister
		//
		function unregister() {

			if (confirm("Are your sure you want to unregister you username \"" + usernameText.value + "\" and delete your saved configurations?")) {

				var request = new XMLHttpRequest();

				request.onreadystatechange = function() {
					if (request.readyState == 4 && request.status == 200) {
						state = 0;
						setState();
					}
				}

				request.open("POST", "dlxAjax.php", true);
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.send("&op=unregister");

			}
		}

		//
		// ajax rpc to get saved configurations
		//
		function getConfigs() {

			var request = new XMLHttpRequest();

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					//alert(request.responseText);
					configTable.innerHTML = request.responseText;
				}
			}

			request.open("POST", "dlxAjax.php", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			request.send("&op=getConfigs&save=" + save);

		}

		//
		// deleteConfig
		//
		function deleteConfig(name) {

			if (confirm("Are your sure you want to delete configuration \"" + name + "\"?")) {

				var request = new XMLHttpRequest();

				request.onreadystatechange = function() {
					if (request.readyState == 4 && request.status == 200) {
						setState();
					}
				}

				request.open("POST", "dlxAjax.php", true);
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.send("&op=deleteConfig&name=" + name);

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
		nameRow = document.getElementById("nameRow")
		nameText = document.getElementById("name")
		descriptionRow = document.getElementById("descriptionRow")
		descriptionText = document.getElementById("description")
		loginRow = document.getElementById("loginRow")
		registerRow = document.getElementById("registerRow")
		saveRow = document.getElementById("saveRow")
		setRow = document.getElementById("setRow")
		cancelRow = document.getElementById("cancelRow")
		configTitleRow = document.getElementById("configTitleRow")
		configTableRow = document.getElementById("configTableRow")
		configTable = document.getElementById("configTable")

		document.getElementById("form").addEventListener('submit', registerLoginSaveSetPassword);

		setState();

	</script>

	<br>
	<script>
		<!-- count not incremented -->
    	footer("dlx", 4);	// don't increment counter
    </script>

</body>


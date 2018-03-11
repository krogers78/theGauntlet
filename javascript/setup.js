//clear the local storage before proceeding
localStorage.clear();
//play the background music
var background = new Audio("audio/Skyrim 8-Bit Theme.wav");
background.play();
background.loop = true;
background.volume = 0.4;

//create their armor
function CreateArmor() {
	//store the armor amount in a variable
	var armorVal = document.getElementById("armor").value;
	//if they chose mage
	if (document.getElementById("classSelect").selectedIndex == 0) {
		//if it exceeds the max armor allowed
		if(armorVal > 100 || armorVal == "" || armorVal < 0) {
			alert("That is not a valid armor amount!");
		//if it is under or equal to the max amount
		} else {
			//write to the local storage
			localStorage.setItem("armorRating", armorVal);
			//disable the options
			document.getElementById("btnArmor").disabled = true;
			document.getElementById("armor").disabled = true;
			//enable the option
			document.getElementById("btnBeginGame").disabled = false;
		}
	} else if (document.getElementById("classSelect").selectedIndex == 1) {
		//if it exceeds the max armor allowed
		if(armorVal > 125 || armorVal == "" || armorVal < 0) {
			alert("That is not a valid armor amount!");
		//if it is under or equal to the max amount
		} else {
			//write to the local storage
			localStorage.setItem("armorRating", armorVal);
			//disable the options
			document.getElementById("btnArmor").disabled = true;
			document.getElementById("armor").disabled = true;
			//enable the option
			document.getElementById("btnBeginGame").disabled = false;
		}
	} else if (document.getElementById("classSelect").selectedIndex == 2) {
		//if it exceeds the max armor allowed
		if(armorVal > 150 || armorVal == "" || armorVal < 0) {
			alert("That is not a valid armor amount!");
		//if it is under or equal to the max amount
		} else {
			//write to the local storage
			localStorage.setItem("armorRating", armorVal);
			//disable the options
			document.getElementById("btnArmor").disabled = true;
			document.getElementById("armor").disabled = true;
			//enable the option
			document.getElementById("btnBeginGame").disabled = false;
		}
	}
}
//selecting their weapon
function WeaponSelect() {
	//if they selected Mage
	if (document.getElementById("weaponSelect").selectedIndex == 0) {
		//write to the local storage
		localStorage.setItem("weaponName", document.getElementById("weaponOne").innerHTML);
	//if they selected Knight
	} else if (document.getElementById("weaponSelect").selectedIndex == 1) {
		//write to the local storage
		localStorage.setItem("weaponName", document.getElementById("weaponTwo").innerHTML);
	//if they selected War Beast
	} else if (document.getElementById("weaponSelect").selectedIndex == 2) {
		//write to the local storage
		localStorage.setItem("weaponName", document.getElementById("weaponThree").innerHTML);
	}
	//hold the weapon select
	var theWeapon = localStorage.getItem("weaponName");

	if ( theWeapon == "Fire") {
		var fire = new Audio("audio/fire.wav");
		fire.play();
		fire.volume = 0.6;
	} 
	else if (theWeapon == "Ice") {
		var ice = new Audio("audio/Ice.wav");
		ice.play();
		ice.volume = 0.6;
	} 
	else if (theWeapon == "Lightning") {
		var lightning = new Audio("audio/lightning.wav");
		lightning.play();
		lightning.volume = 0.6;
	} 
	else if (theWeapon == "Sword") {
		var sword = new Audio("audio/sword.wav");
		sword.play();
		sword.volume = 0.6;
	} 
	else if (theWeapon == "Dagger") {
		var dagger = new Audio("audio/dagger.wav");
		dagger.play();
		dagger.volume = 0.6;
	} 
	else if (theWeapon == "War Axe") {
		var warAxe = new Audio("audio/warAxe.wav");
		warAxe.play();
		warAxe.volume = 0.6;
	} 
	else if (theWeapon == "Long Sword") {
		var longSword = new Audio("audio/longSword.wav");
		longSword.play();
		longSword.volume = 0.6;
	}
	else if (theWeapon == "Battle Axe") {
		var battleAxe = new Audio("audio/battleAxe.wav");
		battleAxe.play();
		battleAxe.volume = 0.8;
	}
	else if (theWeapon == "Claymore") {
		var claymore = new Audio("audio/claymore.wav");
		claymore.play();
		claymore.volume = 0.8;
	}
		
		
		
	//disable the option
	document.getElementById("weaponSelect").disabled = true;
	document.getElementById("btnWeapon").disabled = true;
	//enable the options
	document.getElementById("armor").disabled = false;
	document.getElementById("btnArmor").disabled = false;
	document.getElementById("armor").style.background = "white";
	
}
//selecting their class
function KeepGoing() {
	//if they chose the mage
	if(document.getElementById("classSelect").selectedIndex == 0) {
		//give text to the max armor allowed
		document.getElementById("maxArmor").innerHTML = "Max allowed: 100";
		//save the info to the local storage
		localStorage.setItem("className", "Mage");
	//if the chose the knight
	} else if (document.getElementById("classSelect").selectedIndex == 1) {
		//give text to the max armor allowed
		document.getElementById("maxArmor").innerHTML = "Max allowed: 125";
		//change the weapon to match the class type
		document.getElementById("weaponOne").innerHTML = "Sword";
		document.getElementById("weaponTwo").innerHTML = "Dagger";
		document.getElementById("weaponThree").innerHTML = "War Axe";
		//save the info to the local storage
		localStorage.setItem("className", "Knight");
	} else if (document.getElementById("classSelect").selectedIndex == 2) {
		//give text to the max armor allowed
		document.getElementById("maxArmor").innerHTML = "Max allowed: 150";
		//change the weapon to match the class type
		document.getElementById("weaponOne").innerHTML = "Long Sword";
		document.getElementById("weaponTwo").innerHTML = "Battle Axe";
		document.getElementById("weaponThree").innerHTML = "Claymore";
		//save the info the json file
		localStorage.setItem("className", "War Beast");
	}
	//disable option
	document.getElementById("classSelect").disabled = true;
	document.getElementById("btnClass").disabled = true;
	//enable option
	document.getElementById("weaponSelect").disabled = false;
	document.getElementById("btnWeapon").disabled = false;
}
//enter their name for the game
function HeroName() {
	var playerName = document.getElementById("playerNameForm").elements[0].value;
	if (playerName == "") {
		alert("Everybody has to have a name. You can't begin without a name!");
	} else {
		//disable the options
		document.getElementById("namePrompt").disabled = true;
		document.getElementById("btnName").disabled = true;
		document.getElementById("btnReset").disabled = true;
		//enable the option
		document.getElementById("classSelect").disabled = false;
		document.getElementById("btnClass").disabled = false;
		//save the info to the local storage
		localStorage.setItem("heroName", playerName);
	}
}
//reset the name field
function ResetField() {
	document.getElementById("playerNameForm").reset();
}
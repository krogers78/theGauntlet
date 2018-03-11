//play the background music
var battleMusic = new Audio("audio/fightmusic.wav");
battleMusic.loop = true;
battleMusic.play();
//death sound
var marioDeath = new Audio("audio/marioDeath.wav");

//Pull from the information from local storage for variables
var name = localStorage.getItem("heroName");
var className = localStorage.getItem("className");
var weapon = localStorage.getItem("weaponName");
var armor = localStorage.getItem("armorRating");

//create the three classes
var mage = new Warrior("", 200, 200, "", 0);
var knight = new Warrior("", 250, 250, "", 0);
var warBeast = new Warrior("", 300, 300, "", 0);

//create the weapons for the mage
var fire = new Weapon("Fire", 60);
var ice = new Weapon("Ice", 45);
var lightning = new Weapon("Lightning", 50);

//create the weapons for the knight
var sword = new Weapon("Sword", 40);
var dagger = new Weapon("Dagger", 20);
var warAxe = new Weapon("War Axe", 30);

//create the weapons for the war beast
var longSword = new Weapon("Long Sword", 45);
var battleAxe = new Weapon("Battle Axe", 40);
var claymore = new Weapon("Claymore", 50);

//create the enemies
var goblin = new Enemy("Goblin", 70, 70, 50);
var elf = new Enemy("Elf", 100, 100 ,70);
var giant = new Enemy("Giant", 200, 200, 125);
var rat = new Enemy("Rat", 30, 30, 10);

//Assign all the information
if (className == "Mage") {
	//assign the player name
	mage.name = name;
	//assign the player's weapon
	if (weapon == "Fire") {
		mage.weapon = fire;
	} else if (weapon == "Ice") {
		mage.weapon = ice;
	} else if (weapon == "Lightning") {
		mage.weapon = lightning;
	}
	//assign the armor rating
	mage.defense = armor;
	//call the function to load everything in
	InitialLoad(mage, goblin, elf, giant, rat);
} 
else if (className == "Knight") {
	knight.name = name;
	//assign the player's weapon
	if (weapon == "Sword") {
		knight.weapon = sword;
	} else if (weapon == "Dagger") {
		knight.weapon = dagger;
	} else if (weapon == "War Axe") {
		knight.weapon = warAxe;
	}
	knight.defense = armor;
	//call the function to load everything in
	InitialLoad(knight, goblin, elf, giant, rat);
}
else if (className == "War Beast") {
	//assign the player name
	warBeast.name = name;
	//assign the player's weapon
	if (weapon == "Long Sword") {
		warBeast.weapon = longSword;
	}  else if (weapon == "Battle Axe") {
		warBeast.weapon = battleAxe;
	} else if (weapon == "Claymore") {
		warBeast.weapon = claymore;
	}
	//assign the armor rating
	warBeast.defense = armor;
	//call the function to load everything in
	InitialLoad(warBeast, goblin, elf, giant, rat);
}

//function called when Flee button is pressed
function FleeAttempt() {
	if (className == "Mage") {
		if (localStorage.getItem("currentEnemy") == "Goblin") {
			TryToFlee(mage, goblin);
		} else if (localStorage.getItem("currentEnemy") == "Elf") {
			TryToFlee(mage, elf);
		} else if (localStorage.getItem("currentEnemy") == "Giant") {
			TryToFlee(mage, giant);
		} else if (localStorage.getItem("currentEnemy") == "Rat") {
			TryToFlee(mage, rat);
		}
	}
	else if (className == "Knight") {
		if (localStorage.getItem("currentEnemy") == "Goblin") {
			TryToFlee(knight, goblin);
		} else if (localStorage.getItem("currentEnemy") == "Elf") {
			TryToFlee(knight, elf);
		} else if (localStorage.getItem("currentEnemy") == "Giant") {
			TryToFlee(knight, giant);
		} else if (localStorage.getItem("currentEnemy") == "Rat") {
			TryToFlee(knight, rat);
		}
	}
	else if (className == "War Beast") {
		if (localStorage.getItem("currentEnemy") == "Goblin") {
			TryToFlee(warBeast, goblin);
		} else if (localStorage.getItem("currentEnemy") == "Elf") {
			TryToFlee(warBeast, elf);
		} else if (localStorage.getItem("currentEnemy") == "Giant") {
			TryToFlee(warBeast, giant);
		} else if (localStorage.getItem("currentEnemy") == "Rat") {
			TryToFlee(warBeast, rat);
		}
	}
}
//determines if the flee attempt was successful or not
function TryToFlee(mainPlayer, enemy) {
	//variable to get random number
	var fleeChance = Math.ceil(Math.random() * 3);
	
	//chance to successfully flee
	if (fleeChance == 2) {
		document.getElementById("attackInfo").innerHTML = "You managed to escape";
		EnemyDecider();
	//if they couldn't get away
	} else{
		document.getElementById("attackInfo").innerHTML = "You couldn't get away and took damage!";
		mainPlayer.decreaseHP(enemy.weapon);
		document.getElementById("pHealth").innerHTML = `Current HP: ${mainPlayer.currentHP}`;
		document.getElementById("pArmor").innerHTML = `Armor: ${mainPlayer.defense}`;
	}
	//if the player dies
	if (mainPlayer.currentHP <= 0) {
		document.getElementById("btnAttack").disabled = true;
		document.getElementById("btnFlee").disabled = true;
		document.getElementById("pDeath").innerHTML = `${mainPlayer.name} has died`;
		//document.getElementById("playAgain").innerHTML = "Play Again";
		battleMusic.pause();
		marioDeath.play();
		localStorage.clear();
		
	}
}
//determines critical hit, miss, or normal attack
function AttackAmount(enemy, warrior) {
	//variables to generate random number
	var attackChance = Math.ceil(Math.random() * 4);
	//chance for critical hit
	if (attackChance == 3) {
		document.getElementById("attackInfo").innerHTML = "CRITICAL HIT";
		enemy.decreaseHP(warrior.weapon.damage * (Math.ceil(Math.random() * 5)));
	//chance for the attack to miss
	} else if (attackChance == 2) {
		document.getElementById("attackInfo").innerHTML = `You missed and the ${enemy.name} attacked`;
		warrior.decreaseHP(enemy.weapon);
	//regular attack
	} else {
		document.getElementById("attackInfo").innerHTML = "The attack was successful!";
		enemy.decreaseHP(warrior.weapon.damage);
	}
}
//function called when Attack button is pressed
function AttackEnemy() {
	//if they are a Mage
	if (className == "Mage") {
		EnemyFight(mage);
		//update the player stats
		document.getElementById("pName").innerHTML = `Name: ${mage.name}`;
		document.getElementById("pHealth").innerHTML = `Current HP: ${mage.currentHP}`;
		document.getElementById("pWeapon").innerHTML = `Weapon: ${mage.weapon.weaponName}`;
		document.getElementById("pArmor").innerHTML = `Armor: ${mage.defense}`;
	//if they are a Knight
	} else if (className == "Knight") {
		EnemyFight(knight);
		//update the player stats
		document.getElementById("pName").innerHTML = `Name: ${knight.name}`;
		document.getElementById("pHealth").innerHTML = `Current HP: ${knight.currentHP}`;
		document.getElementById("pWeapon").innerHTML = `Weapon: ${knight.weapon.weaponName}`;
		document.getElementById("pArmor").innerHTML = `Armor: ${knight.defense}`;
	} else if (className == "War Beast") {
		EnemyFight(warBeast);
		//update the player stats
		document.getElementById("pName").innerHTML = `Name: ${warBeast.name}`;
		document.getElementById("pHealth").innerHTML = `Current HP: ${warBeast.currentHP}`;
		document.getElementById("pWeapon").innerHTML = `Weapon: ${warBeast.weapon.weaponName}`;
		document.getElementById("pArmor").innerHTML = `Armor: ${warBeast.defense}`;
	}
}
//method called to decide the attack
function EnemyFight(mainPlayer) {
	//fighting a goblin
	if (localStorage.getItem("currentEnemy") == "Goblin") {
		//call the method for the enemy attack logic
		AttackAmount(goblin, mainPlayer);
		//update enemy info	
		document.getElementById("eName").innerHTML = `Enemy: ${goblin.name}`
		document.getElementById("eHealth").innerHTML = `Current HP: ${goblin.currentHP}`;	
	}
	//fighting an elf
	else if (localStorage.getItem("currentEnemy") == "Elf") {
		//call the method for the enemy attack logic
		AttackAmount(elf, mainPlayer);
		//update enemy info
		document.getElementById("eName").innerHTML = `Enemy: ${elf.name}`;
		document.getElementById("eHealth").innerHTML = `Current HP: ${elf.currentHP}`;	
	} 
	//fighting a giant	
	else if (localStorage.getItem("currentEnemy") == "Giant") {
		//call the method for the enemy attack logic
		AttackAmount(giant, mainPlayer);
		//update enemy info
		document.getElementById("eName").innerHTML = `Enemy: ${giant.name}`;
		document.getElementById("eHealth").innerHTML = `Current HP: ${giant.currentHP}`;		
	} 
	//fighting a rat
	else if (localStorage.getItem("currentEnemy") == "Rat") {
		//call the method for the enemy attack logic
		AttackAmount(rat, mainPlayer);
		//update enemy info
		document.getElementById("eName").innerHTML = `Enemy: ${rat.name}`;
		document.getElementById("eHealth").innerHTML = `Current HP: ${rat.currentHP}`;	
	}
	//dead goblin
	if (goblin.currentHP <= 0) {
		goblin.currentHP = goblin.maxHP;
		EnemyDecider();
	//dead elf
	} else if (elf.currentHP <= 0) {
		elf.currentHP = elf.maxHP;
		EnemyDecider();
	//dead giant
	} else if (giant.currentHP <= 0) {
		giant.currentHP = giant.maxHP;
		EnemyDecider();
	//dead rat
	} else if (rat.currentHP <= 0) {
		rat.currentHP = rat.maxHP;
		EnemyDecider();
	//dead player
	} else if (mainPlayer.currentHP <= 0) {
		document.getElementById("pDeath").innerHTML = `${mainPlayer.name} has died`;
		document.getElementById("btnAttack").disabled = true;
		document.getElementById("btnFlee").disabled = true;
		battleMusic.pause();
		marioDeath.play();
	}
}
//decides which enemy is encountered next
function EnemyDecider() {
	//random number
	var enemyDecider = Math.ceil(Math.random() * 5);
				
	//goblin fight
	if (enemyDecider == 1) {
		document.getElementById("eName").innerHTML = `Enemy: ${goblin.name}`
		document.getElementById("eHealth").innerHTML = `Current HP: ${goblin.currentHP}`;
		document.getElementById("attackInfo").innerHTML = `A ${goblin.name} has appeared!`;
		localStorage.setItem("currentEnemy", "Goblin");
	//elf fight
	} else if (enemyDecider == 2) {
		document.getElementById("eName").innerHTML = `Enemy: ${elf.name}`;
		document.getElementById("eHealth").innerHTML = `Current HP: ${elf.currentHP}`;
		document.getElementById("attackInfo").innerHTML = `An ${elf.name} has appeared!`;
		localStorage.setItem("currentEnemy", "Elf");
	//giant fight
	} else if (enemyDecider == 3) {
		document.getElementById("eName").innerHTML = `Enemy: ${giant.name}`;
		document.getElementById("eHealth").innerHTML = `Current HP: ${giant.currentHP}`;
		document.getElementById("attackInfo").innerHTML = `A ${giant.name} has appeared!`;
		localStorage.setItem("currentEnemy", "Giant");
	//rat fight
	} else {
		document.getElementById("eName").innerHTML = `Enemy: ${rat.name}`;
		document.getElementById("eHealth").innerHTML = `Current HP: ${rat.currentHP}`;
		document.getElementById("attackInfo").innerHTML = `A ${rat.name} has appeared!`;
		localStorage.setItem("currentEnemy", "Rat");
	}
}
//initially load information to start the battle
function InitialLoad(mainPlayer, goblin, elf, giant, rat) {
	//update the player stats
	document.getElementById("pName").innerHTML = `Name: ${mainPlayer.name}`;
	document.getElementById("pHealth").innerHTML = `Current HP: ${mainPlayer.currentHP}`;
	document.getElementById("pWeapon").innerHTML = `Weapon: ${mainPlayer.weapon.weaponName}`;
	document.getElementById("pArmor").innerHTML = `Armor: ${mainPlayer.defense}`;
	//decide which enemy is encountered
	EnemyDecider();
}
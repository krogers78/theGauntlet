window.addEventListener('load', () => {
  // create the enemies
  const goblin = new Enemy('Goblin', 70, 70, 50);
  const elf = new Enemy('Elf', 100, 100, 70);
  const giant = new Enemy('Giant', 200, 200, 125);
  const rat = new Enemy('Rat', 30, 30, 10);

  const playerData = JSON.parse(localStorage.getItem('playerData'));
  const {
    name, className, weapon, armor
  } = playerData;

  let player = null;
  // Switch statement to assign the player data to a class object
  switch (className) {
    case 'mage':
      if (weapon === 'fire') {
        player = new Warrior(name, 200, 200, new Weapon('Fire', 60), armor);
      } else if (weapon === 'ice') {
        player = new Warrior(name, 200, 200, new Weapon('Ice', 45), armor);
      } else if (weapon === 'lightning') {
        player = new Warrior(name, 200, 200, new Weapon('Lightning', 50), armor);
      }
      break;
    case 'knight':
      if (weapon === 'sword') {
        player = new Warrior(name, 250, 250, new Weapon('Sword', 45), armor);
      } else if (weapon === 'dagger') {
        player = new Warrior(name, 250, 250, new Weapon('Dagger', 25), armor);
      } else if (weapon === 'war axe') {
        player = new Warrior(name, 250, 250, new Weapon('War Axe', 30), armor);
      }
      break;
    case 'war beast':
      if (weapon === 'long sword') {
        player = new Warrior(name, 250, 250, new Weapon('Long Sword', 45), armor);
      } else if (weapon === 'battle axe') {
        player = new Warrior(name, 250, 250, new Weapon('Battle Axe', 40), armor);
      } else if (weapon === 'claymore') {
        player = new Warrior(name, 250, 250, new Weapon('Claymore', 60), armor);
      }
      break;
    default:
      throw new Error('Cannot create player');
  }
  // Function to handle a dead player
  const deadPlayer = (play) => {
    document.querySelector('#atkMessage').innerHTML = `${play.name} has died`;
    document.querySelector('#atkBtn').style.display = 'none';
    document.querySelector('#fleeBtn').style.display = 'none';
  };
  // Load the page with the initial player data
  const initialLoad = (play, gob, el, gi, ra) => {
    populatePlayerData(document.querySelector('#playerArticle').children, play);
    // Call the function that decides which enemy to display
    enemyDecider(play, gob, el, gi, ra);
  };
  // Logic to determine which enemy the player fights
  const enemyDecider = (play, gob, el, gi, ra) => {
    // Reset all the enemy HP
    gob.currentHP = gob.maxHP;
    el.currentHP = el.maxHP;
    gi.currentHP = gi.maxHP;
    ra.currentHP = ra.maxHP;
    // Generate a random number
    const randomNumber = Utils.randNum(1, 5);
    // Create a variable for the enemy article tag
    const enemyHTML = document.querySelector('#enemyArticle').children;
    if (randomNumber === 1) {
      populateEnemyData(enemyHTML, goblin);
    } else if (randomNumber === 2) {
      populateEnemyData(enemyHTML, elf);
    } else if (randomNumber === 3) {
      populateEnemyData(enemyHTML, giant);
    } else {
      populateEnemyData(enemyHTML, rat);
    }
  };
  // Function to populate the enemy data to be called elsewhere
  const populatePlayerData = (tag, play) => {
    // Populate the name
    tag[0].innerHTML = `<i class="fas fa-user mx-1"></i>${play.name}`;
    // Populate the Current HP
    tag[1].innerHTML = `<i class="fas fa-heart mx-1"></i>${play.currentHP}`;
    // Populate the Weapon of Choice
    tag[2].innerHTML = `<i class="fas fa-fire mx-1"></i>${play.weapon.weaponName}`;
    // Populate the Armor Amount
    tag[3].innerHTML = `<i class="fas fa-shield-alt mx-1"></i>${play.defense}`;
    // Populate the Gold Amount
    tag[4].innerHTML = `<i class="fas fa-money-bill-alt mx-1"></i>${play.gold}`;
  };
  // Function to populate the enemy data to be called elsewhere
  const populateEnemyData = (tag, enemy) => {
    // Populate the enemy name
    tag[0].innerHTML = `<i class="fas fa-user mx-1"></i>${enemy.name}`;
    // Populate the enemy HP
    tag[1].innerHTML = `<i class="fas fa-heart mx-1"></i>${enemy.currentHP}`;
    localStorage.setItem('currentEnemy', enemy.name);
  };
  // Function to determine which enemy is being fought
  const attackEnemy = (play, gob, el, gi, ra) => {
    const currentEnemy = localStorage.getItem('currentEnemy');
    // Check the current enemy to determine the attacker
    if (currentEnemy.toLowerCase() === 'goblin') {
      attackAmount(play, gob);
      populateEnemyData(document.querySelector('#enemyArticle').children, gob);
    } else if (currentEnemy.toLowerCase() === 'elf') {
      attackAmount(play, el);
      populateEnemyData(document.querySelector('#enemyArticle').children, el);
    } else if (currentEnemy.toLowerCase() === 'giant') {
      attackAmount(play, gi);
      populateEnemyData(document.querySelector('#enemyArticle').children, gi);
    } else if (currentEnemy.toLowerCase() === 'rat') {
      attackAmount(play, ra);
      populateEnemyData(document.querySelector('#enemyArticle').children, ra);
    }
    // Check if the enemy or player has died and call the enemy decider function
    gob.currentHP <= 0 ? enemyDecider(play, gob, el, gi, ra) : null;
    el.currentHP <= 0 ? enemyDecider(play, gob, el, gi, ra) : null;
    gi.currentHP <= 0 ? enemyDecider(play, gob, el, gi, ra) : null;
    ra.currentHP <= 0 ? enemyDecider(play, gob, el, gi, ra) : null;
    play.currentHP <= 0 ? deadPlayer(play) : null;
  };
  // Function to determine the attack strength
  const attackAmount = (play, enemy) => {
    const randNum = Utils.randNum(0, 15);
    const domElement = document.querySelector('#atkMessage');
    // Update player armor and currentHP
    populatePlayerData(document.querySelector('#playerArticle').children, play);

    if (randNum === 2) {
      domElement.innerHTML = `You missed and the ${enemy.name} attacked.`;
      play.decreaseHP(enemy.weapon);
    } else if (randNum === 3) {
      domElement.innerHTML = 'CRITICAL HIT';
      enemy.decreaseHP(play.weapon.damage * Utils.randNum(1, 5));
    } else {
      domElement.innerHTML = 'The attack was successful';
      enemy.decreaseHP(play.weapon.damage);
    }
  };
  // Function to determine if the player can flee
  const fleeAttempt = (play, gob, el, gi, ra) => {
    const randomNumber = Utils.randNum(0, 3);
    const domElement = document.querySelector('#atkMessage');
    // Check if the user can flee from the enemy
    if (randomNumber === 2) {
      domElement.innerHTML = 'You managed to escape';
      enemyDecider(play, gob, el, gi, ra);
    } else {
      domElement.innerHTML = 'You couldn\'t get away and took damage!';
      switch (localStorage.getItem('currentEnemy')) {
        case gob.name:
          play.decreaseHP(gob.weapon);
          break;
        case el.name:
          play.decreaseHP(el.weapon);
          break;
        case gi.name:
          play.decreaseHP(gi.weapon);
          break;
        case ra.name:
          play.decreaseHP(ra.weapon);
          break;
        default:
          break;
      }
      populatePlayerData(document.querySelector('#playerArticle').children, play);
      play.currentHP <= 0 ? deadPlayer(play) : null;
    }
  };
  // Run the initial function to populate the page
  initialLoad(player, goblin, elf, giant, rat);
  // Button Events
  // Attack
  document.querySelector('#atkBtn').addEventListener('click', () => attackEnemy(player, goblin, elf, giant, rat));
  // Flee
  document.querySelector('#fleeBtn').addEventListener('click', () => fleeAttempt(player, goblin, elf, giant, rat));
});

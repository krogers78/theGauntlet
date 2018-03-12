window.addEventListener('load', () => {
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
  const initialLoad = (p) => {
    console.log('Player', p);
    // Create a variable for the player article tag
    const playerHTML = document.querySelector('#playerArticle').children;
    // Populate the name
    playerHTML[0].innerHTML = `<i class="fas fa-user mx-1"></i>${p.name}`;
    // Populate the Current HP
    playerHTML[1].innerHTML = `<i class="fas fa-heart mx-1"></i>${p.currentHP}`;
    // Populate the Weapon of Choice
    playerHTML[2].innerHTML = `<i class="fas fa-fire mx-1"></i>${p.weapon.weaponName}`;
    // Populate the Armor Amount
    playerHTML[3].innerHTML = `<i class="fas fa-shield-alt mx-1"></i>${p.defense}`;
    // Populate the Gold Amount
    playerHTML[4].innerHTML = `<i class="fas fa-money-bill-alt mx-1"></i>${p.gold}`;
  };
  initialLoad(player);
});

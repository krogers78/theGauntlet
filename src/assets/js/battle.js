window.addEventListener('load', () => {
  const playerData = JSON.parse(localStorage.getItem('playerData'));
  const {
    name, className, weapon, armor
  } = playerData;

  let player = null;

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
});

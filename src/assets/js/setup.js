window.addEventListener('load', () => {
  console.log('READY');

  const classSelect = document.querySelector('#classSelect');
  const weapon = document.querySelector('#weapon');
  console.log('weapon', classSelect.value);
  classSelect.addEventListener('change', () => {
    if (classSelect.value === 'mage') {
      weapon.options[0].innerHTML = 'Fire';
      weapon.options[0].value = 'fire';

      weapon.options[1].innerHTML = 'Ice';
      weapon.options[1].value = 'ice';

      weapon.options[2].innerHTML = 'Lightning';
      weapon.options[2].value = 'lightning';
    } else if (classSelect.value === 'knight') {
      weapon.options[0].innerHTML = 'Sword';
      weapon.options[0].value = 'sword';

      weapon.options[1].innerHTML = 'Dagger';
      weapon.options[1].value = 'dagger';

      weapon.options[2].innerHTML = 'War Axe';
      weapon.options[2].value = 'war axe';
    } else if (classSelect.value === 'war beast') {
      weapon.options[0].innerHTML = 'Long Sword';
      weapon.options[0].value = 'long sword';

      weapon.options[1].innerHTML = 'Battle Axe';
      weapon.options[1].value = 'battle axe';

      weapon.options[2].innerHTML = 'Claymore';
      weapon.options[2].value = 'claymore';
    }
  });
});

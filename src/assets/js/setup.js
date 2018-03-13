window.addEventListener('load', () => {
  localStorage.clear();
  const classSelect = document.querySelector('#classSelect');
  const weapon = document.querySelector('#weapon');
  // Changing the weapon input based on the class selection
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
  document.querySelector('#name').addEventListener('blur', () => validateInput('nameError', 'name'));
  document.querySelector('#armor').addEventListener('blur', () => validateInput('armorError', 'armor'));
  // form submit
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const error = !!(validateInput('nameError', 'name') || validateInput('armorError', 'armor'));
    if (!error) {
      const playerData = {
        name: document.querySelector('#name').value,
        className: document.querySelector('#classSelect').value,
        weapon: document.querySelector('#weapon').value,
        armor: document.querySelector('#armor').value
      };
      localStorage.setItem('playerData', JSON.stringify(playerData));
      document.location.replace('/battle');
    }
  });
});
// Validate form inputs
function validateInput(errorElement, inputElement) {
  const error = document.querySelector(`#${errorElement}`);
  if (document.querySelector(`#${inputElement}`).value === '') {
    error ? '' : document.querySelector(`#${inputElement}`).insertAdjacentHTML('afterEnd', `<p class="alert alert-danger" id="${errorElement}">${inputElement} is required</p>`);
    return true;
  } else if (document.querySelector(`#${inputElement}`).value !== '') {
    error ? error.parentNode.removeChild(error) : '';
    return false;
  }
}

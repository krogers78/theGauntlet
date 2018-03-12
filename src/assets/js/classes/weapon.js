// create weapon class
class Weapon {
  constructor(weaponName, damage) {
    this.weaponName = weaponName;
    this.damage = damage;
  }
  weaponCreate() {
    console.log(`${this.weaponName} has been created.`);
  }
}

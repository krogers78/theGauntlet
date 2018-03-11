//create character class
class Character {
    constructor(name, maxHP, currentHP, weapon, defense = 0, gold = 0) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = currentHP;
        this.weapon = weapon;
        this.defense = defense;
        this.gold = gold;
    }
    decreaseHP(damage) {
        if(damage <= this.defense) {
            this.defense -= damage;
            if (this.defense <= 0) {
                this.defense = 0;
            }
        } else {
            this.currentHP -= (damage - this.defense);
            if (this.currentHP <= 0) {
                this.currentHP = 0;
            }
            this.defense -= damage;
            if (this.defense <= 0) {
                this.defense = 0;
            }
        }
        return this.currentHP;
    }
    increaseHP(potion) {
        this.currentHP += potion;
        if(this.currentHP >= this.maxHP) {
            this.currentHP = this.maxHP;
        }
        return this.currentHP;
    }
    increaseGold() {
        this.gold += 25;
        return this.gold;
    }
    decreaseGold() {
        this.gold -= 50;
        return this.gold
    }
    characterInfo() {
        console.log(`Name: ${this.name} Max HP: ${this.maxHP} Current HP: ${this.currentHP} Weapon: ${this.weapon.weaponName} Defense: ${this.defense}`);
    }
    characterInfoAlert() {
        alert(`Name: ${this.name} \r\nMax HP: ${this.maxHP} \r\nCurrent HP: ${this.currentHP} \r\nWeapon: ${this.weapon.weaponName} \r\nArmor Rating: ${this.defense} \r\nGold Amount: ${this.gold}`);
    }
}
//create warrior class inheritance
class Warrior extends Character {
}
//create enemy class inheritance
class Enemy extends Character {
    characterInfo() {
        console.log(`Name: ${this.name} Max HP: ${this.maxHP} Current HP: ${this.currentHP} Damage Output: ${this.weapon}`);
    }
}
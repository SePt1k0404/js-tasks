const player = {
  userName: "CoolBoy",
  healPoints: 100,
  power: 20,
  medicine: [15, 15],
  item: "",

  attack(enemy) {
    enemy.healPoints -= this.power;
    console.log(
      `${this.userName} attacks ${enemy.type} for ${this.power} damage!`
    );
  },

  heal() {
    if (this.medicine.length > 0) {
      this.healPoints += this.medicine.shift();
      console.log(`${this.userName} healed and now has ${this.healPoints} HP!`);
    } else {
      console.log(`${this.userName} has no medicine left!`);
    }
  },
};

const monster = {
  type: "Goblin",
  healPoints: 10,
  power: 1,
  attack(player) {
    player.healPoints -= this.power;
    console.log(
      `${this.type} attacks ${player.userName} for ${this.power} damage!`
    );
  },
};

const item = {
  itemName: "",
  type: "",
  power: 0,
};

const swordItem = Object.assign({}, item, {
  itemName: "Common Iron Sword",
  type: "weapon",
  power: 30,
});

const healPotion = Object.assign({}, item, {
  itemName: "Angels Tears",
  type: "medicine",
  power: 50,
});

const fight = (player, monster) => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (player.healPoints <= 0 || monster.healPoints <= 0) {
        clearInterval(interval);
        const winner = player.healPoints > 0 ? player : monster;
        console.log(
          `The winner is ${winner.userName || winner.type}! Remaining HP: ${
            winner.healPoints
          }`
        );
        resolve({
          winner: winner.userName || winner.type,
          healPoints: winner.healPoints,
        });
      } else {
        player.attack(monster);
        if (monster.healPoints > 0) {
          monster.attack(player);
        }
      }
    }, 1000);
  });
};

const startGame = async () => {
  console.log("Welcome to the adventure game!");
  console.log("You are starting your journey. Be prepared to face monsters!");

  while (player.healPoints > 0) {
    const enemy = Object.assign({}, monster, {
      type: "Goblin",
      healPoints: 20 + Math.floor(Math.random() * 100),
      power: 5 + Math.floor(Math.random() * 50),
    });

    console.log(`A wild ${enemy.type} appears!`);
    console.log(
      `${enemy.type} stats: HP: ${enemy.healPoints}, Power: ${enemy.power}`
    );

    const result = await fight(player, enemy);
    console.log(result);
    if (player.healPoints > 0) {
      if (player.healPoints < 70) {
        player.heal();
      }
      if (Math.random() > 0.5) {
        console.log(`You found a ${healPotion.itemName}!`);
        player.medicine.push(healPotion.power);
      } else {
        console.log(`You found a ${swordItem.itemName}!`);
        if (player.item !== swordItem.itemName) {
          player.power += swordItem.power;
          player.item = swordItem.itemName;
          console.log(`Your power increased to ${player.power}!`);
        } else {
          console.log("You already have this item!");
        }
      }

      console.log("You move forward and prepare for the next fight...");
    } else {
      console.log("You have been defeated. Game over!");
    }
  }
};

startGame();

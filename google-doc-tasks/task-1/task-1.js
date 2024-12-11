"use strict";

const refs = {
  playerHealthBar: document.getElementById("player-health"),
  monsterHealthBar: document.getElementById("monster-health"),
  playerName: document.querySelector(".player-name"),
  monsterName: document.querySelector(".monster-name"),
  monster: document.querySelector(".monster"),
  treasure: document.querySelector(".treasure"),
  playerStats: document.getElementById("player-stats"),
  monsterStats: document.getElementById("monster-stats"),
  playerDamage: document.getElementById("player-damage"),
  monsterDamage: document.getElementById("monster-damage"),
  playerMedicineCount: document.getElementById("player-medicine-count"),
  gameResult: document.getElementById("game-result"),
};

const player = {
  userName: "CoolBoy",
  maxHealth: 100,
  healPoints: 100,
  power: 20,
  medicine: [60, 60],
  item: "",
  attack(enemy) {
    enemy.healPoints -= this.power;
    enemy.healPoints = Math.max(enemy.healPoints, 0);
  },
  heal() {
    if (this.medicine.length > 0) {
      this.healPoints += this.medicine.shift();
      this.healPoints = Math.min(this.healPoints, this.maxHealth);
    }
  },
};

const createMonster = (type) => {
  switch (type) {
    case "goblin":
      return {
        type: "Goblin",
        maxHealth: 50,
        healPoints: 50,
        power: 10,
        image: "./assets/goblin.png",
        attack(player) {
          player.healPoints -= this.power;
          player.healPoints = Math.max(player.healPoints, 0);
        },
      };
    case "ogre":
      return {
        type: "Ogre",
        maxHealth: 150,
        healPoints: 150,
        power: 30,
        image: "./assets/ogre.png",
        attack(player) {
          player.healPoints -= this.power;
          player.healPoints = Math.max(player.healPoints, 0);
        },
      };
    case "dragon":
      return {
        type: "Dragon",
        maxHealth: 300,
        healPoints: 300,
        power: 50,
        image: "./assets/dragon.png",
        attack(player) {
          player.healPoints -= this.power;
          player.healPoints = Math.max(player.healPoints, 0);
        },
      };
    default:
      return {};
  }
};

let currentMonster = createMonster("goblin");

const spawnTreasure = () => {
  refs.treasure.style.opacity = 1;

  if (Math.random() >= 0.7) {
    refs.treasure.setAttribute("src", "./assets/sword.png");
    player.power += 80;
    refs.playerDamage.innerText = player.power;
  } else {
    refs.treasure.setAttribute("src", "./assets/healPotion.png");
    player.medicine.push(100);
    refs.playerMedicineCount.innerText = player.medicine.length;
  }

  setTimeout(() => {
    refs.treasure.style.opacity = 0;
  }, 1500);
};

const updateHealthBar = (bar, currentHP, maxHP) => {
  const percentage = (currentHP / maxHP) * 100;
  bar.style.width = `${percentage}%`;
};

let isAttackInProgress = false;

window.addEventListener("load", () => {
  refs.playerName.innerText = `Player: ${player.userName}`;
  refs.monsterName.innerText = `Monster: ${currentMonster.type}`;
  refs.playerDamage.innerText = player.power;
  refs.monsterDamage.innerText = currentMonster.power;
  refs.playerMedicineCount.innerText = player.medicine.length;
});

document.addEventListener("keydown", (evt) => {
  if (
    evt.code === "Space" &&
    !isAttackInProgress &&
    player.healPoints > 0 &&
    currentMonster.healPoints > 0
  ) {
    isAttackInProgress = true;
    player.attack(currentMonster);
    updateHealthBar(
      refs.monsterHealthBar,
      currentMonster.healPoints,
      currentMonster.maxHealth
    );

    const fireball = document.getElementById("fireball");
    fireball.style.opacity = 1;
    fireball.style.left = "70%";
    setTimeout(() => {
      fireball.style.opacity = 0;
      fireball.style.left = "10%";
    }, 1000);

    if (currentMonster.healPoints > 0) {
      setTimeout(() => {
        currentMonster.attack(player);
        updateHealthBar(
          refs.playerHealthBar,
          player.healPoints,
          player.maxHealth
        );
        const monsterFireball = document.getElementById("monster-fireball");
        monsterFireball.style.opacity = 1;
        monsterFireball.style.left = "10%";
        setTimeout(() => {
          monsterFireball.style.opacity = 0;
          monsterFireball.style.left = "70%";
        }, 1000);

        if (player.healPoints <= 0) {
          refs.gameResult.innerText = "Game Over! Monster wins!";
        }

        isAttackInProgress = false;
      }, 1500);
    } else {
      setTimeout(() => {
        const monsterImg = refs.monster.querySelector("img");
        monsterImg.setAttribute("src", currentMonster.image);
        refs.monster.style.marginBottom = "140px";
        refs.monster.style.transform = "rotateY(0deg)";
        if (currentMonster.type === "Goblin") {
          currentMonster = createMonster("ogre");
          refs.monsterName.innerText = `Monster: ${currentMonster.type}`;
          refs.monster
            .querySelector("img")
            .setAttribute("src", currentMonster.image);
          refs.monster.style.marginBottom = "250px";
          refs.monster.style.transform = "rotateY(180deg)";
          updateHealthBar(
            refs.monsterHealthBar,
            currentMonster.healPoints,
            currentMonster.maxHealth
          );
        } else if (currentMonster.type === "Ogre") {
          currentMonster = createMonster("dragon");
          refs.monsterName.innerText = `Monster: ${currentMonster.type}`;
          refs.monster
            .querySelector("img")
            .setAttribute("src", currentMonster.image);
          updateHealthBar(
            refs.monsterHealthBar,
            currentMonster.healPoints,
            currentMonster.maxHealth
          );
        } else if (currentMonster.type === "Dragon") {
          refs.gameResult.innerText = "Game Over! You win!";
        }
        isAttackInProgress = false;
        spawnTreasure();
      }, 1000);
    }
  }

  if (evt.code === "ControlLeft" || evt.code === "ControlRight") {
    player.heal();
    updateHealthBar(refs.playerHealthBar, player.healPoints, player.maxHealth);
    refs.playerMedicineCount.innerText = player.medicine.length;
  }
});

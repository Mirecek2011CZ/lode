let numberOfShips = 4;
let gameEnd = false;
let gameStart = false;
let ships = [];
let enemyAttacks = [];
let enemyShips = [];
let attacks = [];
let armed = false;



const arr = document.getElementsByClassName("arr");
const arr2 = document.getElementsByClassName("arr2");
const startBtn = document.getElementById("startBtn");
const img = "url(./res/img/image.png)";
const img2 = "url(./res/img/image2.png)";
const img3 = "url(./res/img/cross.png)";


for (let i = 0; i < arr2.length; i++) {
  arr2[i].addEventListener("click", () => {
    let position = i;
    let check = false;
    let check2 = false;
    let counter = 0;
    if (!gameEnd && gameStart) {
      check2 = false;
      for (let i = 0; i < attacks.length; i++) {
        if(attacks[i] == position){
          check2 = true;
          armed = true;
        }
      }
      if (armed == true && !check2) {
        attacks.push(position);
        for (let i = 0; i < enemyShips.length; i++) {
          if (enemyShips[i] == position) {
            check = true;
            counter = i;
          }
        }
        if (check) {
          arr2[position].style.backgroundImage = img2;
          enemyShips[counter] = 50;
          enemyAttack();
          if (
            enemyShips[0] == 50 &&
            enemyShips[1] == 50 &&
            enemyShips[2] == 50 &&
            enemyShips[3] == 50
          ) {
            gameEnd = true;
            startBtn.innerHTML = `YOU WON`;
          }
        } else {
          arr2[position].style.backgroundImage = img3;
          enemyAttack();
        }
      }
    }
  });
}

for (let i = 0; i < 4; i++) {
  let random = Math.floor(Math.random() * 25);
  let check = false;
  for (let i = 0; i < enemyShips.length; i++) {
    if (enemyShips[i] == random) {
      i--;
      check = true;
    }
  }
  if (!check) {
    enemyShips.push(random);
  }
}

startBtn.onclick = () => {
  if (startBtn.innerHTML == `START`) {
    startGame();
    gameStart = true;
  }
};

function startGame() {
  startBtn.innerHTML = `PLAY!`;
  let check = true;
  armed = true;
}

function enemyAttack() {
  if (!gameEnd && gameStart) {
    let check = false;
    let boat = 0;
    let ran = 0;
    do{
      check2 = false;
      ran = Math.floor(Math.random() * 25);
      for (let i = 0; i < enemyAttacks.length; i++) {
        if(ran == enemyAttacks[i]){
          check2 = true; 
        }
      }
    }while(check2);
    enemyAttacks.push(ran)
    for (let i = 0; i < ships.length; i++) {
      if (ships[i] == ran) {
        check = true;
        boat = ran;
        counter = i;
      }
    }
    if (check) {
      arr[boat].style.backgroundImage = img2;
      ships[counter] = 50;
    } else {
      arr[ran].style.backgroundImage = img3;
    }
  }
  if (
    ships[0] == 50 &&
    ships[1] == 50 &&
    ships[2] == 50 &&
    ships[3] == 50
  ) {
    gameEnd = true;
    startBtn.innerHTML = `YOU LOST`;
  } else {
    armed = true;
  }
}


for (let i = 0; i < arr.length; i++) {
  arr[i].addEventListener("click", () => {
    let pozice = i;
    let isBoat = false;
    for (let i = 0; i < ships.length; i++) {
      if (ships[i] == pozice) {
        isBoat = true;
      }
    }
    if (numberOfShips > 0 && !isBoat) {
      arr[pozice].style.backgroundImage = img;
      numberOfShips--;
      ships.push(pozice);
      if (numberOfShips == 0) {
        startBtn.innerHTML = `START`;
      }
    }
  });
}

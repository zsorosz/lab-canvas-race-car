const myCanvas = document.querySelector("canvas");
const ctx = myCanvas.getContext("2d");

const bgImg1 = new Image();
bgImg1.src =
  "https://media.discordapp.net/attachments/1062053353837830236/1065601329701072946/road.png";
const bgImg2 = new Image();
bgImg2.src =
  "https://media.discordapp.net/attachments/1062053353837830236/1065601329701072946/road.png";
let bg1Y = 0;
let bg2Y = -myCanvas.height;

const carImg = new Image();
carImg.src = "../images/car.png";

let gameOver = false;
let animateId;
let isMovingLeft = false;
let isMovingRight = false;

const carWidth = 100;
const carHeight = 200;
let carX = myCanvas.width / 2 - carWidth / 2;
let carY = myCanvas.height - carHeight;
const carSpeed = 5;

function animate() {
  ctx.drawImage(bgImg1, 0, bg1Y, myCanvas.width, myCanvas.height);
  ctx.drawImage(bgImg2, 0, bg2Y, myCanvas.width, myCanvas.height);
  ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
  bg1Y += 2;
  bg2Y += 2;

  if (bg1Y > myCanvas.height) {
    bg1Y = -myCanvas.height;
  }
  if (bg2Y > myCanvas.height) {
    bg2Y = -myCanvas.height;
  }

  if (isMovingLeft && carX > 0) {
    carX -= carSpeed;
  }
  if (isMovingRight && carX + carWidth < myCanvas.width) {
    carX += carSpeed;
  }

  if (!gameOver) {
    animateId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animateId);
  }
}

function startGame() {
  animate();
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  document.addEventListener("keypress", (event) => {
    if (event.key === "a") {
      isMovingLeft = true;
    }
    if (event.key === "d") {
      isMovingRight = true;
    }
  });
  document.addEventListener("keyup", () => {
    isMovingLeft = false;
    isMovingRight = false;
  });
};

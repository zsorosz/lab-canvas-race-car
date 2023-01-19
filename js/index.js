const myCanvas = document.querySelector("canvas");
const ctx = myCanvas.getContext("2d");
canvas.style.border = "1px solid black";

const bgImg1 = new Image();
bgImg1.src = "../images/road.png";
const bgImg2 = new Image();
bgImg2.src = "../images/road.png";
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

let obsWidth = 0;
let obsHeight = 0;
let obsX = 0;
let obsY = 0;

let score = 0;

const obsArr = [
  {
    obsWidth: Math.floor(Math.random() * 150 + 70),
    obsHeight: 20,
    obsX: Math.floor(Math.random() * (myCanvas.width - 100)),
    obsY: 0,
  },
  {
    obsWidth: Math.floor(Math.random() * 150 + 70),
    obsHeight: 20,
    obsX: Math.floor(Math.random() * (myCanvas.width - 100)),
    obsY: -300,
  },
  {
    obsWidth: Math.floor(Math.random() * 150 + 70),
    obsHeight: 20,
    obsX: Math.floor(Math.random() * (myCanvas.width - 100)),
    obsY: -600,
  },
  {
    obsWidth: Math.floor(Math.random() * 150 + 70),
    obsHeight: 20,
    obsX: Math.floor(Math.random() * (myCanvas.width - 100)),
    obsY: -1200,
  },
  {
    obsWidth: Math.floor(Math.random() * 150 + 70),
    obsHeight: 20,
    obsX: Math.floor(Math.random() * (myCanvas.width - 100)),
    obsY: -2400,
  },
];

function animate() {
  ctx.drawImage(bgImg1, 0, bg1Y, myCanvas.width, myCanvas.height);
  ctx.drawImage(bgImg2, 0, bg2Y, myCanvas.width, myCanvas.height);
  ctx.drawImage(carImg, carX, carY, carWidth, carHeight);

  ctx.font = "48px serif";
  ctx.fillText(`Score: ${score}`, 10, 48);

  const drawObstacle = () => {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    obsArr.forEach((obs) => {
      ctx.rect(obs.obsX, obs.obsY, obs.obsWidth, obs.obsHeight);
    });
    ctx.fill();
    ctx.closePath();
  };

  drawObstacle();

  bg1Y += 2;
  bg2Y += 2;

  obsArr.forEach((obs) => {
    obs.obsY += 2;
    if (
      obs.obsX < carX + carWidth &&
      obs.obsX + obs.obsWidth > carX &&
      obs.obsY < carY + carHeight &&
      obs.obsHeight + obs.obsY > carY
    ) {
      gameOver = true;
    }

    if (obs.obsY === myCanvas.height - 200 && !gameOver) {
      score++;
    }
    if (obs.obsY > myCanvas.height) {
      obs.obsY = -myCanvas.height;
    }
  });

  if (bg1Y > myCanvas.height) {
    bg1Y = -myCanvas.height;
  }
  if (bg2Y > myCanvas.height) {
    bg2Y = -myCanvas.height;
  }

  if (isMovingLeft && carX > 0) {
    carX -= carSpeed;
  }
  if (isMovingRight && carX < myCanvas.width) {
    carX += carSpeed;
  }

  if (!gameOver) {
    animateId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animateId);
    ctx.fillStyle = "red";
    ctx.font = "48px serif";
    ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2);
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
      carX += carSpeed;
    }
    if (event.key === "d") {
      isMovingRight = true;
      carX += carSpeed;
    }
  });
  document.addEventListener("keyup", () => {
    isMovingLeft = false;
    isMovingRight = false;
  });
};

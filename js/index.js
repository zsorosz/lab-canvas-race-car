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

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function animate() {
    ctx.drawImage(bgImg1, 0, bg1Y, myCanvas.width, myCanvas.height);
    ctx.drawImage(bgImg2, 0, bg2Y, myCanvas.width, myCanvas.height);
    ctx.drawImage(
      carImg,
      myCanvas.width / 2 - 50,
      myCanvas.height - 200,
      100,
      200
    );
    bg1Y += 2;
    bg2Y += 2;

    if (bg1Y > myCanvas.height) {
      bg1Y = -myCanvas.height;
    }
    if (bg2Y > myCanvas.height) {
      bg2Y = -myCanvas.height;
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
};

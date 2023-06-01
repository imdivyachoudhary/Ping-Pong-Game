import "./styles.css";

let body = document.getElementsByTagName("body");

// ---------------------------
// creating playboard region
// if screen width is very large, playboard region is 60%
// else playboard region is 100%
// ---------------------------
let playBoard = document.createElement("div");
playBoard.setAttribute("id", "playBoard");
body[0].append(playBoard);

// ---------------------------
// creating rod1
// ---------------------------
let rod1 = document.createElement("div");
rod1.setAttribute("id", "rod1");
rod1.setAttribute("class", "rod rod-top");
rod1.innerText = "Rod 1";
playBoard.append(rod1);

// ---------------------------
// creating rod2
// ---------------------------
let rod2 = document.createElement("div");
rod2.setAttribute("id", "rod2");
rod2.setAttribute("class", "rod rod-bottom");
rod2.innerText = "Rod2";
playBoard.append(rod2);

// ---------------------------
// creating ball
// ---------------------------
let ball = document.createElement("div");
ball.setAttribute("id", "ballBox");
playBoard.append(ball);
let innerBall = document.createElement("div");
innerBall.setAttribute("id", "ball");
innerBall.setAttribute("class", "animate-ball");
ball.append(innerBall);

// ---------------------------
// creating region to be displayed at the beginning and end of the game
// ---------------------------
let msg = document.createElement("div");
msg.setAttribute("id", "msg");
body[0].append(msg);

// let playBoard = document.getElementById("playBoard");
// let rod1 = document.getElementById("rod1");
// let rod2 = document.getElementById("rod2");
// let ball = document.getElementById("ballBox");
// let msg = document.getElementById("msg");

let start;
let score_rod1;
let score_rod2;
let horizontal_direction;
let vertical_direction;

// ---------------------------
// fetching highest score till now
// ---------------------------
// localStorage.removeItem("highestScore");
// localStorage.removeItem("highestScorer");
let highestScore = localStorage.getItem("highestScore");
let highestScorer = localStorage.getItem("highestScorer");

// ---------------------------
// initial stage of game
// ---------------------------
initialize(highestScorer);

let playBoard_cordinates = playBoard.getBoundingClientRect();

// ---------------------------
// for starting game on pressing enter
// and mving the rod left and right
// rods can be moved left using 'a' or 'Left Arrow'
// rods can be moved right using 'd' or 'Right Arrow'
// ---------------------------
document.addEventListener("keydown", function (event) {
  // console.log(event.code);
  if (!start && event.code === "Enter") {
    msg.style.display = "none";
    if (highestScore) {
      alert(
        "Highest Score : " + highestScore + "\nPlayer Name : " + highestScorer
      );
    } else {
      alert(
        "This is your first game \nUse A and D Keys to move Rod 1 \nUse Left Arrow and Right Arrow Keys to move Rod 2"
      );
    }
    gameStart();
  }
  if (start && event.code === "KeyA") {
    let coordinates = rod1.getBoundingClientRect();
    // console.log(coordinates);
    let leftMargin = parseInt(rod1.style.marginLeft, 10);
    if (coordinates.left > playBoard_cordinates.left) {
      rod1.style.marginLeft = leftMargin - 25 + "px";
    }
  } else if (start && event.code === "ArrowLeft") {
    let coordinates = rod2.getBoundingClientRect();
    // console.log(coordinates);
    let leftMargin = parseInt(rod2.style.marginLeft, 10);
    if (coordinates.left > playBoard_cordinates.left) {
      rod2.style.marginLeft = leftMargin - 25 + "px";
    }
  } else if (start && event.code === "KeyD") {
    let coordinates = rod1.getBoundingClientRect();
    // console.log(coordinates);
    let leftMargin = parseInt(rod1.style.marginLeft, 10);
    if (coordinates.right < playBoard_cordinates.right) {
      rod1.style.marginLeft = leftMargin + 25 + "px";
      // console.log(window.getComputedStyle(rod1).marginLeft);
    }
  } else if (start && event.code === "ArrowRight") {
    let coordinates = rod2.getBoundingClientRect();
    // console.log(coordinates);
    let leftMargin = parseInt(rod2.style.marginLeft, 10);
    if (coordinates.right < playBoard_cordinates.right) {
      rod2.style.marginLeft = leftMargin + 25 + "px";
    }
  }
});

// ---------------------------
// start game, controlling the movement of ball
// ---------------------------
function gameStart() {
  start = true;
  innerBall.setAttribute("class", "animate-ball");
  requestAnimationFrame(() => {
    moveBall();
  });
}

function moveBall() {
  let ball_coordinates = ball.getBoundingClientRect();
  let rod1_coordinates = rod1.getBoundingClientRect();
  let rod2_coordinates = rod2.getBoundingClientRect();
  // console.log(ball_coordinates);
  // console.log(rod1_coordinates);
  // console.log(rod2_coordinates);

  if (
    ball_coordinates.top <= rod1_coordinates.bottom &&
    ball_coordinates.left >= rod1_coordinates.left &&
    ball_coordinates.right <= rod1_coordinates.right
  ) {
    vertical_direction = 1;
    score_rod1++;
  } else if (ball_coordinates.top <= playBoard_cordinates.top) {
    let winner = "Rod 2";
    let winnerScore = score_rod2;
    gameOver(winner, winnerScore);
    return;
  }
  if (
    ball_coordinates.bottom >= rod2_coordinates.top &&
    ball_coordinates.left >= rod2_coordinates.left &&
    ball_coordinates.right <= rod2_coordinates.right
  ) {
    vertical_direction = -1;
    score_rod2++;
  } else if (ball_coordinates.bottom >= playBoard_cordinates.bottom) {
    let winner = "Rod 1";
    let winnerScore = score_rod1;
    gameOver(winner, winnerScore);
    return;
  }
  if (
    ball_coordinates.bottom <= playBoard_cordinates.bottom &&
    ball_coordinates.top >= playBoard_cordinates.top
  ) {
    let x = Math.floor(Math.random() * 10) + 2;
    let y = Math.floor(Math.random() * 10) + 2;
    // console.log("playboard left: " + playBoard_cordinates.left);

    let leftMargin = parseInt(ball.style.marginLeft);
    console.log(x * horizontal_direction, y * vertical_direction);
    // let new_left = ball_coordinates.left + x * horizontal_direction + "px";
    let new_top = ball_coordinates.top + y * vertical_direction + "px";

    console.log(
      "Before => left: " + ball.style.left + ", top:" + ball_coordinates.top
    );

    // ball.style.left = new_left;
    ball.style.top = new_top;
    if (ball_coordinates.left <= playBoard_cordinates.left) {
      horizontal_direction = 1;
    } else if (ball_coordinates.right >= playBoard_cordinates.right) {
      horizontal_direction = -1;
    }
    ball.style.marginLeft = leftMargin + x * horizontal_direction + "px";

    ball_coordinates = ball.getBoundingClientRect();
    console.log(
      "After => left: " + ball.style.left + ", top:" + ball_coordinates.top
    );

    requestAnimationFrame(() => {
      moveBall();
    });
  }
}

// ---------------------------
// when the game is over
// ---------------------------
function gameOver(winner, winnerScore) {
  // console.log("over " + end);
  msg.innerText = "Game Over!!!";
  msg.style.display = "flex";
  if (winnerScore > highestScore) {
    highestScore = winnerScore;
    highestScorer = winner;
    localStorage.setItem("highestScore", winnerScore);
    localStorage.setItem("highestScorer", winner);
  }
  setTimeout(function () {
    alert(
      "Game is Over!!! \n" +
        "Winner is " +
        winner +
        " with score of " +
        winnerScore
    );
    initialize(winner);
  }, 1000);
}

// ---------------------------
// for settting the initial stage of game
// ---------------------------
function initialize(winner) {
  start = false;
  score_rod1 = 0;
  score_rod2 = 0;
  horizontal_direction = 1;

  rod1.style.left = "50%";
  rod1.style.marginLeft = "-100px";
  rod2.style.left = "50%";
  rod2.style.marginLeft = "-100px";

  let rod1_coordinates = rod1.getBoundingClientRect();
  let rod2_coordinates = rod2.getBoundingClientRect();

  innerBall.removeAttribute("class", "animate-ball");
  ball.style.left = "50%";
  ball.style.marginLeft = "-10px";
  if (winner === "Rod 2") {
    // console.log(rod1_coordinates.bottom);
    ball.style.top = rod1_coordinates.bottom + "px";
  } else {
    // console.log(rod2_coordinates.top);
    ball.style.top = rod2_coordinates.top - 20 + "px";
  }
  msg.innerText = "Press Enter to Start Game";
}

// ---------------------------
// creating html page by javascript
// ---------------------------

// let app = document.getElementById("app");

// let playBoard = document.createElement("div");
// playBoard.setAttribute("id", "playBoard");
// app.append(playBoard);

// let rod1 = document.createElement("div");
// rod1.setAttribute("id", "rod1");
// rod1.style.height = "20px";
// rod1.style.width = "200px";
// rod1.style.borderRadius = "25px";
// rod1.style.position = "absolute";
// rod1.style.left = "50%";
// rod1.style.marginLeft = "-100px";
// rod1.style.backgroundColor = "rgb(21 111 231)";
// rod1.style.color = "white";
// rod1.style.display = "flex";
// rod1.style.justifyContent = "center";
// rod1.style.alignItems = "center";
// rod1.innerText = "Rod 1";
// playBoard.appendChild(rod1);

// let rod2 = document.createElement("div");
// rod2.setAttribute("id", "rod2");
// rod2.style.height = "20px";
// rod2.style.width = "200px";
// rod2.style.borderRadius = "25px";
// rod2.style.position = "absolute";
// rod2.style.left = "50%";
// rod2.style.marginLeft = "-100px";
// rod2.style.bottom = "0px";
// rod2.style.backgroundColor = "rgb(220 29 220)";
// rod2.style.color = "white";
// rod2.style.display = "flex";
// rod2.style.justifyContent = "center";
// rod2.style.alignItems = "center";
// rod2.innerText = "Rod 2";
// playBoard.appendChild(rod2);

// let ball = document.createElement("div");
// ball.setAttribute("id", "ball");
// ball.style.height = "20px";
// ball.style.width = "20px";
// ball.style.position = "absolute";
// ball.style.left = "50%";
// ball.style.marginLeft = "-10px";
// ball.style.bottom = "20px";
// playBoard.appendChild(ball);

// let ball = document.createElement("div");
// ball.setAttribute("id", "ball");
// ball.style.height = "100%";
// ball.style.width = "100%";
// ball.style.borderRadius = "50%";
// // ball.style.position = "fixed";
// ball.style.backgroundColor = "red";
// ball.appendChild(ball);

// let msg = document.createElement("div");
// msg.setAttribute("id", "msg");
// msg.innerText = "Press Enter to Start Game";
// msg.style.height = "100%";
// msg.style.width = "100%";
// msg.style.backgroundColor = "grey";
// msg.style.position = "absolute";
// msg.style.display = "flex";
// msg.style.justifyContent = "center";
// msg.style.alignItems = "center";
// msg.style.opacity = "0.5";
// msg.style.fontSize = "2rem";
// msg.style.zIndex = "1";
// app.appendChild(msg);

let boxes = document.querySelectorAll(".btn");
let resetBtn = document.querySelector(".reset-btn");
let dismissBtn = document.querySelector(".action");
let msg = document.querySelector(".message");
let winner = msg.querySelector("b");
let turn = "X";
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const reset = () => {
  enableBoxes();
  turn = "X";
};

const tapSound = () => {
  let audio = new Audio('./sounds/tap.mp3');
  audio.play();
};

const gameOverSound = () => {
  let audio = new Audio('./sounds/win.wav')
  audio.play();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    tapSound();
    box.innerText = turn;
    turn === "X" ? (turn = "O") : (turn = "X");
    box.disabled = true;
    count++;
    console.log(count);
    checkDraw();
    checkWinner();
  });
});

const showWinner = (win) => {
  winner.innerText = win;
  msg.classList.remove("hide");
  gameOverSound();
  disableBoxes();
};

const checkDraw = () => {
  if (count >= 9) {
    winner.innerText = "XO";
    msg.classList.remove("hide");
    gameOverSound();
    disableBoxes();
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );
    let match1 = boxes[pattern[0]].innerText;
    let match2 = boxes[pattern[1]].innerText;
    let match3 = boxes[pattern[2]].innerText;

    if (match1 != "" && match2 != "" && match3 != "") {
      if (match1 === match2 && match2 === match3) {
        console.log("Winner : ", match1);
        showWinner(match1);
      }
    }
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  count = 0;
};

resetBtn.addEventListener("click", reset);

const dismiss = () => {
  dismissBtn.addEventListener("click", () => {
    msg.classList.add("hide");
    reset();
  })
};

dismiss();
// alert("Good luck!"); // Of course you can remove this (annoying) line ;)
const isMine = (mines, total) => (Math.floor(Math.random() * total) < mines);
let boardArray;
let gameOver = true;
let startTime;
let mines;
let remainingTiles;
let winner;

const generateArrays = () => {
  const width = parseInt(document.querySelector('#width').value, 10);
  const height = parseInt(document.querySelector('#height').value, 10);
  mines = parseInt(document.querySelector('#mines').value, 10);
  boardArray = Array(height);
  // debugger;
  for (let i = 0; i < height; i += 1) {
    boardArray[i] = Array(width);
  }
  const total = width * height;
  let minesRemaing = mines > total ? total - 1 : mines;
  for (let i = 0; minesRemaing !== 0; i += 1) {
    if (i === boardArray.length) { i = 0; }
    for (let j = 0; j < boardArray[i].length; j += 1) {
      if (isMine(mines, total) && boardArray[i][j] !== 'mine' && minesRemaing) {
        boardArray[i][j] = 'mine';
        minesRemaing -= 1;
      }
    }
  }
  remainingTiles = total;
};

const touchingBoxes = (row, col) => {
  const boxes = [];
  for (let i = -1; i < 2; i += 1) {
    if (row + i === boardArray.length) { break; }
    if (row + i === -1) { i += 1; }
    for (let j = -1; j < 2; j += 1) {
      if (col + j < boardArray[row].length) {
        if (col + j === -1) { j = 0; }
        boxes.push(boardArray[row + i][col + j]);
      }
    }
  }
  return boxes;
};

const generateClass = (row, col) => {
  if (boardArray[row][col] === 'mine') { return 'mine'; }
  let minesNearby = 0;
  touchingBoxes(row, col).forEach((box) => {
    if (box === 'mine') { minesNearby += 1; }
  });
  // debugger;
  const generatedClass = (minesNearby ? `mine-neighbour-${minesNearby}` : 'opened');
  return generatedClass;
};

const nearbyBoxes = (row, col) => {
  // debugger;
  const nearby = [];
  if (row) {
    nearby.push(boardArray[row - 1][col]);
  }
  if (row + 1 !== boardArray.length) {
    nearby.push(boardArray[row + 1][col]);
  }
  if (col) {
    nearby.push(boardArray[row][col - 1]);
  }
  if (col + 1 !== boardArray[row].length) {
    nearby.push(boardArray[row][col + 1]);
  }
  return nearby;
};

const over = () => {
  if (gameOver || remainingTiles === mines) {
    // debugger;
    gameOver = true;
    const current = new Date();
    const time = (Math.floor((current - startTime) / 1000));
    const result = ((winner && remainingTiles === parseInt(mines, 10)) ? 'Win' : 'Lose');
    const displayResult = document.querySelector("#result");
    displayResult.innerHTML = `You ${result}! Your final time was ${time} seconds`;
  }
};

const open = (box) => {
  if (!box.classList.contains('unopened')) { return; }

  if (box.classList.contains('mine')) {
    gameOver = true;
    winner = false;
  }
  const row = parseInt(box.dataset.row, 10);
  const col = parseInt(box.dataset.col, 10);
  box.classList.remove("unopened");
  box.classList.remove("flagged");
  remainingTiles -= 1;
  if (box.classList.contains('opened')) {
    touchingBoxes(row, col).forEach((ele) => {
      if (!box.classList.contains('unopened')) { open(ele); }
    });
  } else {
    const nearby = nearbyBoxes(row, col);
    for (let b = 0; b < nearby.length; b += 1) {
      // debugger;
      if (nearby[b].classList.contains('opened') && nearby[b].classList.contains('unopened')) { open(nearby[b]); }
    }
  }
  over();
};

const generateEventListeners = (row) => {
  const boxes = row.querySelectorAll("td");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (gameOver) { return; }
      open(box);
    });
    box.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (gameOver || !box.classList.contains('unopened')) { return; }
      box.classList.toggle('flagged');
    });
  });
  // eslint-disable-next-line consistent-return
  return boxes;
};

function generateBoard() {
  generateArrays();
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  const boxes = [];
  for (let i = 0; i < boardArray.length; i += 1) {
    const row = document.createElement("tr");
    for (let j = 0; j < boardArray[i].length; j += 1) {
      // debugger;
      const minesNearby = generateClass(i, j);
      row.insertAdjacentHTML("beforeend", `<td class="${minesNearby} unopened" data-row="${i}" data-col="${j}"></td>`);
    }
    table.insertAdjacentElement("beforeend", row);
    boxes[i] = generateEventListeners(row);
  }
  for (let c = 0; c < boxes.length; c += 1) {
    for (let r = 0; r < boxes[c].length; r += 1) {
      boardArray[c][r] = boxes[c][r];
    }
  }
}

const btn = document.querySelector("#clickme");
btn.addEventListener("click", () => {
  generateBoard();
  gameOver = false;
  winner = true;
  startTime = new Date();
  const displayResult = document.querySelector("#result");
  displayResult.innerHTML = '';
  // debugger;
});

// const refresh = () => {
//   console.log('hello');
//   if (!gameOver) {
//     const current = new Date();
//     const timer = document.querySelector("#timer");
//     const time = (Math.floor((current - startTime) / 1000));
//     timer.innerText = `${time}sec`;
//   }
// };

// const myRefresh = setInterval(refresh(), 1000);

// myRefresh();

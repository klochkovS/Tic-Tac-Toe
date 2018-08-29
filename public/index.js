const root = document.getElementById('root');

const winCombination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let isCross = true;

const messageBox = document.createElement('div');
messageBox.className = 'messageBox';
messageBox.textContent = isCross ? 'Ходят крестки' : 'Ходят нолики';
const gameField = document.createElement('div');
gameField.className = 'gameField';
root.appendChild(messageBox);
root.appendChild(gameField);

let strokeCount = 0;
let crossStrokes = [];
let circleStrokes = [];

const stopGame = () => {
  const cellList = document.querySelectorAll('.cell');
  cellList.forEach((cell) => {
    cell.removeEventListener('click', stroke);
  });
};

const checkWin = (strokesArr) => {
  messageBox.textContent = isCross ? 'Ходят крестки' : 'Ходят нолики';
  winCombination.forEach((winArr) => {
    let count = 0;
    strokesArr.forEach((value) => {
      if (winArr.indexOf(value) !== -1) {
        count += 1;
        if (count === 3) {
          stopGame();
          restartButton.className = 'btn-restart';
          messageBox.textContent = isCross
            ? 'Победили крестики'
            : 'Победили нолики';
        }
      }
    });
  });
};


const stroke = ({ target }) => {
  const figure = document.createElement('span');
  target.removeEventListener('click', stroke);

  if (strokeCount % 2) {
    figure.className = 'circle';
    circleStrokes.push(+target.dataset.cellId);
    checkWin(circleStrokes);
  } else {
    figure.className = 'cross';
    crossStrokes.push(+target.dataset.cellId);
    checkWin(crossStrokes);
  }
  isCross = !isCross; // новая игра первый ход проигравшему
  target.appendChild(figure);
  strokeCount += 1;
  if (strokeCount === 9) {
    messageBox.textContent = 'Ничья!';
    stopGame();
    restartButton.className = 'btn-restart';
  }
};


const newGame = () => {
  const crosList = document.querySelectorAll('.cross');
  const circleList = document.querySelectorAll('.circle');
  const figureList = [...crosList, ...circleList];
  figureList.forEach((figure) => {
    figure.remove();
  });
  const cellList = document.querySelectorAll('.cell');
  cellList.forEach(cell => cell.addEventListener('click', stroke));
  crossStrokes = [];
  circleStrokes = [];
  strokeCount = 0;
  restartButton.className += ' btn-restart_hidden';
  messageBox.textContent = isCross ? 'Ходят крестки' : 'Ходят нолики';
};


for (let i = 0; i < 9; i += 1) {
  const cell = document.createElement('div');
  cell.dataset.cellId = i + 1;
  cell.addEventListener('click', stroke);

  cell.className = 'cell';
  gameField.appendChild(cell);
}

const restartButton = document.createElement('div');
restartButton.addEventListener('click', newGame);
restartButton.className = 'btn-restart btn-restart_hidden';
restartButton.textContent = 'Новая игра';
root.appendChild(restartButton);

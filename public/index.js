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

function Game(root) {
  this._isCross = true;
  this._isOver = false;
  this._strokeCount = 0;
  this._crossStrokes = [];
  this._circleStrokes = [];

  this._messageBox = document.createElement('div');
  this._messageBox.className = 'messageBox';
  this._messageBox.textContent = this._isCross
    ? 'Ходят крестки'
    : 'Ходят нолики';
  root.appendChild(this._messageBox);

  this._gameField = document.createElement('div');
  this._gameField.className = 'gameField';
  root.appendChild(this._gameField);

  this._makeCells(); // Сначала доска потом клетки

  this._restartButton = document.createElement('div');
  this._restartButton.addEventListener('click', this._newGame.bind(this));
  this._restartButton.className = 'btn-restart btn-restart_hidden';
  this._restartButton.textContent = 'Новая игра';
  root.appendChild(this._restartButton);
}

Game.prototype._makeCells = function () {
  for (let i = 0; i < 9; i += 1) {
    const cell = document.createElement('div');
    cell.dataset.cellId = i + 1;
    cell.addEventListener('click', this._stroke.bind(this), { once: true });
    cell.className = 'cell';
    this._gameField.appendChild(cell);
  }
};

Game.prototype._newGame = function () {
  // Нельзя удалить слушатель из-за bind (можно с костылем см.сылку)
  // поэтому пересоздаю ячейки заново, чтобы не остались старые слушатели событий
  // https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener#The_value_of_this_within_the_handler
  const cellList = document.querySelectorAll('.cell');
  cellList.forEach((cell) => {
    cell.remove();
  });
  this._makeCells();

  this._crossStrokes = [];
  this._circleStrokes = [];
  this._strokeCount = 0;
  this._isCross = true;
  this._isOver = false;
  this._restartButton.className += ' btn-restart_hidden';
  this._messageBox.textContent = this._isCross
    ? 'Ходят крестки'
    : 'Ходят нолики';
};

Game.prototype._stroke = function ({ target }) {
  const figure = document.createElement('span');
  if (this._strokeCount % 2) {
    figure.className = 'circle';
    this._circleStrokes.push(+target.dataset.cellId);
    !this._isOver && this._checkWin(this._circleStrokes);
  } else {
    figure.className = 'cross';
    this._crossStrokes.push(+target.dataset.cellId);
    !this._isOver && this._checkWin(this._crossStrokes);
  }
  target.appendChild(figure);
  this._isCross = !this._isCross;

  if (!this._isOver) {
    this._messageBox.textContent = this._isCross
      ? 'Ходят крестки'
      : 'Ходят нолики';
  }
  this._strokeCount += 1;
  if (this._strokeCount === 9 && !this._isOver) {
    this._messageBox.textContent = 'Ничья!';
    this._stopGame();
    this._restartButton.className = 'btn-restart';
  }
};

Game.prototype._checkWin = function (strokesArr) {
  winCombination.forEach((winArr) => {
    let count = 0;
    strokesArr.forEach((value) => {
      if (winArr.indexOf(value) !== -1) {
        count += 1;
        if (count === 3) {
          this._stopGame();
          this._restartButton.className = 'btn-restart';

          this._messageBox.textContent = this._isCross
            ? 'Победили крестики'
            : 'Победили нолики';
        }
      }
    });
  });
};

Game.prototype._stopGame = function () {
  // Тут можно было бы просто сбросить евенты,
  // но... см. коммент в this._newGame
  this._isOver = true;
};


const root = document.getElementById('root');
const game = new Game(root);

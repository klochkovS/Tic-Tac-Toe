function Game() {
  this._isCross = true;
  this._strokeCount = 0;
  this._crossStrokes = [];
  this._circleStrokes = [];

  this._cellList = [];
  this._crossList = [];
  this._circleList = [];
}

Game.prototype._newGame = () => {
  // const crosList = document.querySelectorAll('.cross');
  // const circleList = document.querySelectorAll('.circle');
  const figureList = [...this._circleList, ...this._crossList];
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

const game = new Game();

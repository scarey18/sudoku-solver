const grid = require('./gridUtils.js');
const solve = require('./solve.js');

const resetButton = document.getElementById('reset-button');
const tiles = document.querySelectorAll('.tile');
const solveButton = document.getElementById('solve-button');

for (let tile of tiles) {
	tile.addEventListener('click', () => grid.setFocus(tile));
}

window.addEventListener('keydown', function(e) {
	if (e.key == 'Tab') {e.preventDefault();}
	grid.keyDown(e.key);
});

solveButton.addEventListener('click', function() {
	for (let tile of tiles) {
		if (tile.style.backgroundColor == 'rgb(255, 57, 57)') {
      alert('Make sure your input is correct!');
			return;
		}
	}
  solve.solveBoard();
});

resetButton.addEventListener('click', () => location.reload());

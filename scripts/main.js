const utils = require('./gridUtils.js');
const solve = require('./solve.js');

const tiles = document.querySelectorAll('.tile');
const resetButton = document.getElementById('reset-button');
const solveButton = document.getElementById('solve-button');
const errorMessage = document.querySelector('.buttons p');

for (let tile of tiles) {
	tile.addEventListener('click', () => utils.setFocus(tile));
	tile.addEventListener('input', (e) => {
		if (e.data && e.data > 0 && e.data < 10) {
			e.target.value = e.data;
		} else if (e.data < 1) {
			e.target.value = null;
		} else if (e.target.value < 1) {
			e.target.value = null;
		} else if (e.target.value > 9) {
			e.target.value = 9;
		}
		utils.checkBoard();
	})
}

window.addEventListener('keydown', function(e) {
	const arrowKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Tab'];
	if (arrowKeys.includes(e.key)) {
		e.preventDefault();
	}
	utils.keyDown(e.key);
});

solveButton.addEventListener('click', function() {
	for (let tile of tiles) {
		if (tile.style.backgroundColor == 'rgb(255, 57, 57)') {
      errorMessage.style.visibility = 'visible';
			return;
		}
	}
	errorMessage.style.visibility = 'hidden';
    solve.solveBoard();
});

resetButton.addEventListener('click', () => location.reload());

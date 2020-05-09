const utils = require('./gridUtils.js');

const grid = document.querySelector('.grid');

// Creates 9 squares within the grid
for (let i = 0; i < 9; i++) {
	const square = document.createElement('div');
	square.classList.add('square');
	square.classList.add(`sq${i}`);
	grid.appendChild(square);
}

const squares = document.querySelectorAll('.square');

// Creates 81 total tiles within the grid, 9 in each square
squares.forEach((square, sqId) => {
	for (let i = 0; i < 9; i++) {
		const tile = document.createElement('input');
		tile.classList.add('tile');
		tile.classList.add(`t${i}`);
		const row = getRow(i, sqId);
		const col = getCol(i, sqId);
		tile.id = col + 9 * row;
		tile.setAttribute('type', 'number');
		tile.setAttribute('square', sqId);
		tile.setAttribute('row', row);
		tile.setAttribute('col', col);
		tile.setAttribute('max', 9);
		tile.setAttribute('min', 1);
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
		square.appendChild(tile);
	}
})

function getRow(i, sqId) {
	return Math.floor(i / 3) + (Math.floor(sqId / 3) * 3);
}

function getCol(i, sqId) {
	return (i % 3) + 3 * (sqId % 3);
}
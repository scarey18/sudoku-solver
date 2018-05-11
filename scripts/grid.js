const grid = document.querySelector('.grid');

// Creates 9 squares within the grid
for (let i = 0; i < 9; i++) {
	const square = document.createElement('div');
	square.classList.add('square');
	square.classList.add(`sq${i}`);
	grid.appendChild(square);
}

const squares = document.querySelectorAll('.square');

// Creates 81 total tiles within the grid
let id = 0;
for (let squareRow = 0; squareRow < 7; squareRow += 3) {
	for (let tileRow = 0; tileRow < 7; tileRow += 3) {
		for (let s = squareRow; s < squareRow+3; s++) {
			for (let t = tileRow; t < tileRow+3; t++) {
				const tile = document.createElement('div');
				tile.classList.add('tile');
				tile.classList.add(`t${t}`);
				tile.id = id;
				tile.setAttribute('square', s);
				tile.setAttribute('row', Math.floor(id/9));
				tile.setAttribute('col', id%9);
				squares[s].appendChild(tile);
				id++;
			}
		}
	}
}
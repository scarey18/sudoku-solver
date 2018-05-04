const grid = document.querySelector('.grid');

for (let i=0; i<9; i++) {
	const square = document.createElement('div');
	square.classList.add('square');
	square.classList.add(`sq${i}`);
	grid.appendChild(square);
}

let squares = document.querySelectorAll('.square');

function setFocus(tile) {
	let focused = document.querySelector('.focus');
	if (focused) {focused.classList.remove('focus');}
	tile.classList.add('focus');
}

let s = 0
squares.forEach(function(square) {
	for (let i=0; i<9; i++) {
		const tile = document.createElement('div');
		tile.classList.add('tile');
		tile.classList.add(`t${i}`);
		tile.setAttribute('id', s);
		tile.addEventListener('click', () => setFocus(tile));
		square.appendChild(tile);
		s++;
	}
});
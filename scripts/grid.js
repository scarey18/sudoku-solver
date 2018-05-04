// Creates the grid and adds EventListeners to allow
// navigation and number input.

const grid = document.querySelector('.grid');

for (let i = 0; i < 9; i++) {
	const square = document.createElement('div');
	square.classList.add('square');
	square.classList.add(`sq${i}`);
	grid.appendChild(square);
}

const squares = document.querySelectorAll('.square');

let id = 0;
for (let sqrow = 0; sqrow < 7; sqrow += 3) {
	for (let trow = 0; trow < 7; trow += 3) {
		for (let s = 0; s < 3; s++) {
			const square = squares[sqrow+s];
			for (let t = 0; t < 3; t++) {
				const tile = document.createElement('div');
				tile.classList.add('tile');
				tile.classList.add(`t${trow+t}`);
				tile.setAttribute('id', id);
				tile.setAttribute('square', sqrow+s);
				tile.setAttribute('row', Math.floor(id/9));
				tile.setAttribute('col', id % 9);
				tile.addEventListener('click', () => setFocus(tile));
				square.appendChild(tile);
				id++;
			}
		}
	}
}

function setFocus(tile) {
	let focused = document.querySelector('.focus');
	if (focused) {focused.classList.remove('focus');}
	tile.classList.add('focus');
}

function moveFocus(key, focused) {
	const id = parseInt(focused.getAttribute('id'));
	switch (key) {
		case 'ArrowUp':
			if (focused.getAttribute('row') != '0') {
				focused.classList.remove('focus');
				document.getElementById(id-9).classList.add('focus');
			}
			break;
		case 'ArrowRight': case 'Tab':
			if (focused.getAttribute('id') != '80') {
				focused.classList.remove('focus');
				document.getElementById(id+1).classList.add('focus');
			}
			break;
		case 'ArrowDown':
			if (focused.getAttribute('row') != '8') {
				focused.classList.remove('focus');
				document.getElementById(id+9).classList.add('focus');
			}
			break;
		case 'ArrowLeft':
			if (focused.getAttribute('id') != '0') {
				focused.classList.remove('focus');
				document.getElementById(id-1).classList.add('focus');
			}
	}
}

function keyDown(key) {
	const focused = document.querySelector('.focus');
	const arrowKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Tab'];
	if (!focused) {return;}
	if ('123456789'.indexOf(key) >= 0) {
		focused.textContent = key;
		focused.style.backgroundColor = '#8080804a';
	} else if (arrowKeys.includes(key)) {
		moveFocus(key, focused);
	} else if (key == 'Backspace' || key == 'Delete') {
		if (focused.textContent) {
			focused.textContent = '';
			focused.style.backgroundColor = '';
		}
	}
}

window.addEventListener('keydown', (e) => keyDown(e.key));
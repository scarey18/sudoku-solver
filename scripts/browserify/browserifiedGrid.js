(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./gridUtils.js":2}],2:[function(require,module,exports){
function setFocus(tile) {
	const focused = document.querySelector('.focus');
	if (focused) {focused.classList.remove('focus');}
	tile.classList.add('focus');
	tile.focus();
}

function keyDown(key) {
	const focused = document.querySelector('.focus');
	const arrowKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Tab'];
	if (!focused) {return;}
	if (arrowKeys.includes(key)) {
		moveFocus(key, focused);
	}
}

function moveFocus(key, focused) {
	const id = parseInt(focused.id);
	switch (key) {
		case 'ArrowUp':
			if (focused.getAttribute('row') != '0') {
				setFocus(document.getElementById(id-9));
			}
			break;
		case 'ArrowRight': case 'Tab':
			if (focused.getAttribute('id') != '80') {
				setFocus(document.getElementById(id+1));
			}
			break;
		case 'ArrowDown':
			if (focused.getAttribute('row') != '8') {
				setFocus(document.getElementById(id+9));
			}
			break;
		case 'ArrowLeft':
			if (focused.getAttribute('id') != '0') {
				setFocus(document.getElementById(id-1));
			}
	}
}

function checkBoard() {
	// Checks for conflicting numbers on input and sets background color
	const tiles = document.querySelectorAll('.tile');
	for (let t1 of tiles) {
		if (!t1.value) {
			t1.style.backgroundColor = null;
			t1.style.color = null;
		} else {
			t1.style.backgroundColor = '#8080804a';
			t1.style.color = 'black';
			for (let t2 of tiles) {
				if (t1.value === t2.value && t1 !== t2) {
					if (t1.getAttribute('square')===t2.getAttribute('square') || t1.getAttribute('row')===t2.getAttribute('row') || t1.getAttribute('col')===t2.getAttribute('col')) {
						t1.style.backgroundColor = '#ff3939';
						t2.style.backgroundColor = '#ff3939';
						t1.style.color = 'white';
						t2.style.color = 'white';
					}
				}
			}
		}
	}
}

module.exports = {
	setFocus,
	moveFocus,
	checkBoard,
	keyDown
}

},{}]},{},[1]);

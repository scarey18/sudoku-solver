(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
const utils = require('./gridUtils.js');
const solve = require('./solve.js');

const tiles = document.querySelectorAll('.tile');
const resetButton = document.getElementById('reset-button');
const solveButton = document.getElementById('solve-button');
const errorMessage = document.querySelector('.buttons p');

for (let tile of tiles) {
	tile.addEventListener('click', () => utils.setFocus(tile));
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

},{"./gridUtils.js":1,"./solve.js":3}],3:[function(require,module,exports){
const tiles = document.querySelectorAll('.tile');

function solveBoard() {
	let board = [];
	for (let i=0; i<81; i++) {
		const tile = document.getElementById(i);
		let value = 0;
		if (tile.value) {
			value = parseInt(tile.value);
		}
		board.push({
			id: parseInt(tile.id),
			square: parseInt(tile.getAttribute('square')),
			row: parseInt(tile.getAttribute('row')),
			col: parseInt(tile.getAttribute('col')),
			value,
			options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		});
	}

	clean(board);
	const answer = recursivelySolve(board);

	if (answer) {
		for (let tile of tiles) {
			tile.value = answer[tile.id].value;
		}
	}
}

function clean(board) {
	// Gets rid of options that are logically eliminated
	let changedSomething = true;
	while (changedSomething) {
		changedSomething = false;
		for (let active of activeTiles(board)) {
			let options = active.options;
			for (let peer of peers(board, active)) {
				if (options.includes(peer.value)) {
					options.splice(options.indexOf(peer.value), 1);
				}
			}
			// If only one option is left, assign the tile that value
			if (options.length === 1) {
				active.value = options[0];
				changedSomething = true;
			// If no options are left, a contradiction is raised
			} else if (options.length === 0) {
				return false;
			}
		}
	}
	return true;
}

function recursivelySolve(board) {
	const actives = activeTiles(board);
	if (actives.length < 1) return board;
	const tile = actives[0];
	for (let option of tile.options) {
		let clone = cloneBoard(board);
		clone[tile.id].value = option;
		if (clean(clone)) {
			const solved = recursivelySolve(clone);
			if (solved) return solved;
		}
	}
}

function cloneBoard(board) {
	return board.map(tile => (
		{
			...tile,
			options: [...tile.options],
		}
	))
}

function activeTiles(board) {
	return board.filter(tile => tile.value === 0)
		.sort((a, b) => a.options.length - b.options.length);
}

function peers(board, tile) {
	// "Peers" are all other tiles within the specified tile's square, column, or row
	return board.filter(tile2 => {
		return tile2 !== tile && (
			tile2.square === tile.square || 
			tile2.row === tile.row || 
			tile2.col === tile.col
		)
	});
}

module.exports = {solveBoard};

},{}]},{},[2]);

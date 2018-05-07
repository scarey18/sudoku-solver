//Solves the given board. This file is included in the browserified.js file

const cloneDeep = require('lodash.clonedeep');

const tiles = document.querySelectorAll('.tile');
const solveButton = document.getElementById('solve-button');

solveButton.addEventListener('click', function() {
	for (let tile of tiles) {
		if (tile.style.backgroundColor == 'rgb(255, 57, 57)') {
      alert('Make sure your input is correct!');
			return false;
		}
	}
  solveBoard();
});

function solveBoard() {

	let board = [];
	for (let i=0; i<81; i++) {
		const tile = document.getElementById(i);
		let value = 0;
		if (tile.textContent) {
			value = parseInt(tile.textContent);
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

	function activeTiles(board) {
		return board.filter(tile => tile.value == 0);
	}

	function peers(board, tile) {
		// "Peers" are all other tiles within the specified tile's square, column, or row
		const peers = board.filter(tile2 => tile2.square==tile.square || tile2.row==tile.row || tile2.col==tile.col);
		peers.splice(peers.indexOf(tile), 1);
		return peers;
	}

	function clean(board) {
		// This eliminates each active tile's options based on the values of its peers, and assigns it a value if there is only one option left.
		for (let i=0; i<7; i++) {
			for (let active of activeTiles(board)) {
				let options = active.options;
				for (let peer of peers(board, active)) {
					if (options.includes(peer.value)) {
						options.splice(options.indexOf(peer.value), 1);
					}
				}
				if (options.length == 1) {
					active.value = options[0];
					//If no options are left, a contradiction is raised
				} else if (options.length == 0) {
					return false;
				}
			}
		}
		return true;
	}

	function chooseTile(board) {
		// Finds an active tile with the least possible options
		const options = activeTiles(board).sort(function(a, b) {
			return a.options.length - b.options.length;
		});
		if (options) {return options[0];}
		return false;
	}

	function recursive(board) {
		let tile = chooseTile(board);
		if (!tile) {return board};
		for (let option of tile.options) {
			let copy = cloneDeep(board);
			copy[tile.id].value = option;
			if (clean(copy)) {
				let test = recursive(copy);
				if (test) {return test;}
			}
		}
		return false;
	}

	clean(board);
	const answer = recursive(board);

	if (answer) {
		for (let tile of tiles) {
			tile.textContent = answer[tile.id].value;
		}
	}
}

const cloneDeep = require('lodash.clonedeep');

const tiles = document.querySelectorAll('.tile');

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

	clean(board);
	const answer = recursivelySolve(board);

	if (answer) {
		for (let tile of tiles) {
			tile.textContent = answer[tile.id].value;
		}
	}
}

function clean(board) {
	// Gets rid of options that are logically eliminated
	for (let i=0; i<15; i++) {
		for (let active of activeTiles(board)) {
			let options = active.options;
			for (let peer of peers(board, active)) {
				if (options.includes(peer.value)) {
					options.splice(options.indexOf(peer.value), 1);
				}
			}
			// If only one option is left, assign the tile that value
			if (options.length == 1) {
				active.value = options[0];
			// If no options are left, a contradiction is raised
			} else if (options.length == 0) {
				return;
			}
		}
	}
	return true;
}

function recursivelySolve(board) {
	let tile = chooseTile(board);
	if (!tile) {return board};
	for (let option of tile.options) {
		let copy = cloneDeep(board);
		copy[tile.id].value = option;
		if (clean(copy)) {
			let test = recursivelySolve(copy);
			if (test) {return test;}
		}
	}
}

function chooseTile(board) {
	const options = activeTiles(board).sort(function(a, b) {
		return a.options.length - b.options.length;
	});
	if (options) {return options[0];}
	else {return false;}
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

module.exports = {solveBoard};

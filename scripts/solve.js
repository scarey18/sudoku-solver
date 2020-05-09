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
	return board.map(tile => {
		return {
			id: tile.id,
			square: tile.square,
			row: tile.row,
			col: tile.col,
			value: tile.value,
			options: [...tile.options],
		}
	})
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

function setFocus(tile) {
	const focused = document.querySelector('.focus');
	if (focused) {focused.classList.remove('focus');}
	tile.classList.add('focus');
}

function keyDown(key) {
	const focused = document.querySelector('.focus');
	const arrowKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Tab'];
	if (!focused) {return;}
	if ('123456789'.indexOf(key) > -1) {
		focused.textContent = key;
		checkBoard();
	} else if (arrowKeys.includes(key)) {
		moveFocus(key, focused);
	} else if (key == 'Backspace' || key == 'Delete') {
		focused.textContent = '';
		focused.style.backgroundColor = '';
		checkBoard();
	}
}

function moveFocus(key, focused) {
	const id = parseInt(focused.id);
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

function checkBoard() {
	// Checks for conflicting numbers on input
	const tiles = document.querySelectorAll('.tile');
	for (let t1 of tiles) {
		if (t1.textContent) {
			t1.style.backgroundColor = '#8080804a';
			t1.style.color = 'black';
			for (let t2 of tiles) {
				if (t1.textContent == t2.textContent && t1 != t2) {
					if (t1.getAttribute('square')==t2.getAttribute('square') || t1.getAttribute('row')==t2.getAttribute('row') || t1.getAttribute('col')==t2.getAttribute('col')) {
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

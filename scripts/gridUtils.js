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

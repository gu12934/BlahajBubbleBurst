// const preyTypes = [
// 	{ icon: `🦀`, topRange: [75, 88], speedRange: [1, 2], specialType: 'rotate' },
// 	{ icon: `🦐`, topRange: [15, 85], speedRange: [1, 2] },
// 	{ icon: `🐠`, topRange: [13, 50], speedRange: [1, 3] },
// 	{ icon: `🐡`, topRange: [15, 55], speedRange: [1, 3] },
// 	{ icon: `🐟`, topRange: [20, 65], speedRange: [1, 3] },
// 	{ icon: `🦑`, topRange: [15, 82], speedRange: [1, 2], specialType: 'reverse' },
// 	{ icon: `🐙`, topRange: [15, 85], speedRange: [1, 2], specialType: 'rotate' },
// 	{ icon: `🦞`, topRange: [70, 85], speedRange: [1, 2], specialType: 'rotate' }
// ];

// const preyTypeBonuses = {
// 	20: { icon: `🐬`, topRange: [8, 70], speedRange: [3, 4] },
// 	40: { icon: `🐋`, topRange: [30, 70], speedRange: [1, 4] },
// 	60: { icon: `🐳`, topRange: [40, 78], speedRange: [2, 5] },
// 	80: { icon: [ `🏊🏻‍♀️`, `🏊🏼`, `🏊🏽`, `🏊🏾`, `🏊🏿`, `🏊🏻‍♂️`, `🏊🏼‍♂️`, `🏊🏽‍♂️`, `🏊🏾‍♂️`, `🏊🏿‍♂️`, `🏊🏻‍♀️`, `🏊🏼‍♀️`, `🏊🏽‍♀️`, `🏊🏾‍♀️`, `🏊🏿‍♀️`], topRange: [14, 17], speedRange: [2, 4] },
// 	100: { icon: [`🏄🏻`, `🏄🏼`, `🏄🏽`, `🏄🏾`, `🏄🏿`, `🏄🏻‍♂️`, `🏄🏼‍♂️`, `🏄🏽‍♂️`, `🏄🏾‍♂️`, `🏄🏿‍♂️`, `🏄🏻‍♀️`, `🏄🏼‍♀️`, `🏄🏽‍♀️`, `🏄🏾‍♀️`, `🏄🏿‍♀️`], topRange: [11, 14], speedRange: [3, 5] },
// 	125: { icon: `🚣`, topRange: [11, 13], speedRange: [1, 1] },
// 	150: { icon: `☁️`, topRange: [-4, -3], speedRange: [2, 4] },
// 	175: { icon: `🦇`, topRange: [-4, -3], speedRange: [2, 4] },
// 	200: { icon: `⛵`, topRange: [11, 13], speedRange: [2, 4] },
//   233: { icon: `🦅`, topRange: [-4, -3], speedRange: [2, 4] },
// 	266: { icon: `🚤`, topRange: [11, 13], speedRange: [8, 8] },
// 	300: { icon: [`🧜🏻`, `🧜🏼`, `🧜🏽`, `🧜🏾`, `🧜🏿`, `🧜🏻‍♂️`, `🧜🏼‍♂️`, `🧜🏽‍♂️`, `🧜🏾‍♂️`, `🧜🏿‍♂️`, `🧜🏻‍♀️`, `🧜🏼‍♀️`, `🧜🏽‍♀️`, `🧜🏾‍♀️`, `🧜🏿‍♀️`], topRange: [15, 85], speedRange: [1, 2], specialType: 'reverse' },
// 	350: { icon: `🛥️`, topRange: [11, 13], speedRange: [5, 5] },
// 	400: { icon: `🐊`, topRange: [18, 85], speedRange: [2, 3] },
// 	450: { icon: `⛴️`, topRange: [11, 13], speedRange: [2, 4] },
// 	500: { icon: `🐚`, topRange: [84, 87], speedRange: [1, 1] },
// 	550: { icon: `🚢`, topRange: [11, 13], speedRange: [1, 3] },
// 	600: { icon: `🌿`, topRange: [84, 87], speedRange: [1, 1] },
// 	650: { icon: `🛳️`, topRange: [11, 13], speedRange: [1, 3] },
// 	700: { icon: `🚁`, topRange: [-4, -3], speedRange: [9, 9] },
// 	750: { icon: `🛰`, topRange: [-5, -4], speedRange: [8, 8] },
// 	800: { icon: `🗿`, topRange: [84, 87], speedRange: [1, 1] },
// 	850: { icon: `🛸`, topRange: [-5, -2], speedRange: [11, 11] },
// 	900: { icon: `🐉`, topRange: [-5, -2], speedRange: [12, 12] },
// 	950: { icon: `⭐`, topRange: [-5, -2], speedRange: [12, 12] },
// 	1000: { icon: `💎`, topRange: [25, 85], speedRange: [1, 1] }
// };

// const chomp = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/436243/aud_chomp.mp3`;

// const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

// const elementsIntersect = (elA, elB) => {
// 	const a = elA.getBoundingClientRect();
// 	const b = elB.getBoundingClientRect();
// 	return (
// 			(b.top >= a.top && b.top <= a.bottom) 
// 			|| (b.bottom >= a.top && b.bottom <= a.bottom)
// 		) 
// 		&& (
// 			(b.left >= a.left && b.left <= a.right) 
// 			|| (b.right >= a.left && b.right <= a.right)
// 		);
// };

// let sharkRafTimeout;
// let preyRafTimeout;
// let lastX = 0;
// let score = 0;
// let garbageCount = 0;
// let maxPreyCount = 10;
// const maxPreyCountLimit = 50;
// const htmlEl = document.getElementsByTagName('html')[0];
// const baseSharkEl = document.querySelector('.shark');

// const iterateScore = () => {
//   score = score + 1;
// 	if (preyTypeBonuses.hasOwnProperty(score)) {
// 		preyTypes.push(preyTypeBonuses[score]);
// 		if (maxPreyCount <= maxPreyCountLimit) {
// 			maxPreyCount = maxPreyCount + 1;
// 		}
// 	}
// 	document.querySelector('.score').textContent = score;
// };

// const removePrey = (preyEl, eaten = false) => {
// 	preyEl.remove();
// 	if (eaten) {
// 		new Audio(chomp).play();
// 		iterateScore();
// 	}
// 	if (garbageCount >= 0) garbageCount = garbageCount - 1;
// };

// document.addEventListener('keydown', ({ keyCode, ...rest }) => {
// 	if (sharkRafTimeout) window.cancelAnimationFrame(sharkRafTimeout);
// 	sharkRafTimeout = window.requestAnimationFrame(() => {
// 		const sharkEl = document.querySelector('.shark');
// 		const { top, bottom, left, right } = sharkEl.getBoundingClientRect();
// 		const innerWidth = window.innerWidth;
// 		const innerHeight = window.innerHeight;
// 		const leftUnit = 80;
// 		const topUnit = 80;
// 		let nextX;
		
// 		if (keyCode === 38 || keyCode === 87) { // up arrow / w
// 			if (top < 10) return;
// 			baseSharkEl.style.transform = `translate(${left}px, ${top - topUnit}px)`;
// 			return;
// 		}
		
// 		if (keyCode === 40 || keyCode === 83) { // down arrow / s
// 			if (top + sharkEl.offsetHeight >= innerHeight) return;
// 			baseSharkEl.style.transform = `translate(${left}px, ${top + topUnit}px)`;
// 			return;
// 		}
		
// 		if (keyCode === 37 || keyCode === 65) { // left arrow / a
// 			if (left < 10) return;
// 			nextX = left - leftUnit;
// 			baseSharkEl.style.transform = `translate(${nextX}px, ${top}px)`;
// 		}
		
// 		if (keyCode === 39 || keyCode === 68) { // right arrow / d
// 			if (left + sharkEl.offsetWidth >= innerWidth) return;
// 			nextX = left + leftUnit;
// 			baseSharkEl.style.transform = `translate(${nextX}px, ${top}px)`;
// 		}
		
// 		if (keyCode === 80) {
// 			Object.values(preyTypeBonuses).forEach(b => preyTypes.push(b));
// 			maxPreyCount += 26;
// 		}
	
// 		// Reverse shark direction
// 		if (nextX > lastX) htmlEl.classList.add('reverse-shark');
// 		else htmlEl.classList.remove('reverse-shark');
// 		lastX = nextX;
// 	});
// });

// document.addEventListener('mousemove', ({ clientX, clientY }) => {
// 	if (sharkRafTimeout) window.cancelAnimationFrame(sharkRafTimeout);
// 	sharkRafTimeout = window.requestAnimationFrame(() => {
// 		const halfSharkSize = document.documentElement.clientHeight / 100 * 6;
		
// 		// Move shark to mouse
// 		baseSharkEl.style.transform = `translate(${clientX - halfSharkSize}px, ${clientY - halfSharkSize}px)`;

// 		// Reverse shark direction
// 		if (Math.abs(lastX - clientX) < 30) return;
// 		if (clientX > lastX) htmlEl.classList.add('reverse-shark');
// 		else htmlEl.classList.remove('reverse-shark');
// 		lastX = clientX;
// 	});
// });

// setInterval(() => {
// 	if (preyRafTimeout) window.cancelAnimationFrame(preyRafTimeout);
// 	preyRafTimeout = window.requestAnimationFrame(() => {
// 		const preyEls = Array.from(document.querySelectorAll('.prey'));
// 		const sharkEl = document.querySelector('.shark');
// 		garbageCount = preyEls.length;

// 		preyEls.forEach(preyEl => {
// 			// If shark in range, eat
// 			if (elementsIntersect(preyEl, sharkEl)) {
// 				removePrey(preyEl, true);
// 				return;
// 			}

// 			// If outside screen, remove
// 			const pos = parseFloat(preyEl.dataset.left);
// 			if (pos > 105 || pos < -5) {
// 				removePrey(preyEl);
// 				return;
// 			}

// 			// Otherwise, take step
// 			const speed = parseFloat(preyEl.dataset.speed);
// 			if (preyEl.classList.contains('rightward')) preyEl.dataset.left = pos + speed;
// 			if (preyEl.classList.contains('leftward')) preyEl.dataset.left = pos - speed;
// 		});

// 		if (garbageCount < maxPreyCount) {
// 			const newPrey = document.createElement('div');
// 			const direction = Math.random() < 0.5 ? 'leftward' : 'rightward';
// 			const { icon, topRange, speedRange, specialType = '' } = randomItem(preyTypes);
// 			const finalIcon = Array.isArray(icon) ? randomItem(icon) : icon;
// 			newPrey.classList.add('prey', direction);
// 			newPrey.setAttribute('special', specialType)
// 			newPrey.dataset.top = randomNumber(...topRange);
// 			newPrey.dataset.speed = randomNumber(...speedRange);
// 			newPrey.dataset.left = direction === 'leftward' ? 105 : -5;
// 			newPrey.appendChild(document.createElement('div'));
// 			newPrey.firstChild.textContent = finalIcon;
// 			document.body.appendChild(newPrey);
// 			garbageCount = garbageCount + 1;
// 		}
// 	});
// }, 225);
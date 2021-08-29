const chomp = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/436243/aud_chomp.mp3`;
const htmlEl = document.getElementsByTagName('html')[0];
let lastX = 0;
let preyIcons = ['fish.png', 'food.png'];

const maxPray = 4;

const maxGarbage = 16;

const initialState = {
  health: 3,
  score: 0,
}

let timeSinceLastSpawn = 0;

let state = initialState;

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const onMouseMove = (e) => {
  const shark = document.getElementById('shark');
  shark.style.left = e.pageX + 'px';
  shark.style.top = e.pageY + 'px';

  // reversing direction
  if (Math.abs(lastX - e.clientX) < 30) return;
  if (e.clientX > lastX) shark.style.transform = "scaleX(-1)"
  else shark.style.transform = "scaleX(1)";
  lastX = e.clientX;
}

document.addEventListener('mousemove', onMouseMove);

const createPrey = (x, y) => {
  const newPrey = document.createElement("div");
  newPrey.setAttribute("id", "prey");
  newPrey.style.position = "absolute";
  newPrey.style.left = x + 'px';
  newPrey.style.top = y + 'px';
  newPrey.style.display = "flex";

  const preyImageName = preyIcons[randomNumber(0, preyIcons.length-1)];
  const preyImage = document.createElement("img");
  preyImage.src = `./assets/prey/${preyImageName}`;
  preyImage.height = 0.1 * preyImage.height;
  preyImage.width = 0.1 * preyImage.width;
  newPrey.append(preyImage);


  document.getElementById('body').appendChild(newPrey);
};

const elementsIntersect = (elA, elB) => {
  if(!elA || !elB) return false;
	const a = elA.getBoundingClientRect();
	const b = elB.getBoundingClientRect();
	return (
			(b.top >= a.top && b.top <= a.bottom) 
			|| (b.bottom >= a.top && b.bottom <= a.bottom)
		) 
		&& (
			(b.left >= a.left && b.left <= a.right) 
			|| (b.right >= a.left && b.right <= a.right)
		);
};

const updateScoreboard = () => {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerText = `Health: ${state.health} Score: ${state.score}`;
}

const removeGarbage = (garbageEl, eaten = false) => {
	garbageEl.remove();
	if (eaten) {
		new Audio(chomp).play();
		iterateScore();
	}
	if (garbageCount >= 0) garbageCount -= 1;
};

const main = () => {
		const garbageEls = Array.from(document.querySelectorAll('.garbage'));
		const sharkEl = document.getElementById('shark');
    const preyEl = document.getElementById("prey");
		// const garbageCount = garbageEls.length;

    if (elementsIntersect(preyEl, sharkEl)) {
      state.score++;
      updateScoreboard();
      preyEl.remove();
      return;
    }

    // if(garbageEls)

    for(let garbageEl of garbageEls) {
			// If shark in range, reduce shark health, remove garbage
			if(elementsIntersect(garbageEl, sharkEl)) {
        state.health--;
        updateScoreboard();
				removeGarbage(garbageEl, true);
				return;
			}

			// If outside screen, remove
			const pos = parseFloat(garbageEl.dataset.left);
			if(pos > 105 || pos < -5) {
				removeGarbage(garbageEl);
				return;
			}
			// Otherwise, take step
			// const speed = parseFloat(garbageEl.dataset.speed);
			// if (garbageEl.classList.contains('rightward')) garbageEl.dataset.left = pos + speed;
			// if (garbageEl.classList.contains('leftward')) garbageEl.dataset.left = pos - speed;
    }

      timeSinceLastSpawn++;

      if(timeSinceLastSpawn/4 >= 6) { // 6 seconds have passed
        timeSinceLastSpawn = 0;
        // despawn existing prey
        if(preyEl) preyEl.remove();
        // put in new one at random location
        createPrey(randomNumber(0, window.innerWidth), randomNumber(0, window.innerHeight));
      }

      // if(garbageCount < maxGarbageCount) {
      //   const newPrey = document.createElement('div');
      //   const direction = Math.random() < 0.5 ? 'leftward' : 'rightward';
      //   const { icon, topRange, speedRange, specialType = '' } = randomItem(preyTypes);
      //   const finalIcon = Array.isArray(icon) ? randomItem(icon) : icon;
      //   newPrey.classList.add('prey', direction);
      //   newPrey.setAttribute('special', specialType)
      //   newPrey.dataset.top = randomNumber(...topRange);
      //   newPrey.dataset.speed = randomNumber(...speedRange);
      //   newPrey.dataset.left = direction === 'leftward' ? 105 : -5;
      //   newPrey.appendChild(document.createElement('div'));
      //   newPrey.firstChild.textContent = finalIcon;
      //   document.body.appendChild(newPrey);
      //   garbageCount = garbageCount + 1;  
      // }


};

// initial spawn
createPrey(randomNumber(0, window.innerWidth), randomNumber(0, window.innerHeight));

setInterval(main, 250);
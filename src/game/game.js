const chomp = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/436243/aud_chomp.mp3`;
const preyIcons = ['fish.png', 'food.png'];
const garbageIcons = ['trashcan.png'];
const refreshRate = 62.5;
const maxGarbageCount = 5;
const initialState = {
  health: 3,
  score: 0,
}

// Can be in PLAYING, PAUSE, GAMEOVER, or START
let globalGameState = "PLAYING";

let sharkRafTimeout;
let garbageRafTimeout;
let lastX = 0;
let garbageCount = 0;
let timeSinceLastSpawn = 0;
let state = initialState;

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const onMouseMove = (e) => {
	if (sharkRafTimeout) window.cancelAnimationFrame(sharkRafTimeout);
  sharkRafTimeout = window.requestAnimationFrame(() => {
    const shark = document.getElementById('shark');
    shark.style.left = e.pageX + 'px';
    shark.style.top = e.pageY + 'px';
  
    // reversing direction
    if (Math.abs(lastX - e.clientX) < 30) return;
    if (e.clientX > lastX) shark.style.transform = "scaleX(-1)"
    else shark.style.transform = "scaleX(1)";
    lastX = e.clientX;  
  });
}

document.addEventListener('mousemove', onMouseMove);

const createPrey = (x, y) => {
  const newPrey = document.createElement("div");
  newPrey.setAttribute("id", "prey");
  newPrey.style.position = "absolute";
  newPrey.style.left = x + 'px';
  newPrey.style.top = y + 'px';

  const preyImageName = preyIcons[randomNumber(0, preyIcons.length-1)];
  const preyImage = document.createElement("img");
  preyImage.src = `./assets/prey/${preyImageName}`;
  preyImage.height = 0.1 * preyImage.height;
  preyImage.width = 0.1 * preyImage.width;
  newPrey.append(preyImage);


  document.body.appendChild(newPrey);
};

const createGarbage = () => {
  const newGarbage = document.createElement('div');
  const direction = Math.random() < 0.5 ? 'leftward' : 'rightward';
  // const { icon, topRange, speedRange, specialType = '' } = randomItem(preyTypes);
  const garbageImageName = garbageIcons[randomNumber(0, garbageIcons.length-1)];
  const garbageImage = document.createElement("img");
  garbageImage.src = `./assets/garbage/${garbageImageName}`;
  garbageImage.height = 0.1 * garbageImage.height;
  garbageImage.width = 0.1 * garbageImage.width;
  newGarbage.append(garbageImage);

  newGarbage.classList.add('garbage', direction);
  // newGarbage.setAttribute('special', 'rotate');
  newGarbage.style.top = randomNumber(0, window.innerHeight) + 'px';
  newGarbage.style.left = direction === 'leftward' ? window.innerWidth + 'px' : 0 + 'px';
  newGarbage.style.position = "absolute";
  newGarbage.dataset.speed = randomNumber(10, 20);
  newGarbage.height = garbageImage.height;
  newGarbage.width = garbageImage.width;
  newGarbage.appendChild(document.createElement('div'));
  document.body.appendChild(newGarbage);
}

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

const updateState = (updateScore) => {
  if(updateScore) state.score++;
  else state.health--;

  if(state.health === 0) globalGameState = "GAMEOVER";
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerText = `Health: ${state.health} Score: ${state.score}`;
}

const removeGarbage = (garbageEl, eaten = false) => {
	garbageEl.remove();
	if (eaten) {
		// new Audio(chomp).play();
	}
	if (garbageCount >= 0) garbageCount -= 1;
};

const main = () => {
  if(globalGameState === 'PLAYING') {
    if (garbageRafTimeout) window.cancelAnimationFrame(garbageRafTimeout);
    garbageRafTimeout = window.requestAnimationFrame(() => {
      const garbageEls = Array.from(document.querySelectorAll('.garbage'));
      const sharkEl = document.getElementById('shark');
      const preyEl = document.getElementById("prey");
      garbageCount = garbageEls.length;
  
      if (elementsIntersect(preyEl, sharkEl)) {
        updateState(true);
        // Kinda glitchy, only works some of the time
        // new Audio(chomp).play();
        preyEl.remove();
        return;
      }
  
      for(const garbageEl of garbageEls) {
        // If shark in range, reduce shark health, remove garbage
        if(elementsIntersect(garbageEl, sharkEl)) {
          updateState(false);
          removeGarbage(garbageEl, true);
          return;
        }
  
        // If outside screen, remove
        const pos = parseFloat(garbageEl.style.left);
        if(pos > window.innerWidth || pos < 0) {
          removeGarbage(garbageEl);
          return;
        }
        // Otherwise, take step
        const speed = parseFloat(garbageEl.dataset.speed);
        if (garbageEl.classList.contains('rightward')) garbageEl.style.left = (pos + speed) + 'px';
        if (garbageEl.classList.contains('leftward')) garbageEl.style.left = (pos - speed) + 'px';
      }
  
        timeSinceLastSpawn += refreshRate/1000;
  
        if(timeSinceLastSpawn >= 5) { // 5 seconds have passed
          timeSinceLastSpawn = 0;
          // despawn existing prey
          if(preyEl) preyEl.remove();
          // put in new one at random location
          createPrey(randomNumber(0, window.innerWidth), randomNumber(0, window.innerHeight));
        }
  
        if(garbageCount < maxGarbageCount) {
          createGarbage();
          garbageCount++;
        }
  
    });  
  }
};

// initial spawn
createPrey(randomNumber(0, window.innerWidth), randomNumber(0, window.innerHeight));

setInterval(main, refreshRate);
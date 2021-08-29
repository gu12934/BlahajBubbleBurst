const htmlEl = document.getElementsByTagName('html')[0];
let lastX = 0;
let preyIcons = []

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

  // reversing, doesn't work right now
  // if (Math.abs(lastX - e.pageX) < 30) return;
  // if (e.pageX > lastX) htmlEl.classList.add('reverse-shark');
  // else htmlEl.classList.remove('reverse-shark');
  // lastX = e.pageX;
}

document.addEventListener('mousemove', onMouseMove);

const createPrey = (x, y) => {
  // const preyImage = 

  const newPrey = document.createElement("div");
  newPrey.setAttribute("id", "prey");
  newPrey.style.position = "absolute";
  newPrey.style.left = x + 'px';
  newPrey.style.top = y + 'px';

  const bubble = document.createElement("img");
  bubble.src = "./assets/bubble.png";
  bubble.height = 0.1 * bubble.height;
  bubble.width = 0.1 * bubble.width;
  newPrey.appendChild(bubble);

  document.getElementById('body').appendChild(newPrey);
};

const elementsIntersect = (elA, elB) => {
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

const main = () => {
		// const garbageEls = Array.from(document.querySelectorAll('.garbage'));
		const sharkEl = document.querySelector('.shark');
		// const garbageCount = garbageEls.length;

		// garbageEls.forEach(garbageEl => {
		// 	// If shark in range, reduce shark health, remove garbage
		// 	if (elementsIntersect(garbageEl, sharkEl)) {
		// 		removeGarbage(garbageEl, true);
		// 		return;
		// 	}

		// 	// If outside screen, remove
		// 	const pos = parseFloat(garbageEl.dataset.left);
		// 	if (pos > 105 || pos < -5) {
		// 		removeGarbage(garbageEl);
		// 		return;
		// 	}
		// 	// Otherwise, take step
		// 	// const speed = parseFloat(garbageEl.dataset.speed);
		// 	// if (garbageEl.classList.contains('rightward')) garbageEl.dataset.left = pos + speed;
		// 	// if (garbageEl.classList.contains('leftward')) garbageEl.dataset.left = pos - speed;
		// });


      timeSinceLastSpawn++;

      if(timeSinceLastSpawn/4 >= 6) { // 6 seconds have passed
        timeSinceLastSpawn = 0;
        // despawn existing prey
        const prey = document.getElementById("prey");
        prey.remove();
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
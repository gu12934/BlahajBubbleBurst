const htmlEl = document.getElementsByTagName('html')[0];
let lastX = 0;

const onMouseMove = (e) => {
  const shark = document.getElementById('shark');
  shark.style.left = e.pageX + 'px';
  shark.style.top = e.pageY + 'px';

  if (Math.abs(lastX - e.pageX) < 30) return;
  if (e.pageX > lastX) htmlEl.classList.add('reverse-shark');
  else htmlEl.classList.remove('reverse-shark');
  lastX = e.pageX;
}

document.addEventListener('mousemove', onMouseMove);

const createEnemy = (x, y) => {

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

};

main();
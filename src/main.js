const onMouseMove = (e) => {
  const circle = document.getElementById('circle');
  circle.style.left = e.pageX + 'px';
  circle.style.top = e.pageY + 'px';
}
document.addEventListener('mousemove', onMouseMove);

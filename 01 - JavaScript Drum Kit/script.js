(function() {
const keys = document.querySelector('.keys');
function endTransition(e) {
  e.target.classList.remove('playing')
}

function playSound(e) {
  const target = e instanceof Node ? e.getAttribute('data-key') : '';
  const keyTarget = document.querySelector(`div[data-key="${e.keyCode || target}"]`);
  const audioTarget = document.querySelector(`audio[data-key="${e.keyCode || target}"]`);
  if(!audioTarget) return;

  keyTarget.classList.add('playing');
  audioTarget.currentTime = 0;
  audioTarget.play();
}

window.addEventListener('keydown', playSound)
keys.addEventListener('click', (event) => {
  playSound(event.target.closest('div'))
})

Array.from(keys.childNodes).filter(el => el.classList == 'key').forEach(el => {
  el.addEventListener('transitionend', endTransition)
});
})();

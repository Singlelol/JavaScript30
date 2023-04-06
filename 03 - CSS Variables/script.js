const inputs = document.querySelectorAll('.controls input');

function handleControl() {
  const suffix = this.dataset.sizing || '';
  let before = window.getComputedStyle(this, ':before');
  //before = this.value;
  console.log(before)
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('input', handleControl));
inputs.forEach(input => input.addEventListener('change', handleControl));
inputs.forEach(input => input.addEventListener('mousemove', handleControl));
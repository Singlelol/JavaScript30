(function() {
  const inputs = document.querySelectorAll('.controls input');
  const control = document.querySelector('.controls');
  
  const [usage, spacing, bluring, baseColor] = createElements(
    [['div', 'counter'],
    ['span', 'spacing'],
    ['span', 'blur'],
    ['span', 'base']]
    );
  
  addElements([usage, spacing, bluring, baseColor]);
  
  control.append(usage);
  
  function createElements(tags) {
    let nodes = [];
    for (let i = 0; i < tags.length; i++) {
      const el = document.createElement(tags[i][0]);
      el.classList.add(tags[i][1])
      nodes.push(el);
    }
    return nodes;
  }
  
  function addElements(elements) {
    const [parent, ...childrens] = elements;
    for (let i = 0; i < childrens.length; i++) {
      const textName = childrens[i].className;
      const value = document.getElementById(textName).value;
      childrens[i].textContent = value;
      parent.append(childrens[i])
    }
  } 
  
  function handleControl() {
    const suffix = this.dataset.sizing || '';
    const value = document.querySelector(`.${this.name}`);
    value.textContent = this.value;
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  }
  
  inputs.forEach(input => input.addEventListener('input', handleControl));
  inputs.forEach(input => input.addEventListener('change', handleControl));
  inputs.forEach(input => input.addEventListener('mousemove', handleControl));
})()
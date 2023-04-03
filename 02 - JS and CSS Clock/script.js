const [hour, minute, second, clock] = getSelector(['.hour-hand', '.min-hand', '.second-hand', '.clock']);

const [timer, timerHour, timerMinute, timerSecond] = createElements(['div', 'span', 'span', 'span']);
timer.classList.add('numberTimer')

addElements([timer, timerHour, timerMinute, timerSecond]);

clock.append(timer);

function createElements(tags) {
  let nodes = [];
  for (let i = 0; i < tags.length; i++) {
    const el = document.createElement(tags[i]);
    nodes.push(el);
  }
  return nodes;
}

function getSelector(tags) {
  let nodes = [];
  for (let i = 0; i < tags.length; i++) {
    const el = document.querySelector(tags[i]);
    nodes.push(el);
  }
  return nodes;
}

function addElements(elements) {
  const [parent, ...childrens] = elements;
  for (let i = 0; i < childrens.length; i++) {
    parent.append(childrens[i])
  }
} 


function setTime() {
  const date = new Date;
  let hourNow = date.getHours();
  const minuteNow = date.getMinutes();
  const secondNow = date.getSeconds();
  timerHour.textContent = hourNow < 10 ? `0${hourNow}` : hourNow;
  timerMinute.textContent = minuteNow < 10 ? `0${minuteNow}` : minuteNow;
  timerSecond.textContent = secondNow < 10 ? `0${secondNow}` : secondNow;

  hour.style.transform = `rotate(${(10 * hourNow) + (minuteNow/2) + 90}deg)`;
  minute.style.transform = `rotate(${(6 * minuteNow) + (secondNow/10) + 90}deg)`;
  second.style.transform = `rotate(${(6 * secondNow) + 90}deg)`;
};

setInterval(setTime, 1000);

setTime();
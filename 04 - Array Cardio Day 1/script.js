//Создаю основные константы для проекта

const app = document.querySelector('body');
const firsForm = document.createElement('form');
app.append(firsForm);

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = [
  'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
  'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
  'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
  'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
  'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
];

const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

//Функция создания инпутов (тип, ид, массив значений, ключ)

function createInput(type, id, arr, key) {
  const input = document.createElement("input");
  const sortArr = arr.sort((a, b) => a[key] - b[key]);
  input.type = type;
  input.name = id;
  input.id = id;
  input.min = sortArr[0][key];
  input.max = sortArr[arr.length - 1][key];
  input.value = id === "min" ? "1500" : "1600";
  if(!!!key) {
    input.removeAttribute('min');
    input.removeAttribute('max');
    input.value = arr.join(' ');
    input.size = input.value.length;
  }
  return input;
}

//Функция создания лейбел (текст, ид)

function createLabel(text, id) {
  const label = document.createElement("label");
  label.setAttribute('for', id);
  label.textContent = text;
  return label;
}

//Функция генерации первого блока: выводит список изобретатилей родившихся 
//между указанными годами или между 1500 и 1600 годами

function setFirstBlock() {
  const min = minYear.value || "1500";
  const max = maxYear.value || "1600";
  const ul = document.createElement('ul');
  ul.id = "firs_block";
  let sumYears = 0;
  const result = inventors
  .filter((el) => {
    if (el.year < max && el.year >= min) {
      return el;
    }
  })
  .map((el) => {
      const li = document.createElement('li');
      li.textContent = `${el.first} ${el.last} year ${el.year}`;
      sumYears += el.passed - el.year;
      return li;
  });
  const p = document.createElement('p');
  p.textContent = `These inventors lived ${sumYears} years together`
  ul.append(...result);
  ul.append(p);
  if(!document.getElementById("firs_block")) {
    firsForm.append(ul);
  } else {
    document.getElementById("firs_block").replaceWith(ul);
  }  
};

//Функция генерации последнего блока

function setLastBlock() {
  const value = document.getElementById("list").value;
  const obj = {};
  const ul = document.createElement('ul');
  ul.id = "last_block";
  const result = value
  .split(' ')
  .filter((el) => {
    obj[el] = (obj[el]||0) + 1;
    return obj[el] <= 1;
  })
  .map((el) => {
      const li = document.createElement('li');
      li.textContent = `${el} ${obj[el]}`;
      return li;
  });
  ul.append(...result);
  if(!document.getElementById("last_block")) {
    thirtForm.append(ul);
  } else {
    document.getElementById("last_block").replaceWith(ul);
  }  
};

//Выведение визуальное первого блока

firsForm.append(createLabel("Set minimal year", "min"));
firsForm.append(createInput("number", "min", inventors, "year"));
firsForm.append(createLabel("and max year", "max"));
firsForm.append(createInput("number", "max", inventors, "year"));

const minYear = document.getElementById("min");
const maxYear = document.getElementById("max");

minYear.oninput = setFirstBlock;
maxYear.oninput = setFirstBlock;

//Функция добавления второго блока: вывод всех изобретателей
//по годам рождения

function setSecontBlock(sort = false) {
  if(document.getElementById("lived")?.checked === true) {
    sort = true;
  }
  const table = document.createElement('table');
  table.id = "table";
  const thead = document.createElement('thead');
  thead.innerHTML = "<tr><th colspan='2'>The inventors first and last name</th></tr>";
  table.append(thead);
  const tbody = document.createElement('tbody');
  let result;
  if(sort !== true) {
    result = inventors
    .sort((a, b) => a.year - b.year)
    .map((el) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${el.first}</td><td>${el.last}</td>`;
      return tr;
    });
  } else {
    result = inventors
    .sort((a, b) => (a.passed - a.year) - (b.passed - b.year))
    .map((el) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${el.first}</td><td>${el.last}</td>`;
      return tr;
    });
  }
  table.append(...result);
  if(!document.getElementById("table")) {
    firsForm.after(table);
  } else {
    document.getElementById("table").replaceWith(table);
  };
};
setSecontBlock();

const secondForm = document.createElement('form');
app.append(secondForm);
secondForm.append(createLabel("Sort by lived years", "lived"));
secondForm.append(createInput("checkbox", "lived", inventors, "year"));
document.getElementById("lived").onclick = setSecontBlock;

//Функции созданиея третьего блока

const thirtBlock = document.createElement('p');
thirtBlock.textContent = people.sort().join(' | ');
secondForm.after(thirtBlock);

const thirtForm = document.createElement('form');
thirtForm.append(createLabel("Set list of words", "list"));
thirtForm.append(createInput("text", "list", data));
thirtBlock.after(thirtForm);
setLastBlock();
document.getElementById("list").oninput = setLastBlock;
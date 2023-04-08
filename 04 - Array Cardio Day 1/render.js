import { Elements } from "./function.js";

export const render = () => {
  class Tables extends Elements {
    createTables() {
      let nodes = [];
      for (let i = 0; i < this.tags.length; i++) {
        const el = document.createElement(this.tags[i]);
        nodes.push(el);
      }
      return nodes;
    }
  }

  const parentP = document.querySelector('body');
  const el = new Elements(['div', 'span', 'span', 'span']);

  const createEl = el.createElements();
  const nodeList = el.addElements(createEl);

  parentP.append(nodeList);

}
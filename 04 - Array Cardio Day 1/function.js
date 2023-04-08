export class Elements {
  constructor(tags) {
    this.tags = tags;
  }

  createElements() {
    let nodes = [];
    for (let i = 0; i < this.tags.length; i++) {
      const el = document.createElement(this.tags[i]);
      nodes.push(el);
    }
    return nodes;
  }

  getSelector() {
    let nodes = [];
    for (let i = 0; i < this.tags.length; i++) {
      const el = document.querySelector(this.tags[i]);
      nodes.push(el);
    }
    return nodes;
  }

  addElements(elements) {
    const [parent, ...childrens] = elements;
    for (let i = 0; i < childrens.length; i++) {
      parent.append(childrens[i])
    }
    return parent;
  }
}
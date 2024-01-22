import Engine from "./engine";

const svgNS = "http://www.w3.org/2000/svg";

class SVGEngine extends Engine {
  constructor() {
    super();
    this.canvas = document.createElementNS(svgNS, "svg");
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
    this.content.appendChild(this.canvas);
  }

  animate() {
    const rects = this.rects;
    for (let i = 0, iz = this.count.value; i < iz; i++) {
      const r = rects[i];
      r.x -= r.speed;
      r.el.style.transform = `translate(${r.x}px, ${r.y}px)`;
      if (r.x + r.size * 2 < 0) {
        r.x = this.width + r.size;
      }
    }
    this.meter.tick();

    this.request = requestAnimationFrame(() => this.animate());
  }

  render() {
    // clear the canvas
    this.canvas.replaceChildren();
    this.cancelAnimationFrame(this.request);

    // rectangle creation
    const rects = [];
    for (let i = 0; i < this.count.value; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const size = 10 + Math.random() * 40;
      const speed = 1 + Math.random();

      let rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("width", size + "px");
      rect.setAttribute("height", size + "px");
      rect.setAttribute("fill", "#fff");
      rect.setAttribute("stroke", "#000");
      rect.style.transform = `translate(${x}px, ${y}px)`;
      this.canvas.appendChild(rect);
      rects[i] = { x, y, size: size / 2, speed, el: rect };
    }
    this.rects = rects;

    this.request = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const engine = new SVGEngine();
  engine.render();
});

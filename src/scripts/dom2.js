import Engine from "./engine";

class DomEngine extends Engine {
  constructor() {
    super();
    this.canvas = document.createElement("div");
    this.canvas.className = "canvas";
    this.canvas.style.width = this.width;
    this.canvas.style.height = this.height;
    this.canvas.style.position = "relative";
    this.canvas.style.setProperty("--canvas-width", `${this.width}px`);
    this.content.appendChild(this.canvas);
  }

  animate() {
    // const rects = this.rects;
    // for (let i = 0, iz = this.count.value; i < iz; i++) {
    //   const r = rects[i];
    //   r.x -= r.speed;
    //   r.el.style.setProperty("--x", `${r.x}px`);
    //   if (r.x + r.size * 2 < 0) {
    //     r.x = this.width + r.size;
    //   }
    // }
    this.meter.tick();

    this.request = requestAnimationFrame(() => this.animate());
  }

  render() {
    // clear the canvas
    this.canvas.innerHTML = "";
    this.cancelAnimationFrame(this.request);

    const baseAnimSeconds = this.width / (60 / 1000);

    // rectangle creation
    const rects = [];
    for (let i = 0; i < this.count.value; i++) {
      const x = Math.random();
      const y = Math.random() * this.height;
      const size = 10 + Math.random() * 40;
      const speed = 1 + Math.random();
      const animationMS = baseAnimSeconds / speed;

      const rect = document.createElement("div");
      const rectStyle = rect.style;
      rect.className = "rectangle animated";
      rectStyle.animationDuration = `${animationMS.toFixed()}ms`;
      rectStyle.animationDelay = `-${(animationMS * x).toFixed()}ms`;
      rectStyle.setProperty("--rect-end", `-${size}px`);
      rectStyle.width = size + "px";
      rectStyle.height = size + "px";
      rectStyle.position = "absolute";
      rectStyle.top = `${y}px`;

      this.canvas.appendChild(rect);
      rects[i] = { x, y, size: size / 2, speed, el: rect };
    }
    this.rects = rects;

    this.request = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const engine = new DomEngine();
  engine.render();
});

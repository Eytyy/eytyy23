export default class FlowFieldEffect {
  #ctx;
  #width;
  #height;
  cellSize;
  gradient: CanvasGradient;
  radius;
  spirals;
  vr;
  length;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    radius: number,
    cellSize: number,
    spirals: number,
    length: number
  ) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.gradient = this.#createGradient();
    this.#ctx.strokeStyle = this.gradient;
    this.#ctx.lineWidth = 1;
    this.cellSize = cellSize;
    this.radius = radius;
    this.spirals = spirals;
    this.length = length;
    this.vr = 0.03;
  }

  #createGradient() {
    const gradient = this.#ctx.createLinearGradient(
      0,
      0,
      this.#width,
      0
    );
    gradient.addColorStop(0.1, '#554');
    gradient.addColorStop(0.5, '#554');
    gradient.addColorStop(0.5, '#665');
    return gradient;
  }

  #drawLine(angle: number, x: number, y: number) {
    let positionX = x;
    let positionY = y;

    // let dx = mousePos.x - positionX;
    let dx = positionX;
    // let dy = mousePos.y - positionY;
    let dy = positionY;
    // let d = Math.sqrt(dx * dx + dy * dy);
    // sqrt is heavy on performance, we will do without it
    // it will give the same result but much larger value
    let d = Math.sqrt(dx * dx + dy * dy);
    // if (d > 600000) {
    //   d = 600000;
    // } else if (d < 50000) {
    //   d = 50000;
    // }
    const length = d * this.length;

    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length
    );
    this.#ctx.stroke();
  }
  animate() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    this.radius += this.vr;
    if (this.radius > this.spirals || this.radius < -1 * this.spirals)
      this.vr *= -1;
    for (let y = 0; y < this.#height; y += this.cellSize) {
      for (let x = 0; x < this.#width; x += this.cellSize) {
        const angle =
          (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius;

        this.#drawLine(angle, x, y);
      }
    }
  }
}

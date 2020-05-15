class Snake {
  x = 0;
  y = 0;
  xDirection = 0;
  yDirection = 0;
  body: number[][] = [[0, 0]];

  constructor(
    private canvasWidth: number,
    private canvasHeight: number,
    private cellSize: number,
    private ctx: CanvasRenderingContext2D
  ) {}

  update() {
    const length = this.body.length - 1;

    for (let i = 0; i < length; i++) this.body[i] = this.body[i + 1];

    if (this.x >= this.canvasWidth) this.x = -5;
    else if (this.x < -5) this.x = this.canvasWidth;

    if (this.y >= this.canvasHeight) this.y = -5;
    else if (this.y < -5) this.y = canvasHeight;

    this.x += this.xDirection * 3;
    this.y += this.yDirection * 3;

    this.body[length] = [this.x, this.y];
  }

  draw() {
    const length = this.body.length - 1;

    for (let i = 0; i < length; i++) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(
        this.body[i][0],
        this.body[i][1],
        this.cellSize,
        this.cellSize
      );
    }
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(
      this.body[length][0],
      this.body[length][1],
      this.cellSize,
      this.cellSize
    );
  }

  turn(x: number, y: number) {
    if (
      (x === 1 && this.xDirection === -1) ||
      (x === -1 && this.xDirection === 1) ||
      (y === 1 && this.yDirection === -1) ||
      (y === -1 && this.yDirection === 1)
    )
      return;

    this.xDirection = x;
    this.yDirection = y;
  }

  eat() {
    this.body.push([this.x, this.y]);
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }
}

class Food {
  x = this.randomNumber(this.canvasWidth);
  y = this.randomNumber(this.canvasHeight);

  constructor(
    private canvasWidth: number,
    private canvasHeight: number,
    private cellSize: number,
    private ctx: CanvasRenderingContext2D
  ) {}

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.cellSize, this.cellSize);
  }

  update() {
    this.x = this.randomNumber(this.canvasWidth);
    this.y = this.randomNumber(this.canvasHeight);
  }

  randomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max - this.cellSize));
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const cellSize = 15;
const snake = new Snake(canvasWidth, canvasHeight, cellSize, ctx);
const food = new Food(canvasWidth, canvasHeight, cellSize, ctx);

window.onload = () => {
  requestAnimationFrame(moveSnake);
};

window.onkeydown = (e: KeyboardEvent) => {
  const key = e.keyCode;

  if (key === 38) return snake.turn(0, -1);
  else if (key === 39) return snake.turn(1, 0);
  else if (key === 40) return snake.turn(0, 1);
  else if (key === 37) return snake.turn(-1, 0);
};

function moveSnake() {
  clear();
  logic();
  snake.update();
  snake.draw();
  food.draw();
  requestAnimationFrame(moveSnake);
}

function logic() {
  if (distance() <= cellSize) {
    snake.eat();
    food.update();
  }
}

function distance() {
  return Math.sqrt((snake.X - food.X) ** 2 + (snake.Y - food.Y) ** 2);
}

function clear() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

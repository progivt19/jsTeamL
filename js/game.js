const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//фон
const ground = new Image();
ground.src = "img/ground.png";

//череп
const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;//размер ячейки
let gameover = ' ';
let score = 0;//счетчик

//отображает еду
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};


//отоброжает змейку
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;//переменная, показывающая направление

//управление змейкой
function direction(event) {
  if(event.keyCode == 37 && dir != "right")
    dir = "left";
  else if(event.keyCode == 38 && dir != "down")
    dir = "up";
  else if(event.keyCode == 39 && dir != "left")
    dir = "right";
  else if(event.keyCode == 40 && dir != "up")
    dir = "down";
}


//конец игры, когда змейка ударяется об свой хвост
function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y)
      clearInterval(game);
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);//рисует фон

  ctx.drawImage(foodImg, food.x, food.y);//рисует череп

//цикл для рисования змейки
  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "black" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  //текст сччетчика
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  //переменные, хранящие координаты первого элемента змейки
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //отоброжает новую еду
  if(snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }

  ctx.fillStyle = "white";
  ctx.font = "60px Arial";
  ctx.fillText(gameover, box * 4.5, box * 10.5);

  if(snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17)
   gameover = 'Game over!';
   ctx.fillText(gameover, box * 4.5, box * 10.5);

  //конец игры
  if(snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17)
    clearInterval(game);

  //передвижение ячеек
  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;

  //новая голова
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);//добавление новой головы в начало
}

let game = setInterval(drawGame, 200);






//

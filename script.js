const grid = new Array (40);
  for (var i = 0; i < 40; i++) {
    grid[i] = new Array (40);
    for (var j = 0; j < 40; j++) {
      grid[i][j] = " ";
    }
  }

const snake = {
  position: [20,20], //this adds the variable to the array not the damn numbers, so the array updates everytime the var is!
  direction:"s",
  snakeSize: [[20,20]],
};

function whichDirection() {
    $(document).keypress(function(event) {
      if (event.which === 119) {
        snake.direction = "w";
      } else if (event.which === 115) {
        snake.direction = "s";
      } else if (event.which === 97) {
        snake.direction = "a";
      } else if (event.which === 100) {
        snake.direction = "d";
      }
    });
}

var snakeFoodInt = food();
var snakeFoodID = snakeFoodInt.join('').toString();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function food() {
  var a = getRandomInt(0, 41);
  var b = getRandomInt(0, 41);
  return new Array (a, b);
}

function foodLogic() {
   if (snake.position.join('').toString() == snakeFoodID ) {
     snake.snakeSize.push(snakeFoodInt);
     snakeFoodInt = food();
     snakeFoodID = snakeFoodInt.join('').toString();
     $('#' + snakeFoodID +'').text('X');
     }
}

function move() {
    setTimeout(function () {
      snake.snakeSize.unshift(snake.position.map(x => x));

      if (snake.direction == "w") {
          snake.position[0] = snake.position[0]-1;
        } else if (snake.direction == "s") {
          snake.position[0] = snake.position[0]+1;
        } else if (snake.direction == "a") {
          snake.position[1] = snake.position[1]-1;
        } else if (snake.direction == "d") {
          snake.position[1] = snake.position[1]+1;
        }

      foodLogic();

      for (var i = 0; i < snake.snakeSize.length; i++) {
        $('#' + snake.snakeSize[i].join('').toString()+'').text('O');
        }
      var lastPosition = snake.snakeSize.length - 1;
      $('#' + snake.snakeSize[lastPosition].join('').toString()+'').text(' ');
      snake.snakeSize.pop();

      if (snake.position[0] === 40) {
          clearTimeout();
        } else if (snake.position[1] === 40) {
          clearTimeout();
        } else if (snake.position[0] === 0) {
          clearTimeout();
        } else if (snake.position[1] === 0) {
          clearTimeout();
        } else {
          move();
      }
    }, 500);
}

function render() {
  var size = Math.floor(960 / 40) - 2;
  for (var i=0; i < grid.length; i++) {
    for (var j=0; j < grid[i].length; j++) {
      $("#wrapper").append('<div class="square" id="' + i.toString() + j.toString() + '">' + grid[i][j] + '</div>');
    }
  }
	$('.square').height(size).width(size);
}

$(grid[snake.position[0]][snake.position[1]]).text('O');
$(document).ready(render());

$('#' + snakeFoodID +'').text('X');
whichDirection();
move();

const grid = new Array (40);
  for (var i = 0; i < 40; i++) {
    grid[i] = new Array (40);
    for (var j = 0; j < 40; j++) {
      grid[i][j] = " ";
    }
  }

const snake = {
  position: [20,20],
  direction:"s",
  snakeSize: [[19,20],[18,20],[17,20],[16,20],[15,20]],
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

function showSnake(obj) {
  for (var i in obj) {
    $('#' + obj[i].join('').toString()+'').text('O');
  }
}

function move() {
    setTimeout(function () {
        if (snake.direction == "w") {
          snake.position[0] = snake.position[0]-1;
        } else if (snake.direction == "s") {
          snake.position[0] = snake.position[0]+1;
        } else if (snake.direction == "a") {
          snake.position[1] = snake.position[1]-1;
        } else if (snake.direction == "d") {
          snake.position[1] = snake.position[1]+1;
        }
        snake.snakeSize.unshift(snake.position.map(x => x)); //If you add the variable to the array directly the whole array will update everytime the snake.position is!

        for (var i = 0; i < snake.snakeSize.length; i++) {
          $('#' + snake.snakeSize[i].join('').toString()+'').text('O');

        }
        var lastPosition = snake.snakeSize.length - 1;
        console.log("lastPosition " + snake.snakeSize[lastPosition]);
        $('#' + snake.snakeSize[lastPosition].join('').toString()+'').text(' ');
        snake.snakeSize.pop();

        if (40 == snake.position[0]) {
          clearTimeout();
        } else if (40 == snake.position[1]) {
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

$(document).ready(render());
whichDirection();
move();

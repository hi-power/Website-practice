var gameBoard = document.getElementById('game-board');
var snake = [{x: 0, y: 0}];
var food = {x: 0, y: 0};
var direction = 'right';
var start=0;

while(start){
    function createSnake() {
        for (var i = 0; i < snake.length; i++) {
            var snakeElement = document.createElement('div');
            snakeElement.className = 'snake';
            snakeElement.style.top = snake[i].y * 10 + 'px';
            snakeElement.style.left = snake[i].x * 10 + 'px';
            gameBoard.appendChild(snakeElement);
        }
    }
    
    function createFood() {
        food.x = Math.floor(Math.random() * 50);
        food.y = Math.floor(Math.random() * 50);
    
        var foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.top = food.y * 10 + 'px';
        foodElement.style.left = food.x * 10 + 'px';
        gameBoard.appendChild(foodElement);
    }
    
    function updateSnake() {
        var head = {x: snake[0].x, y: snake[0].y};
    
        if (direction === 'right') {
            head.x++;
        } else if (direction === 'left') {
            head.x--;
        } else if (direction === 'up') {
            head.y--;
        } else if (direction === 'down') {
            head.y++;
        }
    
        if (head.x === food.x && head.y === food.y) {
            // 在蛇的頭部添加一個新方塊
            snake.unshift(head);
            // 創建一個新的食物
            createFood();
        } else {
            // 在蛇的頭部添加一個新方塊，刪除蛇的尾部
            snake.unshift(head);
            snake.pop();
        }
    
        for (var i = 0; i < snake.length; i++) {
            var snakeElement = document.getElementsByClassName('snake')[i];
            snakeElement.style.top = snake[i].y * 10 + 'px';
            snakeElement.style.left = snake[i].x * 10 + 'px';
        }
    }
    
    function checkCollision() {
        var head = snake[0];
    
        if (head.x < 0 || head.x >= 50 || head.y < 0 || head.y >= 50) {
            clearInterval(gameInterval);
            alert('Game Over');
        }
    
        for (var i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                clearInterval(gameInterval);
                alert('Game Over');
            }
        }
    
        if (head.x === food.x && head.y === food.y) {
            snake.push(snake[snake.length - 1]);
            gameBoard.removeChild(document.getElementsByClassName('food')[0]);
            createFood();
        }
    }
    
    function gameLoop() {
        updateSnake();
        checkCollision();
    }
    
    createSnake();
    createFood();
    
    var gameInterval = setInterval(gameLoop, 100);
    
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 37 && direction !== 'right') {
            direction = 'left';
        } else if (event.keyCode === 38 && direction !== 'down') {
            direction = 'up';
        } else if (event.keyCode === 39 && direction !== 'left') {
            direction = 'right';
        } else if (event.keyCode === 40 && direction !== 'up') {
            direction = 'down';
        }
    });
}
function startgame(){
    start=1
}

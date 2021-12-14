const snake = new Snake();

// ground 40 x 40
const ground = document.getElementById('ground');


ground.innerHTML = '';

for(let snakeDot of snake.snakeDots) {
    ground.appendChild(snakeDot.template);
}


setInterval(() => {
    snake.move()
}, 500)

document.addEventListener('keydown', (event) => {
    if(event.code === 'Space') {
        snake.move();
    }

    switch (event.code) {
        case "ArrowUp":
            snake.changeDirection("up");
            break;
        case "ArrowRight":
            snake.changeDirection("right");
            break;
        case "ArrowDown":
            snake.changeDirection("down");
            break;
        case "ArrowLeft":
            snake.changeDirection("left");
            break;
    }
})


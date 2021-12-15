const snake = new Snake();

const controls = {
    "ArrowUp": "up",
    "ArrowRight": "right",
    "ArrowDown": "down",
    "ArrowLeft": "left",
}



setInterval(() => {
    snake.move()
}, 100)

document.addEventListener('keydown', (event) => {
    if(event.code === 'Space') {
        snake.move();
    }

    snake.changeDirection(controls[event.code]);
})


const snake = new Snake();

// ground 40 x 40
const ground = document.getElementById('ground');




const render = () => {
    ground.innerHTML = '';

    snake.move();

    for(let snakeDot of snake.snakeDots) {
        ground.appendChild(snakeDot.template);
    }
}

render();
setInterval(render, 500)

document.addEventListener('keydown', (event) => {
    if(event.code === 'Space') {
        render();
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


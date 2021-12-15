
class Snake {
    constructor() {
        this.snakeDots = [];
        this.mouse = null;
        this._score = null;
        // ground 40 x 40
        this.ground = document.getElementById('ground');

        this.startNewGame();
    }

    startNewGame() {
        this.snakeDots = [
            this.getDot(20,20, 'right', true),
            this.getDot(19,20, 'right'),
            this.getDot(18,20, 'right'),
            this.getDot(17,20, 'right'),
            this.getDot(16,20, 'right'),
            this.getDot(15,20, 'right'),
            this.getDot(14,20, 'right'),
            this.getDot(13,20, 'right'),
        ];
        this.mouse = this.getMouse();
        this.score = 0;

        this.ground.innerHTML = "";
        this.ground.appendChild(this.mouse.template);
        for(let snakeDot of this.snakeDots) {
            this.ground.appendChild(snakeDot.template);
        }
    }

    get snakeHead() {
        return this.snakeDots[0];
    }

    set score(value) {
        this._score = value;
        document.getElementById('score').innerHTML = value;
    }

    get score() {
        return this._score;
    }


    changeMousePosition() {
        this.mouse.position = {...this.getMouseRandomPosition()};

        this.mouse.template.style.top = (this.mouse.position.y * 15) + 'px';
        this.mouse.template.style.left = (this.mouse.position.x * 15) + 'px';
    }


    getMouse() {
        const randomPosition = this.getMouseRandomPosition();

        const mouseTemplate = document.createElement('div');

        mouseTemplate.classList.add('dot');
        mouseTemplate.style.top = (randomPosition.y * 15) + 'px';
        mouseTemplate.style.left = (randomPosition.x * 15) + 'px';

        return {
            position: randomPosition,
            template: mouseTemplate
        }
    }

    getDot(x, y , direction, isHead = false) {
        return {
            position: {x: x, y: y},
            direction: direction,
            template: this.getDotTemplate(x, y),
            stack: [],
            isHead: isHead
        }
    }

    getDotTemplate(x, y) {
        const snakeDotTemplate = document.createElement('div');
        snakeDotTemplate.classList.add('dot');
        snakeDotTemplate.style.top = (y * 15) + 'px';
        snakeDotTemplate.style.left = (x * 15) + 'px';

        return snakeDotTemplate;
    }

    getMouseRandomPosition() {
        let exist = false;
        let randomPosition = null;

        do {
            randomPosition = this.randomPosition();

            exist = this.snakeDots.some((dot) => {
                return JSON.stringify(dot.position) === JSON.stringify(randomPosition);
            });

        } while(exist);

        return randomPosition;
    }

    move() {
        for(let dot of this.snakeDots) {
            if(this.shouldDotChangeDirection(dot)) {
                dot.direction = dot.stack[0].newDirection;
                dot.stack.shift();
            }

            this.changeDotPosition(dot);

            // check is game over if current dot is head
            if(dot.isHead && this.isGameOver()) {
                this.handleGameOver();
            }

            dot.template.style.top = dot.position.y * 15 + 'px';
            dot.template.style.left = dot.position.x * 15 + 'px';

            if(dot.isHead && this.isMouseEaten()) {
                this.changeMousePosition();
                this.sizeUpSnake();
                this.score += 1;
            }
        }
    }

    sizeUpSnake() {
        let latestDot = this.snakeDots[this.snakeDots.length - 1];

        let newDot = this.getDot(latestDot.position.x, latestDot.position.y, latestDot.direction);
        newDot.stack = [...latestDot.stack];

        switch (latestDot.direction) {
            case 'left':
                newDot.position.x += 1;
                break;
            case 'up':
                newDot.position.y +=1;
                break;
            case 'right':
                newDot.position.x -= 1;
                break;
            case 'down':
                newDot.position.y -= 1;
                break;
        }

        this.snakeDots.push(newDot);
        this.ground.appendChild(newDot.template);
    }

    changeDotPosition(dot) {
        switch (dot.direction) {
            case 'left':
                if(dot.position.x === 0) {
                    dot.position.x = 39;
                } else {
                    dot.position.x -= 1;
                }
                break;
            case 'up':
                if(dot.position.y === 0) {
                    dot.position.y = 39;
                } else {
                    dot.position.y -= 1;
                }
                break;
            case 'right':
                if(dot.position.x === 39) {
                    dot.position.x = 0;
                } else {
                    dot.position.x += 1;
                }
                break;
            case 'down':
                if(dot.position.y === 39) {
                    dot.position.y = 0;
                } else {
                    dot.position.y += 1;
                }
                break;
        }
    }

    shouldDotChangeDirection(dot) {
        if(dot.stack.length !== 0) {
            if(JSON.stringify(dot.stack[0].onPosition) === JSON.stringify(dot.position)) {
                return true;
            }
        }

        return false;
    }

    changeDirection(newDirection) {
        if(
            (['left', 'right'].includes(this.snakeHead.direction) && ['left', 'right'].includes(newDirection))
            || (['up', 'down'].includes(this.snakeHead.direction) && ['up', 'down'].includes(newDirection))
        ) {
            return;
        }

        for(let dot of this.snakeDots) {
            //check is duplicate
            const exists = dot.stack.find((item) => {
                return JSON.stringify(item.onPosition) === JSON.stringify(this.snakeHead.position);
            })

            if(exists) return;

            dot.stack.push({
                newDirection: newDirection,
                onPosition: {...this.snakeHead.position}
            })
        }
    }

    randomPosition() {
        return {
            x: Math.floor(Math.random() * 40),
            y: Math.floor(Math.random() * 40)
        }
    }

    isGameOver() {
        for(let i = 1; i < this.snakeDots.length; i++) {
            if(JSON.stringify(this.snakeHead.position) === JSON.stringify(this.snakeDots[i].position)) {
                return true;
            }
        }

        return false;
    }

    isMouseEaten() {
        return JSON.stringify(this.snakeHead.position) === JSON.stringify(this.mouse.position);
    }

    handleGameOver() {
        alert("Game over!\nClick ok and start new game.");

        this.startNewGame();
    }
}
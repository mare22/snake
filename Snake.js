
class Snake {
    constructor() {
        this.snakeDots = [
            this.getDot(20,20, 'right'),
            this.getDot(19,20, 'right'),
            this.getDot(18,20, 'right'),
        ];
    }

    // addDots(initX, initY, direction, length = 1) {
    //     this.snakeDots.push(this.getDot(initX, initY, direction))
    //
    //     for (let i = 1; i < length; i++) {
    //         switch (direction) {
    //             case 'left':
    //                 initX += 1;
    //                 break;
    //             case 'up':
    //                 initY +=1;
    //                 break;
    //             case 'right':
    //                 initX -= 1;
    //                 break;
    //             case 'down':
    //                 initY -= 1;
    //                 break;
    //         }
    //
    //         this.snakeDots.push(this.getDot(initX, initY, direction));
    //     }
    // }

    getDot(x, y , direction) {
        return {
            position: {x: x, y: y},
            direction: direction,
            template: this.getDotTemplate(x, y),
            stack: []
        }
    }

    getDotTemplate(x, y) {
        const snakeDotTemplate = document.createElement('div');
        snakeDotTemplate.classList.add('snake-dot');
        snakeDotTemplate.style.top = (y * 15) + 'px';
        snakeDotTemplate.style.left = (x * 15) + 'px';

        return snakeDotTemplate;
    }

    move() {
        for(let dot of this.snakeDots) {
            if(this.shouldDotChangeDirection(dot)) {
                dot.direction = dot.stack[0].newDirection;
                dot.stack.shift();
            }

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

            dot.template.style.top = dot.position.y * 15 + 'px';
            dot.template.style.left = dot.position.x * 15 + 'px';
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
        for(let dot of this.snakeDots) {
            dot.stack.push({
                newDirection: newDirection,
                onPosition: {...this.snakeDots[0].position}
            })
        }
    }

}
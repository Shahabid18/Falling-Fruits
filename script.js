const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
const scoreBoard = document.getElementById('scoreBoard');

let score = 0;
let missed = 0;
let basketPosition = 50; // Percentage of the screen width

document.addEventListener('keydown', moveBasket);

function moveBasket(event) {
    if (event.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 5;
    } else if (event.key === 'ArrowRight' && basketPosition < 90) {
        basketPosition += 5;
    }
    basket.style.left = basketPosition + '%';
}

function createFallingItem() {
    const item = document.createElement('div');
    item.classList.add('fallingItem');
    item.style.left = Math.random() * 100 + '%';
    gameArea.appendChild(item);
    
    let fallingInterval = setInterval(() => {
        let itemTop = item.offsetTop;
        item.style.top = itemTop + 5 + 'px';

        // Check if item has reached the bottom
        if (itemTop > window.innerHeight - 70) {
            if (isCaught(item)) {
                score++;
                scoreBoard.textContent = 'Score: ' + score;
                clearInterval(fallingInterval);
                gameArea.removeChild(item);
            } else {
                missed++;
                if (missed >= 3) {
                    alert('Game Over! Your score is: ' + score);
                    resetGame();
                }
                clearInterval(fallingInterval);
                gameArea.removeChild(item);
            }
        }
    }, 20);
}

function isCaught(item) {
    let itemRect = item.getBoundingClientRect();
    let basketRect = basket.getBoundingClientRect();

    return (
        itemRect.bottom >= basketRect.top &&
        itemRect.left >= basketRect.left &&
        itemRect.right <= basketRect.right
    );
}

function resetGame() {
    score = 0;
    missed = 0;
    scoreBoard.textContent = 'Score: ' + score;
}

setInterval(createFallingItem, 1000);

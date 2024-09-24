let colors = [];
let selectedBlocks = [];
let matchedPairs = 0;
let score = 0;
let timer;
let timeLeft = 60;

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    const difficulty = document.getElementById('difficulty').value;
    setColors(difficulty);
    createBlocks();
    startTimer();
    resetGame();
}

function setColors(difficulty) {
    const colorOptions = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan'];
    colors = [];
    
    let numColors;
    switch (difficulty) {
        case 'easy':
            numColors = 4;
            break;
        case 'medium':
            numColors = 6;
            break;
        case 'hard':
            numColors = 8;
            break;
    }

    for (let i = 0; i < numColors; i++) {
        colors.push(colorOptions[i], colorOptions[i]); // Add pairs
    }
    colors.sort(() => Math.random() - 0.5); // Shuffle
}

function createBlocks() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Clear previous blocks

    colors.forEach(color => {
        const block = document.createElement('div');
        block.className = 'block';
        block.setAttribute('data-color', color);
        block.addEventListener('click', revealColor);
        gameContainer.appendChild(block);
    });
}

function revealColor(event) {
    const block = event.target;
    const color = block.getAttribute('data-color');
    block.style.backgroundColor = color;
    block.innerHTML = '';

    selectedBlocks.push(block);

    if (selectedBlocks.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [first, second] = selectedBlocks;

    if (first.getAttribute('data-color') === second.getAttribute('data-color')) {
        matchedPairs++;
        score += 10;
        document.getElementById('result').textContent = '🎉 You found a match!';
        document.getElementById('score').textContent = `Score: ${score}`;

        if (matchedPairs === colors.length / 2) {
            clearInterval(timer);
            document.getElementById('result').textContent = '🎉 You won!';
        }
    } else {
        first.style.backgroundColor = '#ccc';
        second.style.backgroundColor = '#ccc';
        document.getElementById('result').textContent = '❌ Try Again!';
    }

    selectedBlocks = [];
}

function startTimer() {
    timeLeft = 60; // Reset timer
    document.getElementById('time').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('result').textContent = '⏰ Time\'s up! Game Over!';
        }
    }, 1000);
}

function resetGame() {
    matchedPairs = 0;
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('result').textContent = '';
}

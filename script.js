const colors = ['red', 'blue', 'green', 'yellow', 'red', 'blue', 'green', 'yellow'];
let selectedBlocks = [];
let matchedPairs = 0;
let gameContainer = document.getElementById('game-container');

// Shuffle colors
colors.sort(() => Math.random() - 0.5);

// Create blocks
colors.forEach(color => {
    const block = document.createElement('div');
    block.className = 'block';
    block.setAttribute('data-color', color);
    block.addEventListener('click', revealColor);
    gameContainer.appendChild(block);
});

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
        document.getElementById('result').textContent = '🎉 You found a match!';
    } else {
        first.style.backgroundColor = '#ccc';
        second.style.backgroundColor = '#ccc';
        document.getElementById('result').textContent = '❌ Try Again!';
    }

    selectedBlocks = [];
}

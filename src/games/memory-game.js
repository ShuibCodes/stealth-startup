import mickey from "../images/MickeyMouse.png";
import minnie from "../images/MinnieMouse.png";
import goofy from "../images/Duffy.png";
import donald from "../images/DonaldDuck.png";

const gameConfig = {
  // Initial HTML content
  getInitialHtml: () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Disney Memory Game</title>
</head>
<body>
    <div class="game-container">
        <div class="stars-container">
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
        </div>
        
        <h1>✨ Disney Memory Game ✨</h1>
        
        <div class="game-info">
            <span>Matches: 0</span>
            <span>Time: 0s</span>
        </div>
        
        <div class="game-board">
            <div class="card" data-card="mickey">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-icon">?</div>
                        <div class="castle-icon">🏰</div>
                    </div>
                    <div class="card-back">
                        <img src="${mickey}" alt="Mickey" class="character">
                        <div class="character-name">Mickey</div>
                    </div>
                </div>
            </div>
            <div class="card" data-card="minnie">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-icon">?</div>
                        <div class="castle-icon">🏰</div>
                    </div>
                    <div class="card-back">
                        <img src="${minnie}" alt="Minnie" class="character">
                        <div class="character-name">Minnie</div>
                    </div>
                </div>
            </div>
            <div class="card" data-card="donald">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-icon">?</div>
                        <div class="castle-icon">🏰</div>
                    </div>
                    <div class="card-back">
                        <img src="${donald}" alt="Donald" class="character">
                        <div class="character-name">Donald</div>
                    </div>
                </div>
            </div>
            <div class="card" data-card="goofy">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-icon">?</div>
                        <div class="castle-icon">🏰</div>
                    </div>
                    <div class="card-back">
                        <img src="${goofy}" alt="Duffy" class="character">
                        <div class="character-name">Duffy</div>
                    </div>
                </div>
            </div>
            <div class="card" data-card="mickey">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-icon">?</div>
                        <div class="castle-icon">🏰</div>
                    </div>
                    <div class="card-back">
                        <img src="${mickey}" alt="Mickey" class="character">
                        <div class="character-name">Mickey</div>
                    </div>
                </div>
            </div>
            <div class="card" data-card="minnie">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-icon">?</div>
                        <div class="castle-icon">🏰</div>
                    </div>
                    <div class="card-back">
                        <img src="${minnie}" alt="Minnie" class="character">
                        <div class="character-name">Minnie</div>
                    </div>
                </div>
            </div>
            <div class="card" data-card="donald">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-icon">?</div>
                        <div class="castle-icon">🏰</div>
                    </div>
                    <div class="card-back">
                        <img src="${donald}" alt="Donald" class="character">
                        <div class="character-name">Donald</div>
                    </div>
                </div>
            </div>
            <div class="card" data-card="goofy">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-icon">?</div>
                        <div class="castle-icon">🏰</div>
                    </div>
                    <div class="card-back">
                        <img src="${goofy}" alt="Duffy" class="character">
                        <div class="character-name">Duffy</div>
                    </div>
                </div>
            </div>
        </div>
        
        <button id="reset-button">
            <span class="button-text">Magic Reset</span>
            <span class="button-icon">✨</span>
        </button>
    </div>
</body>
</html>`,

  // Initial CSS content
  getInitialCss: () => `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Comic+Neue:wght@700&display=swap');

body {
    font-family: 'Comic Neue', 'Bubblegum Sans', cursive;
    background: linear-gradient(135deg, #7cbbf1, #b39ddb);
    background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="3" fill="rgba(255,255,255,0.4)"/><circle cx="60" cy="30" r="2" fill="rgba(255,255,255,0.4)"/><circle cx="35" cy="70" r="2.5" fill="rgba(255,255,255,0.4)"/><circle cx="80" cy="80" r="2" fill="rgba(255,255,255,0.4)"/><circle cx="80" cy="20" r="1.5" fill="rgba(255,255,255,0.4)"/><circle cx="15" cy="50" r="2" fill="rgba(255,255,255,0.4)"/></svg>');
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    overflow: hidden;
}

.game-container {
    background: #fff;
    border-radius: 20px;
    padding: 15px 20px;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
    max-width: 750px;
    width: 100%;
    border: 8px solid #f0f4ff;
    position: relative;
    background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 95vh;
}

.game-container::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: 28px;
    background: linear-gradient(45deg, #ff88a9, #f3c549, #77ddff, #6a99ff);
    z-index: -1;
    filter: blur(5px);
    opacity: 0.8;
    animation: borderGlow 5s linear infinite;
}

/* Stars animation */
.stars-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

.star {
    position: absolute;
    width: 10px;
    height: 10px;
    background: transparent;
    border-radius: 50%;
    opacity: 0;
    animation: twinkle 5s infinite;
}

.star::before {
    content: '⭐';
    position: absolute;
    font-size: 12px;
    color: gold;
}

.star:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
}

.star:nth-child(2) {
    top: 20%;
    right: 15%;
    animation-delay: 1s;
}

.star:nth-child(3) {
    bottom: 30%;
    left: 20%;
    animation-delay: 2s;
}

.star:nth-child(4) {
    bottom: 15%;
    right: 25%;
    animation-delay: 3s;
}

.star:nth-child(5) {
    top: 40%;
    right: 5%;
    animation-delay: 4s;
}

@keyframes twinkle {
    0%, 100% {
        opacity: 0;
        transform: translateY(0) scale(0.5);
    }
    50% {
        opacity: 1;
        transform: translateY(-20px) scale(1.2);
    }
}

@keyframes borderGlow {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

h1 {
    color: #ff6b91;
    font-size: 2rem;
    margin-bottom: 12px;
    text-shadow: 2px 2px 0 #ffe0ef, 4px 4px 0 rgba(0,0,0,0.1);
    letter-spacing: 1px;
    position: relative;
    display: inline-block;
}

h1::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 5%;
    width: 90%;
    height: 4px;
    background: linear-gradient(90deg, #ffde59, #ff914d);
    border-radius: 10px;
}

.game-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1.1rem;
    background: #f7f9ff;
    padding: 8px 20px;
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.game-info span {
    color: #5271c7;
    font-weight: bold;
    position: relative;
    padding: 0 12px;
}

.game-info span:first-child::after {
    content: '🏆';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.9rem;
}

.game-info span:last-child::after {
    content: '⏱️';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.9rem;
}

.game-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 0 auto 10px;
    max-width: 650px;
    perspective: 1000px;
}

.card {
    aspect-ratio: 3/4;
    perspective: 1000px;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.2s;
    height: 145px;
}

.card:hover {
    transform: translateY(-3px) scale(1.03);
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

.card.flipped .card-inner {
    transform: rotateY(180deg);
}

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.card-front {
    background: linear-gradient(135deg, #90cdf4, #7373db);
    color: white;
    border: 4px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
}

.card-icon {
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}

.castle-icon {
    font-size: 1rem;
    margin-bottom: 5px;
    opacity: 0.7;
}

.card-front::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
    opacity: 0.2;
    animation: patternMove 30s linear infinite;
}

@keyframes patternMove {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.card-back {
    background: linear-gradient(to bottom right, #ffe0b2, #ffcc80);
    transform: rotateY(180deg);
    border: 4px solid white;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4px;
}

.character {
    width: 85%;
    height: 70%;
    object-fit: contain;
    animation: bounce 1s ease-in-out infinite alternate;
    margin-bottom: 3px;
}

.character-name {
    font-size: 0.8rem;
    font-weight: bold;
    color: #1e3c72;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 3px 8px;
    border-radius: 8px;
}

@keyframes bounce {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-3px);
    }
}

.card.matched .card-inner {
    animation: matched 0.5s ease-in-out both;
    box-shadow: 0 0 15px rgba(253, 216, 53, 0.7), 0 0 30px rgba(253, 216, 53, 0.4);
    border: 4px solid rgba(253, 216, 53, 0.7);
}

@keyframes matched {
    0%, 100% {
        transform: rotateY(180deg) scale(1);
    }
    50% {
        transform: rotateY(180deg) scale(1.05);
    }
}

#reset-button {
    background: linear-gradient(to right, #ff758c, #ff7eb3);
    color: white;
    border: none;
    padding: 8px 25px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 6px 12px rgba(255, 117, 140, 0.3);
    font-family: 'Comic Neue', cursive;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 0 auto;
}

.button-text {
    letter-spacing: 1px;
    text-transform: uppercase;
}

.button-icon {
    font-size: 1.1rem;
    animation: spin 4s linear infinite;
    display: inline-block;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

#reset-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(255, 117, 140, 0.4);
    background: linear-gradient(to right, #ff5c85, #ff6ea7);
}

#reset-button:active {
    transform: translateY(1px);
    box-shadow: 0 4px 8px rgba(255, 117, 140, 0.4);
}

#reset-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
}

#reset-button:hover::before {
    transform: translateX(100%);
}

.game-footer {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.8rem;
    color: #7c83b5;
    opacity: 0.8;
}

.magic-wand {
    font-size: 1rem;
    animation: magicWand 2s ease-in-out infinite alternate;
}

@keyframes magicWand {
    0% {
        transform: rotate(-10deg) translateY(0);
    }
    100% {
        transform: rotate(10deg) translateY(-3px);
    }
}

.footer-text {
    font-weight: bold;
}

@media (max-width: 600px) {
    .game-board {
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
    }
    
    h1 {
        font-size: 1.6rem;
        margin-bottom: 8px;
    }
    
    .game-info {
        padding: 6px 12px;
        margin-bottom: 8px;
    }
    
    .card {
        height: 115px;
    }
    
    #reset-button {
        padding: 6px 15px;
        font-size: 0.9rem;
    }
    
    .character-name {
        font-size: 0.6rem;
    }
    
    .game-container {
        padding: 10px 15px;
    }
}`,

  // Initial JS content
  getInitialJs: () => "",

  // Handle code selection
  handleCodeSelect: (option, prevJs) => {
    // Special case for resets
    if (option === "RESET_CODE_TO_INITIAL") {
      return "";
    }
    
    if (!option) return prevJs;

    // Step 1: Initialize game variables
    if (option.includes('// Step 1: Initialize game variables')) {
      return `// Step 1: Initialize game variables
const characters = [
    { name: 'mickey', emoji: '🐭' },
    { name: 'minnie', emoji: '🎀' },
    { name: 'donald', emoji: '🦆' },
    { name: 'goofy', emoji: '🧸' }
];

let flippedCards = [];
let matchedPairs = 0;
let isProcessing = false;
let gameTimer = null;
let gameTime = 0;

// Get DOM elements
const gameBoard = document.querySelector('.game-board');
const cards = document.querySelectorAll('.card');
const matchesDisplay = document.querySelector('.game-info span:first-child');
const timeDisplay = document.querySelector('.game-info span:last-child');
const resetButton = document.getElementById('reset-button');

// Shuffle function to randomize card order
function shuffleCards() {
    const cardArray = Array.from(cards);
    cardArray.forEach(card => {
        // Remove from DOM temporarily
        gameBoard.removeChild(card);
    });
    
    // Shuffle array
    for (let i = cardArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }
    
    // Re-append in new order
    cardArray.forEach(card => {
        gameBoard.appendChild(card);
    });
}`;
    }

    // Step 2: Add card click handler
    if (option.includes('// Step 2: Handle card clicks')) {
      return `${prevJs}

// Step 2: Handle card clicks
function handleCardClick(card) {
    if (
        isProcessing || 
        flippedCards.length >= 2 || 
        card.classList.contains('flipped') ||
        card.classList.contains('matched')
    ) {
        return;
    }

    // Start timer on first card click
    if (!gameTimer) {
        startTimer();
    }

    // Flip the card
    card.classList.add('flipped');
    flippedCards.push(card);

    // Check for match if two cards are flipped
    if (flippedCards.length === 2) {
        isProcessing = true;
        checkForMatch();
    }
}

// Add click listeners to all cards
cards.forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
});`;
    }

    // Step 3: Add timer functionality
    if (option.includes('// Step 3: Timer functionality')) {
      return `${prevJs}

// Step 3: Timer functionality
function startTimer() {
    gameTimer = setInterval(() => {
        gameTime++;
        timeDisplay.textContent = \`Time: \${gameTime}s\`;
    }, 1000);
}

function stopTimer() {
    clearInterval(gameTimer);
    gameTimer = null;
}`;
    }

    // Step 4: Add match checking logic
    if (option.includes('// Step 4: Check for matches')) {
      return `${prevJs}

// Step 4: Check for matches
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.card === card2.dataset.card;

    setTimeout(() => {
        if (match) {
            // Handle match
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            matchesDisplay.textContent = \`Matches: \${matchedPairs}\`;

            // Check for game completion
            if (matchedPairs === characters.length) {
                stopTimer();
                setTimeout(() => {
                    alert(\`Congratulations! You completed the game in \${gameTime} seconds!\`);
                }, 500);
            }
        } else {
            // Handle no match
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        // Reset for next turn
        flippedCards = [];
        isProcessing = false;
    }, 1000);
}`;
    }

    // Step 5: Add reset functionality
    if (option.includes('// Step 5: Reset game functionality')) {
      return `${prevJs}

// Step 5: Reset game functionality
function resetGame() {
    // Reset all cards
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    // Randomize card positions
    shuffleCards();

    // Reset game state
    flippedCards = [];
    matchedPairs = 0;
    isProcessing = false;
    gameTime = 0;

    // Reset displays
    matchesDisplay.textContent = 'Matches: 0';
    timeDisplay.textContent = 'Time: 0s';

    // Reset timer
    stopTimer();
    gameTimer = null;
}

// Add reset button listener
resetButton.addEventListener('click', resetGame);

// Initialize the game
shuffleCards();
resetGame();`;
    }

    return prevJs;
  }
};

export default gameConfig; 
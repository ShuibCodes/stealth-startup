// Configuration for the Pokemon Battle game

const gameConfig = {
  // Initial HTML content
  getInitialHtml: () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon Battle</title>
</head>
<body>
    <div class="game">
        <h1 class="title">Pokemon Battle</h1>
        <div class="battle-area">
            <div class="pokemon player-pokemon">
                <div class="pokemon-info">
                    <h2 id="player-name">Pikachu</h2>
                    <div class="hp-bar">
                        <div id="player-hp-bar" class="hp-fill" style="width: 100%;"></div>
                    </div>
                    <div id="player-hp">HP: 100/100</div>
                </div>
                <img id="player-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu">
            </div>
            
            <div class="battle-message" id="battle-message">Choose your attack!</div>
            
            <div class="pokemon opponent-pokemon">
                <img id="opponent-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander">
                <div class="pokemon-info">
                    <h2 id="opponent-name">Charmander</h2>
                    <div class="hp-bar">
                        <div id="opponent-hp-bar" class="hp-fill" style="width: 100%;"></div>
                    </div>
                    <div id="opponent-hp">HP: 120/120</div>
                </div>
            </div>
        </div>
        
        <div class="attack-menu">
            <button class="attack-btn" id="attack-1">Thunder Shock</button>
            <button class="attack-btn" id="attack-2">Quick Attack</button>
            <button class="attack-btn" id="attack-3">Thunderbolt</button>
        </div>
        
        <div class="python-code">
            <h3>Python Code:</h3>
            <pre id="python-code">
# Pokemon Battle Game in Python
import random

# Step 1: Create Pokemon Objects
# Fill in the code for creating pokemon objects

# Step 2: Display Pokemon Stats
# Fill in the code for displaying pokemon stats

# Step 3: Player Turn
# Fill in the code for player's turn

# Step 4: Calculate Damage
# Fill in the code for calculating damage

# Step 5: Check for Winner
# Fill in the code for checking the winner
            </pre>
        </div>
        
        <button id="reset">Reset Game</button>
    </div>
    
    <div id="code-input-modal" class="modal">
        <div class="modal-content">
            <h2>Enter Your Code</h2>
            <textarea id="code-input" rows="6" placeholder="Enter your Python code here..."></textarea>
            <div class="button-group">
                <button id="submit-code">Submit</button>
                <button id="cancel-code">Cancel</button>
            </div>
        </div>
    </div>
</body>
</html>`,

  // Initial CSS content
  getInitialCss: () => `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #4eadea, #34e89e);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #333;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-10px);
  transition: transform 0.3s ease;
  max-width: 800px;
  width: 100%;
}

.title {
  color: #e63946;
  font-size: 2rem;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.battle-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.pokemon {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
}

.player-pokemon {
  flex-direction: row;
  justify-content: flex-start;
}

.opponent-pokemon {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  margin: 0 15px;
}

.hp-bar {
  width: 150px;
  height: 10px;
  background-color: #e5e5e5;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px 0;
}

.hp-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.5s ease;
}

.pokemon img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.battle-message {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding: 10px 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  width: 80%;
  min-height: 50px;
}

.attack-menu {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  margin: 15px 0;
}

.attack-btn {
  padding: 10px 15px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.attack-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.attack-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.python-code {
  width: 100%;
  background-color: #272822;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 10px;
  margin: 15px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.python-code h3 {
  margin-bottom: 10px;
  color: #a6e22e;
}

.python-code pre {
  white-space: pre-wrap;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.4;
}

#reset {
  padding: 10px 25px;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  margin-top: 15px;
}

#reset:hover {
  background: linear-gradient(135deg, #f5371c, #f53f2a);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

#reset:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  padding: 25px;
  border-radius: 15px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
}

.modal h2 {
  margin-bottom: 15px;
  color: #333;
}

#code-input {
  width: 100%;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.button-group button {
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

#submit-code {
  background-color: #4caf50;
  color: white;
}

#submit-code:hover {
  background-color: #45a049;
}

#cancel-code {
  background-color: #f44336;
  color: white;
}

#cancel-code:hover {
  background-color: #d32f2f;
}

/* Animation for attacks */
@keyframes attack {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(20px);
  }
  50% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}

.attack-animation {
  animation: attack 0.5s ease;
}

/* Damage animation */
@keyframes damage {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.damage-animation {
  animation: damage 0.5s ease;
}`,

  // Initial JS content
  getInitialJs: () => `// Pokemon Battle Game

// Pokemon objects
const pikachu = {
  name: "Pikachu",
  hp: 100,
  maxHp: 100,
  attacks: [
    { name: "Thunder Shock", damage: 20 },
    { name: "Quick Attack", damage: 10 },
    { name: "Thunderbolt", damage: 30 }
  ],
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
};

const charmander = {
  name: "Charmander",
  hp: 120,
  maxHp: 120,
  attacks: [
    { name: "Ember", damage: 15 },
    { name: "Scratch", damage: 10 },
    { name: "Flamethrower", damage: 25 }
  ],
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
};

// DOM elements
const playerNameEl = document.getElementById('player-name');
const playerHpEl = document.getElementById('player-hp');
const playerHpBarEl = document.getElementById('player-hp-bar');
const playerImgEl = document.getElementById('player-img');

const opponentNameEl = document.getElementById('opponent-name');
const opponentHpEl = document.getElementById('opponent-hp');
const opponentHpBarEl = document.getElementById('opponent-hp-bar');
const opponentImgEl = document.getElementById('opponent-img');

const battleMessageEl = document.getElementById('battle-message');
const attackButtons = document.querySelectorAll('.attack-btn');
const resetButton = document.getElementById('reset');
const pythonCodeEl = document.getElementById('python-code');

// Initialize the game
function initGame() {
  // Set player and opponent info
  playerNameEl.textContent = pikachu.name;
  playerHpEl.textContent = \`HP: \${pikachu.hp}/\${pikachu.maxHp}\`;
  playerHpBarEl.style.width = '100%';
  playerImgEl.src = pikachu.image;
  
  opponentNameEl.textContent = charmander.name;
  opponentHpEl.textContent = \`HP: \${charmander.hp}/\${charmander.maxHp}\`;
  opponentHpBarEl.style.width = '100%';
  opponentImgEl.src = charmander.image;
  
  // Set attack button labels
  attackButtons[0].textContent = pikachu.attacks[0].name;
  attackButtons[1].textContent = pikachu.attacks[1].name;
  attackButtons[2].textContent = pikachu.attacks[2].name;
  
  battleMessageEl.textContent = "Choose your attack!";
  
  // Reset Python code display
  updatePythonCode();
}

// Update Python code display based on current state
function updatePythonCode() {
  const pythonCode = \`# Pokemon Battle Game in Python
import random

# Step 1: Create Pokemon Objects
pikachu = { "name": "Pikachu", "hp": 100, "attacks": [
    { "name": "Thunder Shock", "damage": 20 },
    { "name": "Quick Attack", "damage": 10 },
    { "name": "Thunderbolt", "damage": 30 }
]}

charmander = { "name": "Charmander", "hp": 120, "attacks": [
    { "name": "Ember", "damage": 15 },
    { "name": "Scratch", "damage": 10 },
    { "name": "Flamethrower", "damage": 25 }
]}

# Step 2: Display Pokemon Stats
print(f"{pikachu['name']} HP: {pikachu['hp']}")
print(f"{charmander['name']} HP: {charmander['hp']}")

# Step 3: Player Turn
choice = int(input("Enter attack number (1-3): ")) - 1
attack = pikachu["attacks"][choice]
print(f"{pikachu['name']} used {attack['name']}!")

# Step 4: Calculate Damage
charmander["hp"] -= attack["damage"]
print(f"{charmander['name']} took {attack['damage']} damage!")
print(f"{charmander['name']} HP: {charmander['hp']}")

# Step 5: Check for Winner
if charmander["hp"] <= 0:
    print(f"{pikachu['name']} wins!")
else:
    # Opponent's turn
    opponent_attack = random.choice(charmander["attacks"])
    print(f"{charmander['name']} used {opponent_attack['name']}!")
    pikachu["hp"] -= opponent_attack["damage"]
    print(f"{pikachu['name']} took {opponent_attack['damage']} damage!")
    print(f"{pikachu['name']} HP: {pikachu['hp']}")
    
    if pikachu["hp"] <= 0:
        print(f"{charmander['name']} wins!")
\`;

  pythonCodeEl.textContent = pythonCode;
}

// Attack functionality
function playerAttack(attackIndex) {
  const attack = pikachu.attacks[attackIndex];
  
  // Display attack message
  battleMessageEl.textContent = \`\${pikachu.name} used \${attack.name}!\`;
  
  // Animation
  playerImgEl.classList.add('attack-animation');
  setTimeout(() => {
    playerImgEl.classList.remove('attack-animation');
    
    // Calculate damage
    charmander.hp -= attack.damage;
    if (charmander.hp < 0) charmander.hp = 0;
    
    // Update HP display
    const hpPercentage = (charmander.hp / charmander.maxHp) * 100;
    opponentHpBarEl.style.width = \`\${hpPercentage}%\`;
    opponentHpEl.textContent = \`HP: \${charmander.hp}/\${charmander.maxHp}\`;
    
    // Animation for taking damage
    opponentImgEl.classList.add('damage-animation');
    setTimeout(() => {
      opponentImgEl.classList.remove('damage-animation');
      
      // Check for winner
      if (charmander.hp <= 0) {
        battleMessageEl.textContent = \`\${pikachu.name} wins!\`;
        disableAttacks();
      } else {
        // Opponent's turn
        setTimeout(opponentAttack, 1000);
      }
    }, 500);
  }, 500);
}

// Opponent attack
function opponentAttack() {
  // Randomly select an attack
  const attackIndex = Math.floor(Math.random() * charmander.attacks.length);
  const attack = charmander.attacks[attackIndex];
  
  // Display attack message
  battleMessageEl.textContent = \`\${charmander.name} used \${attack.name}!\`;
  
  // Animation
  opponentImgEl.classList.add('attack-animation');
  setTimeout(() => {
    opponentImgEl.classList.remove('attack-animation');
    
    // Calculate damage
    pikachu.hp -= attack.damage;
    if (pikachu.hp < 0) pikachu.hp = 0;
    
    // Update HP display
    const hpPercentage = (pikachu.hp / pikachu.maxHp) * 100;
    playerHpBarEl.style.width = \`\${hpPercentage}%\`;
    playerHpEl.textContent = \`HP: \${pikachu.hp}/\${pikachu.maxHp}\`;
    
    // Animation for taking damage
    playerImgEl.classList.add('damage-animation');
    setTimeout(() => {
      playerImgEl.classList.remove('damage-animation');
      
      // Check for winner
      if (pikachu.hp <= 0) {
        battleMessageEl.textContent = \`\${charmander.name} wins!\`;
        disableAttacks();
      } else {
        battleMessageEl.textContent = "Choose your attack!";
      }
    }, 500);
  }, 500);
}

// Disable attack buttons
function disableAttacks() {
  attackButtons.forEach(button => {
    button.disabled = true;
    button.style.opacity = 0.5;
  });
}

// Enable attack buttons
function enableAttacks() {
  attackButtons.forEach(button => {
    button.disabled = false;
    button.style.opacity = 1;
  });
}

// Event listeners
attackButtons.forEach((button, index) => {
  button.addEventListener('click', () => playerAttack(index));
});

resetButton.addEventListener('click', () => {
  // Reset pokemon stats
  pikachu.hp = pikachu.maxHp;
  charmander.hp = charmander.maxHp;
  
  // Re-initialize game
  initGame();
  enableAttacks();
});

// Initialize game on load
initGame();

// Modal functionality for code input
const codeInputModal = document.getElementById('code-input-modal');
const codeInput = document.getElementById('code-input');
const submitCodeBtn = document.getElementById('submit-code');
const cancelCodeBtn = document.getElementById('cancel-code');

// Function to open modal
function openCodeModal() {
  codeInputModal.style.display = 'flex';
}

// Function to close modal
function closeCodeModal() {
  codeInputModal.style.display = 'none';
}

// Submit code
submitCodeBtn.addEventListener('click', () => {
  const code = codeInput.value;
  console.log("Submitted Python code:", code);
  // Here you would typically send the code to a server for execution
  // For now, we'll just close the modal
  closeCodeModal();
});

// Cancel button
cancelCodeBtn.addEventListener('click', closeCodeModal);

// For demonstration purposes, double click on code area to open modal
pythonCodeEl.addEventListener('dblclick', openCodeModal);
`,

  // Handle code selection specifically for Pokemon battle
  handleCodeSelect: (option, prevJs) => {
    // Special case for resets
    if (option === "RESET_CODE_TO_INITIAL") {
      return gameConfig.getInitialJs();
    }
    
    if (!option) return prevJs;

    // We would handle the specific Python code snippets here based on steps in the lesson
    // For example:
    if (option.includes('pikachu = { "name": "Pikachu", "hp": 100')) {
      // Step 1: Create Pokemon objects
      return prevJs;
    }

    // More handlers for other steps would go here

    return prevJs; // Return unchanged if no specific handler
  }
};

export default gameConfig; 
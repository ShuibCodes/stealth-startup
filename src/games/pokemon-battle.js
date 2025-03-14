// Configuration for the Pokemon Battle game

const pythonSteps = [
  // Step 1: Create Pokémon Objects
  `# Create the Pokemon dictionary objects with their stats
import random

pikachu = { 
    "name": "Pikachu", 
    "health": 100,
    "max_health": 100,
    "attacks": ["Thunder Shock", "Quick Attack", "Thunderbolt"],
    "damage": [20, 10, 30]
}

charmander = {
    "name": "Charmander",
    "health": 120,
    "max_health": 120,
    "attacks": ["Ember", "Scratch", "Flamethrower"],
    "damage": [15, 10, 25]
}`,
  
  // Step 2: Display Pokémon Stats 
  `# Function to show current stats of both Pokemon
def show_stats():
    print(f"\n{pikachu['name']} HP: {pikachu['health']}/{pikachu['max_health']}")
    print(f"{charmander['name']} HP: {charmander['health']}/{charmander['max_health']}")
    
# Show initial stats
show_stats()`,
  
  // Step 3: Build the Attack Menu
  `# Function to display available attacks
def show_attack_menu():
    print("\nChoose your attack:")
    for i, attack in enumerate(pikachu["attacks"]):
        print(f"{i+1}. {attack} (Damage: {pikachu['damage'][i]})")
        
show_attack_menu()`,
  
  // Step 4: Get Player Input
  `# Function to get player's attack choice
def get_player_choice():
    while True:
        try:
            choice = int(input("Enter attack number (1-3): ")) - 1
            if 0 <= choice < len(pikachu["attacks"]):
                return choice
            else:
                print("Invalid choice. Please enter 1, 2, or 3.")
        except ValueError:
            print("Please enter a number.")`,
  
  // Step 5: Implement the Player Attack Function
  `# Function for player's attack turn
def player_attack():
    # Get the attack choice from player
    attack_index = get_player_choice()
    attack = pikachu["attacks"][attack_index]
    damage = pikachu["damage"][attack_index]
    
    # Show attack message
    print(f"\n{pikachu['name']} uses {attack}!")
    
    # Apply damage to opponent
    charmander["health"] -= damage
    if charmander["health"] < 0:
        charmander["health"] = 0
    
    # Show updated stats
    show_stats()
    
    # Return True if the battle should continue
    return charmander["health"] > 0`,
  
  // Step 6: Implement the Opponent's Turn
  `# Function for opponent's attack turn
def opponent_attack():
    # Randomly select an attack
    attack_index = random.randint(0, len(charmander["attacks"]) - 1)
    attack = charmander["attacks"][attack_index]
    damage = charmander["damage"][attack_index]
    
    # Show attack message
    print(f"\n{charmander['name']} uses {attack}!")
    
    # Apply damage to player
    pikachu["health"] -= damage
    if pikachu["health"] < 0:
        pikachu["health"] = 0
    
    # Show updated stats
    show_stats()
    
    # Return True if the battle should continue
    return pikachu["health"] > 0`,
  
  // Step 7: Main Battle Loop
  `# Main battle function
def battle():
    print("\n===== BATTLE START =====\n")
    
    while True:
        # Player's turn
        if not player_attack():
            print(f"\n{pikachu['name']} wins!")
            break
        
        # Opponent's turn
        if not opponent_attack():
            print(f"\n{charmander['name']} wins!")
            break
        
        # Show attack menu for next turn
        show_attack_menu()`,
  
  // Step 8: Game Setup and Main Function
  `# Function to reset the game
def reset_game():
    pikachu["health"] = pikachu["max_health"]
    charmander["health"] = charmander["max_health"]
    print("\n===== GAME RESET =====\n")
    show_stats()
    show_attack_menu()

# Main function to run the game
def main():
    print("===== POKEMON BATTLE =====")
    print(f"{pikachu['name']} vs {charmander['name']}")
    
    # Start the battle
    battle()
    
    # Ask if player wants to play again
    play_again = input("\nPlay again? (y/n): ").lower()
    if play_again == 'y':
        reset_game()
        battle()

# Run the game
if __name__ == "__main__":
    main()`
];

const gameConfig = {
  // Initial HTML content
  getInitialHtml: () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon Battle</title>
    <script>
    // Pokemon objects with their stats
    const pikachu = { 
        name: "Pikachu", 
        health: 100,
        maxHealth: 100,
        attacks: ["Thunder Shock", "Quick Attack", "Thunderbolt"],
        damage: [20, 10, 30]
    };

    const charmander = {
        name: "Charmander",
        health: 120,
        maxHealth: 120,
        attacks: ["Ember", "Scratch", "Flamethrower"],
        damage: [15, 10, 25]
    };

    // Initialize when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Get DOM elements
        const battleMessage = document.getElementById('battle-message');
        const playerHpBar = document.getElementById('player-hp-bar');
        const playerHp = document.getElementById('player-hp');
        const opponentHpBar = document.getElementById('opponent-hp-bar');
        const opponentHp = document.getElementById('opponent-hp');
        const attackButtons = [
            document.getElementById('attack-1'),
            document.getElementById('attack-2'),
            document.getElementById('attack-3')
        ];
        const resetButton = document.getElementById('reset-game');
        
        // Set up attack buttons
        attackButtons.forEach((button, index) => {
            button.textContent = pikachu.attacks[index];
            button.addEventListener('click', () => playerAttack(index));
        });
        
        // Set up reset button
        resetButton.addEventListener('click', resetGame);
        
        // Update HP display
        function updateHpDisplay() {
            playerHpBar.style.width = (pikachu.health / pikachu.maxHealth * 100) + '%';
            playerHp.textContent = 'HP: ' + pikachu.health + '/' + pikachu.maxHealth;
            
            opponentHpBar.style.width = (charmander.health / charmander.maxHealth * 100) + '%';
            opponentHp.textContent = 'HP: ' + charmander.health + '/' + charmander.maxHealth;
            
            // Update HP bar colors based on health percentage
            playerHpBar.style.backgroundColor = getHpColor(pikachu.health / pikachu.maxHealth);
            opponentHpBar.style.backgroundColor = getHpColor(charmander.health / charmander.maxHealth);
        }
        
        // Get HP bar color based on health percentage
        function getHpColor(percentage) {
            if (percentage > 0.5) return '#78c850'; // Green
            if (percentage > 0.2) return '#f8d030'; // Yellow
            return '#f05030'; // Red
        }
        
        // Player attack function
        function playerAttack(attackIndex) {
            // Disable attack buttons during animation
            attackButtons.forEach(btn => btn.disabled = true);
            
            const attack = pikachu.attacks[attackIndex];
            const damage = pikachu.damage[attackIndex];
            
            battleMessage.textContent = pikachu.name + ' uses ' + attack + '!';
            
            // Apply damage to opponent
            setTimeout(() => {
                charmander.health = Math.max(0, charmander.health - damage);
                updateHpDisplay();
                
                // Check if opponent fainted
                if (charmander.health <= 0) {
                    battleMessage.textContent = charmander.name + ' fainted! ' + pikachu.name + ' wins!';
                    attackButtons.forEach(btn => btn.disabled = true);
                } else {
                    // If opponent still has health, it's their turn
                    opponentAttack();
                }
            }, 1000);
        }
        
        // Opponent attack function
        function opponentAttack() {
            setTimeout(() => {
                // Randomly select an attack
                const attackIndex = Math.floor(Math.random() * charmander.attacks.length);
                const attack = charmander.attacks[attackIndex];
                const damage = charmander.damage[attackIndex];
                
                battleMessage.textContent = charmander.name + ' uses ' + attack + '!';
                
                // Apply damage to player
                setTimeout(() => {
                    pikachu.health = Math.max(0, pikachu.health - damage);
                    updateHpDisplay();
                    
                    // Check if player fainted
                    if (pikachu.health <= 0) {
                        battleMessage.textContent = pikachu.name + ' fainted! ' + charmander.name + ' wins!';
                        attackButtons.forEach(btn => btn.disabled = true);
                    } else {
                        // If player still has health, allow attacks again
                        battleMessage.textContent = 'Choose your attack!';
                        attackButtons.forEach(btn => btn.disabled = false);
                    }
                }, 1000);
            }, 1000);
        }
        
        // Reset game function
        function resetGame() {
            // Reset Pokemon health
            pikachu.health = pikachu.maxHealth;
            charmander.health = charmander.maxHealth;
            
            // Reset UI
            battleMessage.textContent = 'Choose your attack!';
            updateHpDisplay();
            
            // Re-enable attack buttons
            attackButtons.forEach(btn => btn.disabled = false);
        }
        
        // Initialize the game
        updateHpDisplay();
    });
    </script>
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
        
        <div class="reset-container">
            <button class="reset-btn" id="reset-game">Reset Game</button>
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

.reset-container {
  margin-top: 15px;
  text-align: center;
}

.reset-btn {
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
}

.reset-btn:hover {
  background: linear-gradient(135deg, #f5371c, #f53f2a);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.reset-btn:active {
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

getInitialJs: () => `// Pokemon Battle Game in JS

// Pokemon objects with their stats
const pikachu = { 
    name: "Pikachu", 
    health: 100,
    maxHealth: 100,
    attacks: ["Thunder Shock", "Quick Attack", "Thunderbolt"],
    damage: [20, 10, 30]
};

const charmander = {
    name: "Charmander",
    health: 120,
    maxHealth: 120,
    attacks: ["Ember", "Scratch", "Flamethrower"],
    damage: [15, 10, 25]
};

// Initialize DOM elements
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const battleMessage = document.getElementById('battle-message');
    const playerHpBar = document.getElementById('player-hp-bar');
    const playerHp = document.getElementById('player-hp');
    const opponentHpBar = document.getElementById('opponent-hp-bar');
    const opponentHp = document.getElementById('opponent-hp');
    const attackButtons = [
        document.getElementById('attack-1'),
        document.getElementById('attack-2'),
        document.getElementById('attack-3')
    ];
    const resetButton = document.getElementById('reset-game');
    
    // Set up attack buttons
    attackButtons.forEach((button, index) => {
        button.textContent = pikachu.attacks[index];
        button.addEventListener('click', () => playerAttack(index));
    });
    
    // Set up reset button
    resetButton.addEventListener('click', resetGame);
    
    // Update HP display
    function updateHpDisplay() {
        playerHpBar.style.width = (pikachu.health / pikachu.maxHealth * 100) + '%';
        playerHp.textContent = 'HP: ' + pikachu.health + '/' + pikachu.maxHealth;
        
        opponentHpBar.style.width = (charmander.health / charmander.maxHealth * 100) + '%';
        opponentHp.textContent = 'HP: ' + charmander.health + '/' + charmander.maxHealth;
        
        // Update HP bar colors based on health percentage
        playerHpBar.style.backgroundColor = getHpColor(pikachu.health / pikachu.maxHealth);
        opponentHpBar.style.backgroundColor = getHpColor(charmander.health / charmander.maxHealth);
    }
    
    // Get HP bar color based on health percentage
    function getHpColor(percentage) {
        if (percentage > 0.5) return '#78c850'; // Green
        if (percentage > 0.2) return '#f8d030'; // Yellow
        return '#f05030'; // Red
    }
    
    // Player attack function
    function playerAttack(attackIndex) {
        // Disable attack buttons during animation
        attackButtons.forEach(btn => btn.disabled = true);
        
        const attack = pikachu.attacks[attackIndex];
        const damage = pikachu.damage[attackIndex];
        
        battleMessage.textContent = pikachu.name + ' uses ' + attack + '!';
        
        // Apply damage to opponent
        setTimeout(() => {
            charmander.health = Math.max(0, charmander.health - damage);
            updateHpDisplay();
            
            // Check if opponent fainted
            if (charmander.health <= 0) {
                battleMessage.textContent = charmander.name + ' fainted! ' + pikachu.name + ' wins!';
                attackButtons.forEach(btn => btn.disabled = true);
            } else {
                // If opponent still has health, it's their turn
                opponentAttack();
            }
        }, 1000);
    }
    
    // Opponent attack function
    function opponentAttack() {
        setTimeout(() => {
            // Randomly select an attack
            const attackIndex = Math.floor(Math.random() * charmander.attacks.length);
            const attack = charmander.attacks[attackIndex];
            const damage = charmander.damage[attackIndex];
            
            battleMessage.textContent = charmander.name + ' uses ' + attack + '!';
            
            // Apply damage to player
            setTimeout(() => {
                pikachu.health = Math.max(0, pikachu.health - damage);
                updateHpDisplay();
                
                // Check if player fainted
                if (pikachu.health <= 0) {
                    battleMessage.textContent = pikachu.name + ' fainted! ' + charmander.name + ' wins!';
                    attackButtons.forEach(btn => btn.disabled = true);
                } else {
                    // If player still has health, allow attacks again
                    battleMessage.textContent = 'Choose your attack!';
                    attackButtons.forEach(btn => btn.disabled = false);
                }
            }, 1000);
        }, 1000);
    }
    
    // Reset game function
    function resetGame() {
        // Reset Pokemon health
        pikachu.health = pikachu.maxHealth;
        charmander.health = charmander.maxHealth;
        
        // Reset UI
        battleMessage.textContent = 'Choose your attack!';
        updateHpDisplay();
        
        // Re-enable attack buttons
        attackButtons.forEach(btn => btn.disabled = false);
    }
    
    // Initialize the game
    updateHpDisplay();
});
`,

getInitialPy: () => `# Pokemon Battle Game in Python
# This is a simple turn-based Pokemon battle game
# Follow the steps to build your own working game!

# Step 1: Create your Pokemon

`,

  // A counter to keep track of which Python step has been appended
  pythonStepCounter: 0,

  // Handle code selection for both JS and Python modes.
  handleCodeSelect: (option, prevCode) => {
    if (option === "RESET_CODE_TO_INITIAL") {
      gameConfig.pythonStepCounter = 0;
      return prevCode.startsWith("#")
        ? gameConfig.getInitialPy()
        : gameConfig.getInitialJs();
    }
    
    if (!option) return prevCode;
    
    // For Python mode
    if (prevCode.startsWith("#")) {
      // Instead of trying to be clever with detection, let's use a more direct approach
      // We'll use the full array of steps and keep track of which one we're on

      // When a correct answer is selected, we get the corresponding code block from pythonSteps
      // First, figure out which step we're on based on prevCode
      let stepsThusFar = prevCode.split(/# Step \d+:/g).filter(part => part.trim().length > 0);
      
      // The number of steps so far is our current step
      // Initial state or reset state just has the comment but no actual step
      let currentStepNumber = (prevCode === gameConfig.getInitialPy() || stepsThusFar.length === 0) ? 0 : stepsThusFar.length;
      
      // Get the appropriate step content from our predefined steps
      let stepIndex = currentStepNumber;
      const stepContent = pythonSteps[stepIndex];
      
      if (stepIndex === 0) {
        // First step replaces everything
        return stepContent;
      } else {
        // For subsequent steps, append with proper step marker
        // Ensure we use the exact step number (based on array index + 1)
        let nextStepNumber = stepIndex + 1;
        
        // Only append if we have content and it's not already there
        if (stepContent && !prevCode.includes(stepContent)) {
          return prevCode + `\n\n# Step ${nextStepNumber}:\n` + stepContent;
        } else {
          // If we're seeing a duplicate, don't append
          return prevCode;
        }
      }
    } else {
      // JS mode: Append the provided option as before
      return prevCode + "\n\n" + option + "\n\n";
    }
  }
};

export default gameConfig;
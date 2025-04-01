// Import game configurations
import rockPaperScissors from './rock-paper-scissors';
import ticTacToe from './tic-tac-toe';
import pokemonBattle from './pokemon-battle';
import memoryGame from './memory-game';

// Create a default game config as a fallback
const defaultGameConfig = {
  getInitialHtml: () => '<div class="game-container"><h1>Game Loading...</h1></div>',
  getInitialCss: () => '.game-container { text-align: center; padding: 20px; }',
  getInitialJs: () => '// Game code will load here',
  getInitialPy: () => '# Game code will load here',
  handleCodeSelect: (option, prevCode) => prevCode
};

// Add error handling for each game module
const safeGameConfigs = {
  'rock-paper-scissors': (() => {
    try {
      return rockPaperScissors || defaultGameConfig;
    } catch (e) {
      console.error("Error loading rock-paper-scissors game:", e);
      return defaultGameConfig;
    }
  })(),
  'tic-tac-toe': (() => {
    try {
      return ticTacToe || defaultGameConfig;
    } catch (e) {
      console.error("Error loading tic-tac-toe game:", e);
      return defaultGameConfig;
    }
  })(),
  'pokemon-battle': (() => {
    try {
      return pokemonBattle || defaultGameConfig;
    } catch (e) {
      console.error("Error loading pokemon-battle game:", e);
      return defaultGameConfig;
    }
  })(),
  'memory-game': (() => {
    try {
      return memoryGame || defaultGameConfig;
    } catch (e) {
      console.error("Error loading memory-game game:", e);
      return defaultGameConfig;
    }
  })()
};

/**
 * Get game configuration based on the game type
 * @param {string} gameType - The type/path of the game (e.g., 'rock-paper-scissors', 'tic-tac-toe')
 * @returns {Object} The game configuration object
 */
export const getGameConfig = (gameType) => {
  try {
    return safeGameConfigs[gameType] || safeGameConfigs['rock-paper-scissors'] || defaultGameConfig;
  } catch (e) {
    console.error(`Error getting game config for ${gameType}:`, e);
    return defaultGameConfig;
  }
};

export default getGameConfig; 
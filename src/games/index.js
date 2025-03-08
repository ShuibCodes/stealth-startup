// Import game configurations
import rockPaperScissors from './rock-paper-scissors';
import ticTacToe from './tic-tac-toe';

/**
 * Get game configuration based on the game type
 * @param {string} gameType - The type/path of the game (e.g., 'rock-paper-scissors', 'tic-tac-toe')
 * @returns {Object} The game configuration object
 */


export const getGameConfig = (gameType) => {
  const configs = {
    'rock-paper-scissors': rockPaperScissors,
    'tic-tac-toe': ticTacToe,
    // Add more games here as they are created
  };

  return configs[gameType] || rockPaperScissors; // Default to rock-paper-scissors if not found
};

export default getGameConfig; 
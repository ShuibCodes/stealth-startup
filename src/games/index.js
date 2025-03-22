// Import game configurations
import rockPaperScissors from './rock-paper-scissors';
import ticTacToe from './tic-tac-toe';
import pokemonBattle from './pokemon-battle';
import memoryGame from './memory-game';

const gameConfigs = {
  'rock-paper-scissors': rockPaperScissors,
  'tic-tac-toe': ticTacToe,
  'pokemon-battle': pokemonBattle,
  'memory-game': memoryGame
};

/**
 * Get game configuration based on the game type
 * @param {string} gameType - The type/path of the game (e.g., 'rock-paper-scissors', 'tic-tac-toe')
 * @returns {Object} The game configuration object
 */
export const getGameConfig = (gameType) => {
  return gameConfigs[gameType] || gameConfigs['rock-paper-scissors'];
};

export default getGameConfig; 
export const initialState = {
  html: `
<div id="game">
  <div id="player"></div>
  <div id="score">Score: 0</div>
</div>`,
  
  css: `
#game {
  width: 100%;
  height: 400px;
  background: #f0f0f0;
  position: relative;
}

#player {
  width: 50px;
  height: 50px;
  background: red;
  position: absolute;
  left: 0;
  bottom: 0;
}

#score {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
}`,
  
  js: `
const player = document.getElementById('player');
const game = document.getElementById('game');
let score = 0;

function updateScore() {
  document.getElementById('score').textContent = 'Score: ' + score;
}

// Basic movement
document.addEventListener('keydown', (e) => {
  const left = parseInt(player.style.left || 0);
  
  switch(e.key) {
    case 'ArrowLeft':
      if(left > 0) {
        player.style.left = (left - 10) + 'px';
      }
      break;
    case 'ArrowRight':
      if(left < game.offsetWidth - player.offsetWidth) {
        player.style.left = (left + 10) + 'px';
      }
      break;
  }
});

// Initialize game
updateScore();`
}; 
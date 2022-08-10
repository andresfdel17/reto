import React from 'react';

export const PlayerTips = ({
  gameState,
  hitsbyPlayer,
  hitsByComputer,
  startAgain,
  winner,
}) => {
  let numberOfHits = hitsbyPlayer.length;
  let numberOfSuccessfulHits = hitsbyPlayer.filter((hit) => hit.type === 'hit').length;
  let accuracyScore = Math.round(100 * (numberOfSuccessfulHits / numberOfHits));
  let succesfulComputerHits = hitsByComputer.filter((hit) => hit.type === 'hit').length;

  let gameOverPanel = (
    <div>
      <div className="tip-box-title">Juego terminado!</div>
      <p className="player-tip">
        {winner === 'player' ? 'Ganaste! 🎉' : 'Perdiste 😭. Mejor suerte la proxima! '}
      </p>
      <p className="restart" onClick={startAgain}>
        Jugar de nuevo?
      </p>
    </div>
  );

  let tipsPanel = (
    <div>
      <div className="tip-box-title">Estadísticas</div>
      <div id="firing-info">
        <ul>
          <li>{numberOfSuccessfulHits} disparos exitosos</li>
          <li>{accuracyScore > 0 ? `${accuracyScore}%` : `0%`} precisión </li>
        </ul>
        <p className="player-tip">El primero en hundir 5 barcos gana.</p>
        <p className="restart" onClick={startAgain}>
          Reiniciar
        </p>
      </div>
    </div>
  );

  return (
    <div id="player-tips">
      {numberOfSuccessfulHits === 17 || succesfulComputerHits === 17
        ? gameOverPanel
        : tipsPanel}
    </div>
  );
};

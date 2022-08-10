import React from 'react';
import { ReplicaBox } from './ReplicaBox';

export const PlayerFleet = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  startTurn,
  startAgain,
}) => {
  let shipsLeft = availableShips.map((ship) => ship.name);

  // For every ship still available, return a Replica Box with the ship's name and as many squares as its length
  let shipReplicaBoxes = shipsLeft.map((shipName) => (
    <ReplicaBox
      selectShip={selectShip}
      key={shipName}
      isCurrentlyPlacing={currentlyPlacing && currentlyPlacing.name === shipName}
      shipName={shipName}
      availableShips={availableShips}
    />
  ));

  let fleet = (
    <div id="replica-fleet">
      {shipReplicaBoxes}
      <p className="player-tip">Click derecho para rotar los barcos.</p>
      <p className="restart" onClick={startAgain}>
        Reiniciar
      </p>
    </div>
  );

  let playButton = (
    <div id="play-ready">
      <p className="player-tip">Barcos en formación.</p>
      <button id="play-button" onClick={startTurn}>
        Iniciar juego
      </button>
    </div>
  );

  return (
    <div id="available-ships">
      <div className="tip-box-title">Tus barcos</div>
      {availableShips.length > 0 ? fleet : playButton}
    </div>
  );
};

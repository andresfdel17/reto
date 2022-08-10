import React from 'react'

const Welcome = ({ startGame }) => {
    return (
        <main className="naval">
            <h2 className="tip-box-title">Reglas</h2>
            <p className="player-tip">
               Debes hundir la flota enemiga antes que el a tí
            </p>
            <button className='naval' onClick={startGame}>Jugar</button>
        </main>
    );
}

export default Welcome
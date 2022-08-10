import React, { useState } from 'react'
import Header from './Header';
import Welcome from './Welcome';
import '../../css/style.css';
import { Game } from './Game/Game';
const Naval = () => {
  const [status, setStatus] = useState("welcome");
  const startGame = () => {
    setStatus("play");
  }
  return (
    <div className='naval'>
      <Header />
      {
        status === "play" ? <Game />  : <Welcome startGame={startGame} />
      }
    </div>
  )
}

export default Naval
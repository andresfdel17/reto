import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePicker from "../components/GamePicker";
import Hangman from '../components/Hangman/Hangman';
import Naval from '../components/Naval/Naval';
import Piedra from '../components/Piedra/Piedra';
const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePicker />} />
          <Route path="/piedra" element={<Piedra />} />
          <Route path="/naval" element={<Naval />} />
          <Route path="/hangman" element={<Hangman />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
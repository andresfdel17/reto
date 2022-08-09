import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePicker from "../components/GamePicker";
import Piedra from '../components/Piedra/Piedra';
const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePicker />} />
          <Route path="/piedra" element={<Piedra />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
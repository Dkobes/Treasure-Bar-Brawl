import React from 'react'
import './App.css'
import TitleScreen from './pages/TitleScreen/TitleScreen'
import StartMenu from './pages/StartMenu/StartMenu'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BattleScreen from './pages/BattleScreen/BattleScreen'
import PartyMenu from './pages/PartyMenu/PartyMenu'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} /> 
        <Route path="/start-menu" element={<StartMenu />} />
        <Route path="/battle" element={<BattleScreen />} />
        <Route path="party-menu" element={<PartyMenu />} />
      </Routes>
    </Router>
  )
}

export default App

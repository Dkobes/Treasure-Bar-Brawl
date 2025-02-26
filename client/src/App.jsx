import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TitleScreen from './pages/TitleScreen/TitleScreen'
import StartMenu from './pages/StartMenu/StartMenu'
import BattleScreen from './pages/BattleScreen/BattleScreen'
import PartyMenu from './pages/PartyMenu/PartyMenu'
import WorldScene from './pages/WorldPage/WorldPage'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} /> 
        <Route path="/start-menu" element={<StartMenu />} />
        <Route path="/battle" element={<BattleScreen />} />
        <Route path="/party-menu" element={<PartyMenu />} />
        <Route path='/world' element={<WorldScene />} />
        <Route path='/dragon-room' element={<DragonRoom />} />
      </Routes>
    </Router>
  )
}

export default App

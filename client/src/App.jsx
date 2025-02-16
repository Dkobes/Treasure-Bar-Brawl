import React from 'react'
import './App.css'
import TitleScreen from './pages/TitleScreen/TitleScreen'
import StartMenu from './pages/StartMenu/StartMenu'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BattleScreen from './pages/BattleScreen/BattleScreen'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} /> 
        <Route path="/start-menu" element={<StartMenu />} />
        <route path="/battle" element={<BattleScreen />} />
      </Routes>
    </Router>
  )
}

export default App

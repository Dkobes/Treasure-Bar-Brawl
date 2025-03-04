import {React, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TitleScreen from './pages/TitleScreen/TitleScreen'
import StartMenu from './pages/StartMenu/StartMenu'
// import BattleScreen from './pages/BattleScreen/BattleScreen'
import PartyMenu from './pages/PartyMenu/PartyMenu'
// import WorldScene from './pages/WorldPage/WorldPage'
import DragonRoom from './pages/DragonRoom/DragonRoom'


const BattleScreen = lazy(() => import('./pages/BattleScreen/BattleScreen'));
const WorldScene = lazy(() => import('./pages/WorldPage/WorldPage'));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<TitleScreen />} /> 
          <Route path="/start-menu" element={<StartMenu />} />
          <Route path="/battle" element={<BattleScreen />} />
          <Route path="/party-menu" element={<PartyMenu />} />
          <Route path='/world' element={<WorldScene />} />
          <Route path='/dragon-room' element={<DragonRoom />} /> 
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App

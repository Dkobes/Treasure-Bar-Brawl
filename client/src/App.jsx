import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import TitleScreen from './pages/TitleScreen/TitleScreen';
import StartMenu from './pages/StartMenu/StartMenu';
import './App.css'

function App() {


  return (
    <Router>
      <div className="App"> 
        <main>
        <Routes>
          {/* <Route path="/"><TitleScreen /></Route> */}
          <Route path="/login" element={<StartMenu />} />
        </Routes>
        </main>
        </div>
    </Router>
  )
}

export default App

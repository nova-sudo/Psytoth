import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Registration from './routes/Registration';
import MusicPlayer from './components/MusicPlayer';
import JournalEntries from './routes/JournalEntries';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        {/* MusicPlayer positioned outside Routes, so it stays on all pages */}
        <div className="fixed top-0 right-0 p-4 z-20">
          <MusicPlayer />
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/journal-entries" element={<JournalEntries />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

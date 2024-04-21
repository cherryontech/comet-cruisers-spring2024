import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ChooseJournal from './pages/ChooseJournal';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-journal" element={<ChooseJournal />} />
      </Routes>
    </Router>
  );
}

export default App;

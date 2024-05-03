import './App.css';
import './styles/tailwind.css';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import FreeJournal from './pages/FreeJournal';
import PromptJournal from './pages/PromptJournal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/free-journal" element={<FreeJournal />} />
        <Route path="/prompt-journal" element={<PromptJournal />} />
      </Routes>
    </Router>
  );
}

export default App;

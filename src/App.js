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
        <Route path="/free-journal/:id?" element={<FreeJournal />} />
        <Route path="/prompt-journal/:id?" element={<PromptJournal />} />
      </Routes>
    </Router>
  );
}

export default App;

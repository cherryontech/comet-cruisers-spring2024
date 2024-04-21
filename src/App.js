import './App.css';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ChooseJournal from './pages/ChooseJournal';
import FreeJournal from './pages/FreeJournal';
import PromptJournal from './pages/PromptJournal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-journal" element={<ChooseJournal />} />
        <Route path="/free-journal" element={<FreeJournal />} />
        <Route path="/prompt-journal" element={<PromptJournal />} />
      </Routes>
      <div className="text-3xl font-bold underline"> testing tailwind</div>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import './styles/tailwind.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <Button type="button" name="test" text="test" class="btn btn-primary" />
        <Button type="button" name="test2" text="test2" class="btn btn-secondary" />
      </header>
    </div>
  );
}

export default App;

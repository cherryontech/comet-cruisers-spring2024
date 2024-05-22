import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Todo from '../js/Todo';
import { IoMdClose } from 'react-icons/io';
import 'reactjs-popup/dist/index.css';
import DisplayJournal from '../js/displayEntries.js';
import GenerateMessage from '../js/botPrompt.js';

const Home = () => {
  const displayMascot = () => {
    return <GenerateMessage />;
  };

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Title</h1>
      <header>This is the temporary home page</header>
      <Todo />
      <br />
      <Popup trigger={<button>New Entry</button>} modal nested>
        {(close) => (
          <div className="modal">
            <div className="content">Choose</div>
            <div>
              <button onClick={() => close()}>
                <IoMdClose />
              </button>
            </div>
            <button>
              <Link to="/free-journal">Free Write</Link>
            </button>
            <br />
            <button>
              <Link to="/prompt-journal">Random Prompt</Link>
            </button>
          </div>
        )}
      </Popup>
      <br />
      <br />
      <div>
        <DisplayJournal />
      </div>
      {displayMascot()}
    </main>
  );
};

export default Home;

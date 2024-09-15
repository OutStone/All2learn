import axios from 'axios';
import './App.css';

function App() {

  const apiCall = () => {
    axios.get('http://localhost:3000/api').then((data) => {
      console.log(data)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        
        <button onClick={apiCall}> 
          click me i dunno why
        </button>

      </header>
    </div>
  );
}

export default App;

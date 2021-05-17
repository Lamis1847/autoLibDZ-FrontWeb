import './App.css';

import HeaderArgon from "./components/Header.js"
import Tables from "./components/Tables.js"
import ListBornes from "./components/ListBornes.js"

function App() {
  return (
    <div className="App">
        <ListBornes bornes={null}></ListBornes>
    </div>
  );
}

export default App;

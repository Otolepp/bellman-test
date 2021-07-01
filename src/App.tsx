import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";



function App() {
  return (
    <div className="App">
      <FontAwesomeIcon icon={faHome}/>
      <p> Hello </p>
    </div>
  );
}

export default App;

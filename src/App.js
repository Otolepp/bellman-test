import React, {useState} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FileList from './components/FileList';
import PropertyInfos from './components/PropertyInfos';


function App() {

  const [selectedPropertyID, setSelectedPropertyID] = useState("PROPERTY_1");

  function handleChangePropertyID(newID) {
    setSelectedPropertyID(newID);
  console.log(newID);
  }

  return (
    <div className="App">
      <div className="app-body">
        <div className="app-body-left">
          <Sidebar onChangePropertyID={handleChangePropertyID}  />
        </div>
        <div className="app-body-center">
          <FileList propertyID={selectedPropertyID}/>
        </div>
        <div className="app-body-right">
          <PropertyInfos propertyID={selectedPropertyID}/>
        </div>
      </div>

      {/* Sidebar Property selection */}
      {/* App 
        File list with:
      - Filters: Status (OPEN, CLOSED) and 2 types (ex: GENERAL_MEETING and ELEVATOR)
      - Search
      - Pagination (set 3 items per pages)
      */}
      {/* Property Key Infos */}
    </div>
  );
}

export default App;

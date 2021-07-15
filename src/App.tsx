import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FileList from './components/FileList';
import PropertyInfos from './components/PropertyInfos';

import {IProperty} from './interfaces/property';
import { getProperties } from './api/api';

function App() {

  const [properties, setProperties] = useState<IProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<IProperty>();

  const handleChangeProperty = (property: IProperty) => {
    setSelectedProperty(property);
    console.log(property);
  }

  const fetchProperties = useCallback( async () => {
    const data = await getProperties();
    setProperties(data);
    handleChangeProperty(data[0]);
  }, [])

  useEffect( () =>  {
    fetchProperties();
  }, [fetchProperties])

  return (
    <div className="App">
      <div className="app-body">
        <div className="app-body-left">
          <Sidebar onChangeProperty={handleChangeProperty} properties={properties} />
        </div>
         <div className="app-body-center">
          <FileList property={selectedProperty}/>
        </div>
        <div className="app-body-right">
          <PropertyInfos property={selectedProperty}/>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { ReactComponent as Logo }  from '../logo.svg'; 
import './Sidebar.css';

const getProperties = () => {
    return axios.get("http://localhost:8080/property")
      .then( (res)=> {
        return res.data;
      })
      .catch( (error)=>{
        console.error(error);
      })
  }
  


function Sidebar({onChangePropertyID}) {

    const [properties, setProperties] = useState([]);

    const fetchProperties = async () => {
      const data = await getProperties();
      setProperties(data);
    }
  
    useEffect( () =>  {
      fetchProperties();
    }, [])


    const handlePropertyChange = (e) => {
      onChangePropertyID(e.target.value);
      console.log(e.target.value);
    }

    return (
        <div className="sidebar">
            <Logo className="logo"/>
            <select name="property-select" id="property-select" onChange={e => handlePropertyChange(e)}>
                { 
                  properties.map((property, index) => (
                      <option value={property.id} key={index}> {property.name} </option>
                  ))
                }
            </select>
        </div>
    )
}

export default Sidebar

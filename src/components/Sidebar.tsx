import React from 'react'
import './Sidebar.css';
import { ReactComponent as Logo }  from '../logo.svg'; 
import { IProperty } from '../interfaces/property';


  
function Sidebar(props: {onChangeProperty: any, properties: IProperty[]}) {

    const handlePropertyChange = (e: any) => {
      const propertyID = e.target.value;
      const newProperty = props.properties.find(property => property.id === propertyID);
      props.onChangeProperty(newProperty);
    }

    return (
        <div className="sidebar">
            <Logo className="logo"/>
            <select name="property-select" id="property-select" onChange={e => handlePropertyChange(e)}>
                { 
                  props.properties.map((property, index) => (
                      <option value={property.id} key={index}> {property.name} </option>
                  ))
                }
            </select>
        </div>
    )
}

export default Sidebar

import React, {useState, useEffect} from 'react'
import './PropertyInfos.css';
import { IProperty, IPropertyInfos } from '../interfaces/property';
import { getPropertyInfos } from '../api/api';
 

function PropertyInfos(props: {property?: IProperty}) {

    const [infos, setInfos] = useState<IPropertyInfos>();

    const fetchInfos = async (propertyID: string) => {
      const data = await getPropertyInfos(propertyID);
      setInfos(data);
    }

    useEffect( () =>  {
      if (props.property !== undefined) {
        fetchInfos(props.property.id);
      }
    }, [props.property])

    return (
        <div className="property-infos">
            <img src={props.property?.pictureUrl} alt="" />
            <div className="adress">
                <p className="bold"> Adress </p>
                <p> {props.property?.addressLine1} , {props.property?.postalCode} </p>
                <p> {props.property?.city}</p>
            </div>
            <div className="code">
                <p className="bold"> Code of outside door </p>
                <p> {infos?.outsideDoorCode} </p>
            </div>
            <div className="keeper-work-hours">
                <p className="bold"> Keeper work hours </p>
                <p> {infos?.keeperWorkHours} </p>
            </div>
            <div className="cleaning">

            </div>
            <div className="trash">

            </div>
        </div>
    )
}

export default PropertyInfos

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './PropertyInfos.css';


// /property/_{propertyId}_/keyInfos

const getPropertyInfo = (propertyId) => {
    return axios.get(`http://localhost:8080/property/${propertyId}/keyInfos`)
      .then( (res)=> {
        return res.data;
      })
      .catch( (error)=>{
        console.error(error);
      })
}
  
const getProperties = () => {
    return axios.get("http://localhost:8080/property")
      .then( (res)=> {
        return res.data;
      })
      .catch( (error)=>{
        console.error(error);
      })
  }
  

function PropertyInfos({propertyID}) {

    const [infos, setInfos] = useState([{"title":"keeper_hours","description":"[{\"label\":\"Lundi\",\"detail\":\"9:00 - 12:00 / 13:00 - 16:00\"},{\"label\":\"Mardi\",\"detail\":\"9:00 - 12:00 / 13:00 - 16:00\"},{\"label\":\"Mercredi\",\"detail\":\"9:00 - 12:00 / 13:00 - 16:00\"},{\"label\":\"Jeudi\",\"detail\":\"9:00 - 12:00 / 13:00 - 16:00\"},{\"label\":\"Vendredi\",\"detail\":\"9:00 - 12:00 / 13:00 - 16:00\"},{\"label\":\"Samedi\",\"detail\":\"9:00 - 12:00\"},{\"label\":\"Dimanche\",\"detail\":\"Repos\"}]","type":"LIST"},{"title":"cleaning_days","description":"Réalisé par le gardien le lundi, mercredi et vendredi","type":"TEXT"},{"title":"trash_days","description":"[{\"label\":\"Verre\",\"detail\":\"Mardi\"},{\"label\":\"Recyclage\",\"detail\":\"Lundi, Mercredi, Vendredi\"},{\"label\":\"Ordures\",\"detail\":\"Tous les jours (sauf le dimanche)\"}]","type":"LIST"},{"title":"door_code","description":"19A23","type":"TEXT"}]);
    const [property, setProperty] = useState([]);

    const fetchProperty = async () => {
        const data = await getProperties();
        const _property = data.filter(x => x.id == propertyID);
        setProperty(_property[0]);
    }

    const fetchInfos = async () => {
      const data = await getPropertyInfo(propertyID);
      setInfos(data);
      console.log("infos", data);
    }

  
    useEffect( () =>  {
        fetchProperty();
        fetchInfos();
    }, [propertyID])



    return (
        <div className="property-infos">
            <img src={property.pictureUrl} alt="" />
            <div className="adress">
                <p className="bold"> Adress </p>
                <p> {property.addressLine1} , {property.postalCode} </p>
                <p> {property.city}</p>
            </div>
            <div className="code">
                <p className="bold"> Code of outside door </p>
                <p>  {infos[3].description} </p>
            </div>
            <div className="keeper-work-hours">
                <p className="bold"> Keeper work hours </p>
                <p> {console.log(infos[0].description)} {infos[0].description} </p>
            </div>
            <div className="cleaning">

            </div>
            <div className="trash">

            </div>
        </div>
    )
}

export default PropertyInfos

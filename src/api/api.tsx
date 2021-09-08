import axios from 'axios';
import properties from '../data/property.json';
import files from '../data/file.json';
import infos from '../data/keyInfos.json';


const back_url = "http://localhost:8080"

export const getProperties = () => {
    /*return axios.get(`${back_url}/property`)
      .then( (res)=> {
        return res.data;
      })
      .catch( (error)=>{
        console.error("error fetching properties: ", error);
        return [];
      })*/
  return properties;
}

export const getPropertyFile = (propertyID: string) => {
    /*return axios.get(`${back_url}/property/${propertyID}/file`)
      .then( (res)=> {
        return res.data;
      })
      .catch( (error)=>{
        console.error("error fetching property files: ", error);
        return [];
      })*/
  return (files as any)[propertyID];

}
  
export const getPropertyInfos = (propertyID: string) => {
  /*return axios.get(`${back_url}/property/${propertyID}/keyInfos`)
    .then( (res)=> {
      return res.data;
    })
    .catch( (error)=>{
      console.error("error fetching properties info: ", error);
      return [];
    })*/
  return (infos as any)[propertyID];
}


import axios from 'axios';

const back_url = "http://localhost:8080"

export const getProperties = () => {
    return axios.get(`${back_url}/property`)
      .then( (res)=> {
        return res.data;
      })
      .catch( (error)=>{
        console.error("error fetching properties: ", error);
        return [];
      })
}

export const getPropertyFile = (propertyID: string) => {
    return axios.get(`${back_url}/property/${propertyID}/file`)
      .then( (res)=> {
        return res.data;
      })
      .catch( (error)=>{
        console.error("error fetching property files: ", error);
        return [];
      })
}
  
export const getPropertyInfos = (propertyID: string) => {
  return axios.get(`${back_url}/property/${propertyID}/keyInfos`)
    .then( (res)=> {
      return res.data;
    })
    .catch( (error)=>{
      console.error("error fetching properties info: ", error);
    })
}
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './FileList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";



// /property/_{propertyId}_/file

const getPropertyFile = (propertyId) => {
    return axios.get(`http://localhost:8080/property/${propertyId}/file`)
      .then( (res)=> {
        return res.data;
      })
      .catch( (error)=>{
        console.error(error);
      })
}
  


function FileList({propertyID}) {

    const [files, setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);

    const fetchFiles = async () => {
      console.log(propertyID);
      const data = await getPropertyFile(propertyID);
      setFiles(data);
      setFilteredFiles(data);
    }


    const searchInFiles = (key) => {
        const filterFiles = files.filter((file) => {
            return JSON.stringify(file).includes(key) || JSON.stringify(file).toLowerCase().includes(key);
        });
        setFilteredFiles(filterFiles);
    }


    const filterFilesBy = (field, fieldValue) => {
        const filterFiles = files.filter((file) => {
            return file[field] === fieldValue;
        });
        setFilteredFiles(filterFiles);
    }

  
    useEffect( () =>  {
        fetchFiles();
    }, [propertyID])


    return (
        <div className="file-list" >
            <div className="files-header">
                <h1 className="nb-files"> {files.length} Files </h1>
                <div className="files-searchbar">
                    <input type="text" placeholder="Search a file..." onChange={e => searchInFiles(e.target.value)} />
                    <FontAwesomeIcon className="search-icon" icon= { faSearch } />
                </div>            
            </div>
            <div className="filters">
                <button onClick={() => filterFilesBy("type", "GENERAL_MEETING")}> General meeting </button>            
                <button onClick={() => filterFilesBy("type", "ELEVATOR")}> Elevator </button>            
                <button onClick={() => filterFilesBy("status", "OPEN")}> Open </button>            
                <button onClick={() => filterFilesBy("status", "CLOSED")}> Closed </button>            
            </div>
            <div className="files">
                { 
                    filteredFiles.map((file, index) => (
                        <div className="file-obj" key= {index}>
                            <File title={file.title} status={file.status} lastActivity={file.lastActivity} lastActivityDate={file.lastActivityDate} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function File({title, status, lastActivity, lastActivityDate}) {
    return (
        <div className="file">
            <div className="text">
                <div className="first-line">
                    <p> {title} </p>
                    <p> {status} </p>
                </div>
                <div className="second-line">
                    <p> {lastActivity} </p>
                    <p> {lastActivityDate} </p>
                </div>
            </div>

        </div>
    )
}



export default FileList

import React, {useState, useEffect} from 'react'
import './FileList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { IFilter, IProperty, IPropertyFile } from '../interfaces/property';
import { getPropertyFile } from '../api/api';

//capitalize only the first letter of the string. 
const unifyString = (s: string) => {
    const newString = s.toLowerCase().replace(/_/g," ");
    return newString.charAt(0).toUpperCase() + newString.slice(1).toLowerCase();
}


function FileList(props: {property?: IProperty}) {

    const [files, setFiles] = useState<IPropertyFile[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<IPropertyFile[]>([]);
    const [activeFilter, setActiveFilter] = useState<IFilter>();

    const fetchFiles = async (propertyID: string) => {
      const data = await getPropertyFile(propertyID);
      setFiles(data);
      setFilteredFiles(data);
    }

    const searchInFiles = (key: string) => {
        const filterFiles = files.filter((file) => {
            return JSON.stringify(file).includes(key) || JSON.stringify(file).toLowerCase().includes(key);
        });
        setActiveFilter(undefined);
        setFilteredFiles(filterFiles);
    }

    const filters: IFilter[] = [
        {field: "type", fieldValue: "GENERAL_MEETING"},
        {field: "type", fieldValue: "ELEVATOR"},
        {field: "status", fieldValue: "OPEN"},
        {field: "status", fieldValue: "CLOSED"},
    ];

    const filterFilesBy = (filter: IFilter) => {
        const filterFiles = files.filter((file: IPropertyFile) => {
            return file[filter.field] === filter.fieldValue;
        });
        setActiveFilter(filter);
        setFilteredFiles(filterFiles);
    }
  
    useEffect( () =>  {
        if (props.property !== undefined) {
            fetchFiles(props.property.id);
        }
    }, [props.property])


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
            { 
                filters.map((filter, index) => (
                    <Filter onClickHandler={filterFilesBy} filter={filter} isActive={filter.fieldValue === activeFilter?.fieldValue} key={index}/>
                ))
            } 
            </div>
            <div className="files"> 
            { 
                filteredFiles.map((file, index) => (
                    <File file={file} key={index}/>
                ))
            } 
            </div>
        </div>
    )
}

function File(props: {file: IPropertyFile}) {
    const statusStyle = (props.file.status === "OPEN") ? { color:'#69CB8B' } : { color:'#4D5E71' };
    return (
        <div className="file">
            <div className="file-icon">
                <FontAwesomeIcon className="file-icon" icon= { faUserFriends } />
            </div>
            <div className="text">
                <div className="first-line">
                    <p className="bold no-margin large-font"> {props.file.title} </p>
                    <p className="no-margin medium-font" style={statusStyle}> {props.file.status} </p>
                </div>
                <div className="second-line">
                    <p className="no-margin large-font"> {props.file.lastActivity} </p>
                    <p className="no-margin medium-font"> {props.file.lastActivityDate} </p>
                </div>
            </div>
        </div>
    )
}

function Filter(props: {onClickHandler: any, filter: IFilter, isActive: boolean}) {
    const filterStyle = props.isActive ? { color:'#69CB8B' } : { color:'#4D5E71' };

    return (
        <div className="filter">
            <button style={filterStyle} onClick={() => props.onClickHandler(props.filter)}> {unifyString(props.filter.fieldValue)} </button>            
        </div>
    )
}


export default FileList

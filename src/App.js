import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Table_Material } from "./Table_Material";
import { Table_ReactStrap } from "./Table_ReactStrap";

const ShowUsers = () => {

  const [userProfiles, setUserProfiles] = useState([]);

  const fetchUserProfiles = () => {
    axios.get("/api/v1/person/get_all").then(res => {
      console.log(res);
      setUserProfiles(res.data);
    });
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return userProfiles.map((userProfile, index) => {
    
      return (
        <div key={index}>
          <h1>{userProfile.name}</h1>
          <p>{userProfile.id}</p>
        </div>
      )
    })
};

const LabaTest = () => {
  const[persons, setPersons] = useState([]);

  const getPersons = () => {
    const data = axios.get("/api/v1/person/get_all").then(res => {
      console.log(res)
    });
  };
    
  useEffect(() => {
    getPersons();
  }, []);

  return <p>Hello</p>;
}

function App() {
  return (
    <div className="App">
      {/* <ShowUsers /> */}
      <Table_Material />
    </div>
  );
}

export default App;

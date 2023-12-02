import React from 'react'
import axios from "axios";
import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Home() {
    const { authState } = useContext(AuthContext);
    const [listOfTask, setListOfTask] = useState([]);
    const Links = styled(Link)`
    text-decoration: none;
    color: black;
  `;
    let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios.get("http://localhost:3001/task")
        .then((response) => {
          setListOfTask(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
      }
    }, []);
    
  return (
    <div className='taskPageContainer'>
      <h1>Task List</h1>
        {listOfTask.map((value, key) => {
        return (
          <div key={key} className="task">
            <div className='title' onClick={() => { navigate(`/task/${value.id}`); }}> {value.title} </div>
            <div className='description' onClick={() => { navigate(`/task/${value.id}`); }}> {value.description} </div>
            <div className='datetime'>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              }).format(new Date(value.dateTime))}
            </div>
            <div className='username'>
              <Links to={`/profile/${value.UserId}`}>Created By: {value.username} </Links>
            </div>
          </div>
        );
      })}      
    </div>
  )
}

export default Home
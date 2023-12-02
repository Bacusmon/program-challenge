import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Profile() {
    let { id } = useParams();
    const [ username, setUsername ] = useState("");
    const [listOfTask, setListOfTask] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/users/basicinfo/${id}`)
            .then((response) => {
                setUsername(response.data.username);
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
            });
        
        axios
            .get(`http://localhost:3001/task/byuserId/${id}`)
            .then((response) => {
                setListOfTask(response.data);
            })
            .catch((error) => {
            console.error("Error fetching tasks:", error);
        });
        
    }, []);

    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                {" "}
                <h1> {username}'s Tasks</h1>
            </div>
            <div className='listofTask'>
            {listOfTask.map((value, key) => {
                return (
                <div key={value.id} className="task" onClick={() => { navigate(`/task/${value.id}`); }}>
                    <div className='title'> {value.title} </div>
                    <div className='description'> {value.description} </div>
                    <div className='datetime'>
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    }).format(new Date(value.dateTime))}
                    </div>
                </div>);
            })} 
            </div>
        </div>
    );
}

export default Profile
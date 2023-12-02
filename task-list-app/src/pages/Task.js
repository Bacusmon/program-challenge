import React, {useEffect, useState, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext";

function Task() {
  let { id } = useParams();
  const [taskObject, setTaskObject] = useState({});
  const { authState } = useContext(AuthContext);
  
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/task/byId/${id}`)
        .then((response) => {
          setTaskObject(response.data);
        })
        .catch((error) => {
        console.error("Error fetching tasks:", error);
        });
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/task/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
      console.error("Error deleting task:", error);
    });
  };

  return (
    <div className='taskPage'>
        <div className='task' id='individual'>
          <div className='title'>{taskObject.title}</div>
          <div className='description'>{taskObject.description}</div>
          <div className='datetime'>
            {`${formatDate(taskObject.dateTime)} ${formatTime(taskObject.dateTime)}`}
          </div>
          <div className="username">
            {authState.username === taskObject.username && (
              <button
                onClick={() => {
                  deleteTask(taskObject.id);
                }}
              >
                {" "}
                Delete Task
              </button>
            )}
          </div>
        </div>
    </div>
  );
}

export default Task
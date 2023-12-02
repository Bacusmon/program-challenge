import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";


function CreateTask() {
      const { authState } = useContext(AuthContext);
      const initialValues = {
        title: '',
        description: '',
        dateTime: '',
      };
  
      let navigate = useNavigate();
    
    useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
       navigate("/login");
    }
  }, []); 
  
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("This fieild is required"),
        description: Yup.string().required("This fieild is required"),
        dateTime: Yup.date().required("This fieild is required"),
    })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/task", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
        .then((response) => {
        navigate('/')
        })
        .catch((error) => {
        console.error("Error fetching tasks:", error);
        });
  };

  return (
    <div className="createTaskPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <h2>Create Task</h2>
          <label>Title</label>
          <ErrorMessage name='title' component="span" />
          <Field
            autoComplete= "off"
            id="inputCreateTitle"
            name="title"
            placeholder="(Ex. Task Name...)"
          />
          <label>Description</label>
          <ErrorMessage name='description' component="span" />
          <Field
            autoComplete= "off"
            id="inputCreateDescription"
            name="description"
            placeholder="(Ex. Notes or Description of task...)"
          />
          <label>Date and Time</label>
          <ErrorMessage name='dateTime' component="span" />
          <Field
            autoComplete= "off"
            type="datetime-local"
            id="inputCreateDateTime"
            name="dateTime"
            placeholder="(Ex. Date and Time...)"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateTask;

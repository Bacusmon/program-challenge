  import React from "react";
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  import logo from '../Logo.png';

  function Registration() {
    const initialValues = {
      email: "",
      username: "",
      password: "",
    };

    const validationSchema = Yup.object().shape({
      email: Yup.string().min(15).max(25).required(),
      username: Yup.string().min(3).max(15).required(),
      password: Yup.string().min(8).max(20).required(),
    });

    const onSubmit = (data) => {
      axios.post("http://localhost:3001/users", data).then(() => {
        console.log(data);
        window.location.replace('/login');
      });
    };

    return (
      <div className="registrationContainer">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <img src={logo} alt="Logo" className="logo-img" />
            <label>Email </label>
            <ErrorMessage name="email" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="email"
              placeholder="(Ex. John@gmail.com...)"
            />

            <label>Username </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. John123...)"
            />

            <label>Password </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="Your Password..."
            />

            <button type="submit"> Register</button>
          </Form>
        </Formik>
      </div>
    );
  }

  export default Registration;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Form = () => {
  const initValue = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [formValues, setFormValues] = useState(initValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      sessionStorage.setItem("name", formValues.username);
      navigate("/");
    }
  });

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

    if (!values.username) {
      errors.username = "Username is required.";
    } else if (values.username.length < 3) {
      errors.username = "Username must be more than 3 letters.";
    } else if (values.username.length > 10) {
      errors.username = "Username must be less than 10 letters.";
    }

    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!regex.test(values.email)) {
      errors.email =
      "Email is invalid.\n The correct email format is\n example123@gmail.com";
    }

    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 5 letters.";
    } else if (values.password.length > 10) {
      errors.password = "Password must be less than 10 letters.";
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = "Confirmation of Password is required.";
    } else if (values.repeatPassword.length < 5) {
      errors.repeatPassword = "Confirmed Password must be more than 5 letters.";
    } else if (values.repeatPassword.length > 10) {
      errors.repeatPassword =
        "Confirmed Password must be less than 10 letters.";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "The password confirmation does not match.";
    }

    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="form">
        <h1 id="createAcc">Create your Account ;)</h1>
        <div className="divider"></div>
        <div className="formFills">
          <h2 className="formDetails">Username</h2>
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={handleChange}
            value={formValues.username}
            className="input"
          ></input>
          <p className="error">{formErrors.username}</p>
          <h2 className="formDetails">Email</h2>
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={formValues.email}
            className="input"
          ></input>
          <p className="error">{formErrors.email}</p>
          <h2 className="formDetails">Password</h2>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
            className="input"
          ></input>
          <p className="error">{formErrors.password}</p>
          <h2 className="formDetails">Confirm Password</h2>
          <input
            placeholder="Repeat Password"
            type="password"
            name="repeatPassword"
            onChange={handleChange}
            value={formValues.repeatPassword}
            className="input"
          ></input>
          <p className="error">{formErrors.repeatPassword}</p>
        </div>

        <button className="buttons" id="submit" onClick={handleSubmit}>
          Create{" "}
        </button>
        <Link to={"/"}>
          <button className="buttons" id="back">
            Back to Books
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Form;

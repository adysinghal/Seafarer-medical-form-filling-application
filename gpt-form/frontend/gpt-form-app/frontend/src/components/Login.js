import React, { useState } from "react";
import { useNavigate } from "react-router";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  function gotoSignup(){
    navigate('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    console.log("Submitting:", { email, password }); // Debug log

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    const json = await response.json();
    console.log("Response:", json); // Debug log

    if (json.success) {
      // save authToken and redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3 container">
      <h2>Login to fill forms</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-1 form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="my-1 form-control"
            onChange={onChange}
            value={credentials.email}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="my-1 form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="my-1 form-control"
            onChange={onChange}
            value={credentials.password}
            id="password"
            name="password"
            aria-describedby="passwordHelp"
            placeholder="Enter password"
          />
        </div>

      <div className="d-flex">
        <button type="submit" className="my-1 btn btn-primary">
          Submit
        </button>
        <button onClick={gotoSignup} className="my-1 btn btn-primary mx-3">
          Sign-up
        </button>
      </div>
      </form>
    </div>
  );
}

export default Login;

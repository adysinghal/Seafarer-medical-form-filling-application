import React, { useState } from "react";
import { useNavigate } from "react-router";

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  function gotoLogin(){
    navigate('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    console.log('Submitting:', { name, email, password }); // Debug log

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/createuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log('Response:', json); // Debug log
    console.log("hello");
    console.log(process.env.JWT_SECRET);

    if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate("/");
        props.showAlert("Account created successfully", "success");
    } else {
        props.showAlert(json.error, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3 container">
      <h2>Sign-up to get access</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input type="name" className="form-control" name="name" id="name" placeholder="Enter name" onChange={onChange} required minLength={5} />
        </div>

        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name="email" id="email" placeholder="Enter email" onChange={onChange} required minLength={5} />
        </div>

        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" id="password" placeholder="Enter password" onChange={onChange} required minLength={5} />
        </div>

        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Enter password" onChange={onChange} required minLength={5} />
        </div>
        <div className="d-flex">
        <button type="submit" className="my-1 btn btn-primary">
          Submit
        </button>
        <button onClick={gotoLogin} className="my-1 btn btn-primary mx-3">
          Login
        </button>
      </div>
      </form>
    </div>
  );
}

export default Signup;

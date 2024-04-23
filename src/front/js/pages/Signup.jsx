import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context  } from "../store/appContext";

export const Singup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage ] = useState('');
    const { store, actions } = useContext(Context);

    const handleSignup = async() => {
        const dataToSend = {
            email: email,
            password: password
        };

        const url = process.env.BACKEND_URL + '/api/signup';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            console.log('Error:', response.status, response.statusText);
            setMessage('Error:' + response.statusText);
            return;
        };
        const data = await response.json()
        console.log(data)
        localStorage.setItem("token", data.access_token)
        await actions.handleLogin(dataToSend.email,dataToSend.password);

    };

    return (
      store.isLogin ? <Navigate to="/profile" /> :
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div>
                <h1 className="text-center">Sign Up</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                      value={email} onChange={(event) => setEmail(event.target.value)} />
                    <div id="emailHelp" className="form-text">Your email will be your User Name</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"
                      value={password} onChange={(event) => setPassword(event.target.value)} />
                  </div>
                  <button onClick={handleSignup} type="button" className="btn btn-primary">Sign Up</button>
                </form>
                 <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
      );

};


import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context)

    const hadleOnClick = async () => {
        const dataToSend = {
            email: email,
            password: password
        }

        const url = process.env.BACKEND_URL + '/api/login'
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            console.log('error: ', response.status, response.statusText);
            return
        }
        const data = await response.json();
        console.log(data);
        actions.login(data.results);
        localStorage.setItem('token', data.access_token)

    }



    return (
        store.isLogin ? <Navigate to='/dashboard' /> :
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div>
                            <h1 className="text-center">Log in</h1>
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
                                <button onClick={hadleOnClick} type="button" className="btn btn-primary">Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}


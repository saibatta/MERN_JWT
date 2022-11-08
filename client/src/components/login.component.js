import React, { useState, useEffect } from "react";
import { AlertNotification } from "../helper/notification.component";
import { login } from "../services/authentication.services";
const initialForm = {
    email: "",
    password: "",
};
const Login = () => {
    const [loginForm, setLoginForm] = useState(initialForm);
    const [message, setMessage] = useState("");
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        loginForm[name] = value;
        setLoginForm({ ...loginForm });
    };
    const onSignIn = (e) => {
        e.preventDefault();
        login(loginForm)
            .then((data) => {
                console.log("****Login Success***", data.data);
                console.log(data?.data?.token)
                localStorage.setItem('token', data?.data?.token);
               (data?.data?.message) ? setMessage(data.data.message) : window.location.assign("/movies");
            })
            .catch((error) => {
                console.log("****Login error***", error);
            });
    };
    return (
        <form>
            <h3>Sign In</h3>
            {message && (
                <AlertNotification
                    title=""
                    message={message}
                    time={2000}
                    onReset={() => {
                        setMessage("");
                    }}
                    type="alert"
                />
            )}
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={onSignIn}>
                    Submit
                </button>
            </div>
            <p className="forgot-password text-right">
                <a href="/sign-up">Signup</a>
            </p>
        </form>
    );
};

export default Login;

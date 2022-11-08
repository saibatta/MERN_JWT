import React, { useState } from "react";
import { AlertNotification } from "../helper/notification.component";
import { signup } from "../services/authentication.services";
const initialForm = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
};
const SignUp = () => {
    const [registrationForm, setRegistrationForm] = useState(initialForm);
    const [message, setMessage] = useState("");
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        registrationForm[name] = value;
        setRegistrationForm({ ...registrationForm });
    };
    const onSignup = (e) => {
        e.preventDefault();
        signup(registrationForm)
            .then((data) => {
                console.log("****Signup Success***", data.data);
                data?.data?.message && setMessage(data.data.message);
            })
            .catch((error) => {
                console.log("****Signup error***", error);
            });
    };
    return (
        <form>
            <h3>Sign Up</h3>
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
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="first_name"
                    value={registrationForm.first_name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label>Last name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="last_name"
                    value={registrationForm.last_name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={registrationForm.email}
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
                    value={registrationForm.password}
                    onChange={handleInputChange}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={onSignup}>
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>
    );
};
export default SignUp;

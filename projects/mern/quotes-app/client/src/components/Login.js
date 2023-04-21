import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from '../gqlOperations/mutations';

function Login() {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate();
    const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER, {
        onCompleted(data) {
            localStorage.setItem("token", data.user.token)
            navigate('/')
        }
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signinUser({
            variables: {
                userSigninn: formData
            }
        })
    }

    return (
        <div className="container my-container">
            <h5>Login!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    required
                />
                <Link to="/signup"><p>Dont have an account ?</p></Link>
                <button className="btn #673ab7 deep-purple" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_USER } from '../gqlOperations/mutations'
import { useMutation } from '@apollo/client'

export default function Signup() {
    const [formData, setFormData] = useState({})
    const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER);

    if (loading) return <h1>Loading</h1>

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signUpUser({
            variables: {
                newuser: formData
            }
        })
    }
    return (
        <div className="container my-container">
            {
                error &&
                <div className="red card-panel">{error.message}</div>
            }

            {
                data && data.user &&
                <div className="green card-panel">{data.user.firstName} is SignedUp. You can login now!</div>
            }
            <h5>Signup!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Link to="/login"><p>Already have an account ?</p></Link>
                <button className="btn #673ab7 deep-purple" type="submit">Submit</button>
            </form>
        </div>
    )
}

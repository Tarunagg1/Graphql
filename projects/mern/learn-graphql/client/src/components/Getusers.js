import React, { useEffect, useState } from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';
import { LOADS_USERS } from '../Graphql/Queries';
import { CREATE_USER_MUTATION } from '../Graphql/Mutations';


export default function Getusers() {
    const { err,loading, data } = useQuery(LOADS_USERS);
    const [ createUser,{error} ] = useMutation(CREATE_USER_MUTATION);

    const [datausers, setdata] = useState([]);
    const [userData, setuserData] = useState({
        name:"",
        age:"",
        married:""
    })

    useEffect(() => {
        if (data) {
            setdata(data.getAllUsers)
        }
    }, [data])

    const handelChange = (e)=>{
        setuserData({...userData,[e.target.name]:e.target.value})
    }


    const adduser = (e) => {
        e.preventDefault()
        console.log(userData);

        createUser({
            variables:{
                name:userData.name,
                age:parseInt(userData.age),
                married:userData.married === 'true' ? true : false
            }
        });

        if(error) {
            console.log(error);
        }
    }

    return (
        <div className="main">
            <ul>
                {
                    datausers && datausers.length > 0 && datausers.map((user, ind) => <li key={ind}>{user.name}</li>)
                }
            </ul>
            <form onSubmit={adduser}>
                <div>
                    <input type="text" name="name" id="name" onChange={handelChange} className="form-control" placeholder="Name" required="required" /><br /><br />
                    <input type="number" name="age" id="age" onChange={handelChange} className="form-control" placeholder="age" required="required" /><br /><br />
                    <input type="text" name="married" id="married" onChange={handelChange} className="form-control" placeholder="married" required="required" /><br /><br />
                </div>
                <button type="submit">submit</button>
            </form>


        </div>
    )
}

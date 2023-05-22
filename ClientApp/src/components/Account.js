import React, { useState } from 'react';
import './Account.css';


export default function Account()
{
    let [info, setInfo] = useState([]);
    async function getData(event)
    {
        event.preventDefault();
        if(event.target.className === "Login")
        {
            const response = await fetch(`login/${event.target[0].value}/${event.target[1].value}`)
            const data = await response.json()
            setInfo(data)
            if ("Everythings ok - Redirecting" === data[0])
            {
                sessionStorage.setItem("username", event.target[0].value)
                window.location.replace("/#/webbing");
            }
        }
        if(event.target.className === "Register")
        {
            const response = await fetch(`register/${event.target[0].value}/${event.target[1].value}/${event.target[2].value}`)
            const data = await response.json()
            console.log(data)
            setInfo(data)
        }
    }

    const topInfo = <h1 className='Info'>{info}</h1>

    return <>
    {info !== [] && topInfo}
    <div className='Account'>
        <form className='Login' onSubmit={getData}>
            <h1>Login</h1>
            <input placeholder='Username' name="username" required></input>
            <input placeholder='Password' name="password" type='password' required></input>
            <button>Login</button>
        </form>
        <form className='Register' onSubmit={getData}>
            <h1>Register</h1>
            <input placeholder='Username' name="username" required></input>
            <input placeholder='Password' name="password" type='password' required></input>
            <input placeholder='Email' name="email" type='email' required></input>
            <button>Register</button>
        </form>
    </div>
    </>
}
import React from "react";

export default function Head(props)
{



    return <>
    <div className="Head">
        <h1 style={{flex: 1}}>{props.name}</h1>
        <h2 onClick={()=>{
            sessionStorage.clear();
            window.location.replace("/");
        }}>Log out</h2>
    </div>
    </>
}
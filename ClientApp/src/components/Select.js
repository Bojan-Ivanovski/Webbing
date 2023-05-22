import React, { useEffect, useState } from "react";

function LoadPerson(props)
{
    return <> 
    <div className="Person-Selector" onClick={() => props.handleClick(props.name)}>
        <h1>{props.name}</h1>
    </div>
    </>
}

export default function Select(props)
{
    let [dialog, setDialog] = useState("")

    async function AddFriend()
    {
        const friendName = document.getElementById("SearchBar").value;
        if(friendName !== "")
        {
            const response = await fetch(`addfriends/${props.username}/${friendName}`)
            const data = await response.json()
            setDialog(data[0])
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>setDialog(""),1000);
        return () => clearTimeout(timer)
    },[dialog])


    const useFriends = props.friendsList.map((friend,index) => <LoadPerson key={index} name={friend} handleClick={props.handleClick}/>)
    return <>
    <div className="Left-Side">
        {
            dialog !== ""
            &&
            <div className="Dialog">
                <h1>{dialog}</h1>
            </div>
        }
        
        <div className="Search-Add">
            <input id="SearchBar" placeholder="Friends Name " ></input>
            <button onClick={AddFriend}>+</button>
        </div>
        <div className="Person-Container">
            {useFriends}
        </div>
    </div>
    </>
}
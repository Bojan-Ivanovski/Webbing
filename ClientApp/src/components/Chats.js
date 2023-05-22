import React from "react";

export default function Chats(props)
{   

    function handleKey(key, op)
    {
        if(op && key.keyCode === 13) props.send(key.target.value);
        if(!op && key.keyCode === 13) key.target.value="";
    }

    return <>      
        <div className="Chat" style={{display:"flex"}}>
            <div className="Chat-Top">
                <h3 style={{flex: 1}}>{props.name}</h3>
            </div>
            <div className="Chat-Container">
                {props.children}
            </div>
            <div className="Chat-Bottom">
                <textarea id="TextAreaID" placeholder="Message ..." onKeyDownCapture={(e) => handleKey(e,true)} onKeyUp={(e) => handleKey(e,false)}></textarea>
                <button onClick={() => props.send(document.getElementById("TextAreaID").value)}>Send</button>
            </div>
        </div>
    </>
}
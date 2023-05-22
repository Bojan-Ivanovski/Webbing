import React, { useState } from "react";

export default function Bubble(props)
{
    const style_1 = {
        backgroundColor:"rgb(141, 24, 24)",
        marginRight: "15px"
    }
    const style_2 = {
        backgroundColor:"rgb(27, 27, 27)",
        marginLeft: "15px"
    }
    return <>
    <div className="Chat-Middle" style={{alignItems: props.auth===1 ? "flex-end" : "baseline"}}>
        <p className="Chat-Bubble" style={props.auth===1 ? style_1 : style_2}>{props.text}</p>
    </div>
    </>
}


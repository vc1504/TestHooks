import React from "react";

export const Button = (props) =>{
    return(
        <button 
        type="button"
        className= {props.classname}
        onClick={props.onclick}>
        {props.label}
        </button>            
    );
}
import UI from "../assets/image.png";
import React from "react";


export const spellName = ()=>{
    return(
    <div className = "spell-name">
         <p>Spell Name: </p>
         <img className = "spellname" src = {UI} width = "250" height = "250" />
    </div>
    );
}
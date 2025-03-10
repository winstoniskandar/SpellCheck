
import "./main.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from "react"; 
import Slider from '@mui/material/Slider';
import {useState, useRef} from "react";
import IconButton from '@mui/material/IconButton';
import {readUI} from '../../editor/readUI';
import { featureFunction } from "../../editor/feature-function"
import { editFeature } from "../../editor/edit-feature"
import { spellName } from "../../editor/spell-name";
import { rankedResult } from "../../editor/ranked-result";
import {newspell} from "../../editor/newspell";
import {useRecoilState, useRecoilValue} from "recoil";
import { level, currentspellname, selected_feature, features } from "../../store";
import UI from "../../image.png";


//import { Bar as ProgressBar } from 'react-native-progress';
import ProgressBar from "../../editor/progress-bar.component";
import { levelbar } from "../../editor/levelbar";
import {getRandomInt} from "../../editor/getRandomInt";


export default function Main(){
    const sys_level = useRecoilValue(level);
    const [sn, setsn] = useRecoilState(currentspellname);
    const [fs, setfs] = useRecoilState(features);

    //used to init the game, only run in the begining
    useEffect(() => {
            newgame();
        },[]);
    

    const newgame = () => {
        let ns = newspell(); 
        setsn(ns);    

        // reset all of the features
        let newfs = ns.value;
        let tem = fs.map(item =>{
                   var iid = parseInt(item.id);
                   var nw = newfs[iid - 1];
               if(item.id == "4" && sys_level == 0){
                return {...item, value: nw, weight: 0, merlinweight: 0};
               }
               return {...item, value: nw, weight: 1, merlinweight: getRandomInt(5,16)*0.1};
              });

        // and reset the size of image icons of these features       
        for(var i = 1; i <= fs.length; i++){
            var img = document.getElementById("img"+(i).toString());
            if(img){
            img.style.width = (100).toString()+"px";
            img.style.height = img!.style.width;
            }
        }      
     
        setfs(tem);

    }

    const progressbar = () => {
        let progress = sys_level;
        let progress_percent = progress / 10;
        return progress_percent;
    }
    const testData = [
        
        { bgcolor: "#00695c", completed: progressbar() }
        
      ];

    return(
        <div className = "main">
            <div className = "control-panel">
                <Box sx={{m:1}}>
               <Button variant="contained" style={{backgroundColor: "#BF996B"}} onClick = {newgame} >Try a new spell</Button> 
               </Box>
               
                <div className="App">
                    {testData.map((item, idx) => (
                        <ProgressBar progress = {progressbar()}key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                    ))}
                </div>
            
            <div className = "current_level control-space">
               <img className = "level_img" src = {"../assets/Control_panel/Level-scroll_paper.png"} width = "200" height = "100" />
               <p className = "level_text">Level {sys_level+1}</p>
            </div>
           
            </div>

            <div className = "objective-function-panel">
                <div className = "left_ofp">
               <p>Objective function:</p>
               <br/>
                {featureFunction(sys_level)} 
               </div>

               <div className = "right_ofp">
               <p>Edit feature importance: </p>
               <br/>
                {editFeature()}
               </div>

            </div> 
            
            <div className = "generated-spells-panel">
            {spellName()}
            {rankedResult()}
            </div>       
        </div>
    )
}
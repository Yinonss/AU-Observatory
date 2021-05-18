import React from "react";
import Target from "./Target"
import targetStyle from "./TargetsBoard.css"
import axios from "axios";
/* This component define the plan's structure and display its targets. */

const server_url = 'http://localhost:5000/plan/add'

export default function TargetsBoard(props) {
    const deleteTarget = (id)=> {
        props.setTargets(props.allTargets.filter(item => item.id !== id))
    }

    return (
        <div className="TargetInfo">
            <table>
                <tbody>
                    <tr>
                        <td>Plan Name:</td>
                        <td><input type="text" id={"planName"}/></td>
                    </tr>
                </tbody>
            </table>
            <div className="list">
                {
                    props.allTargets.map(item => <Target id={item.id} key={item.id} name={item.name} deleteTarget={deleteTarget}/>)
                }
            </div>
            <br />
            <button id="submit" onClick={()=> {
                console.log(props.allTargets)
                axios.post(server_url, {  // save the plan into the DB
                    "title" : document.getElementById("planName").value,
                    "observation" : props.allTargets
                }).then(res => console.log(res))
            }
            }>Submit</button>
        </div>
    );
}
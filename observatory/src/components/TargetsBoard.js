import React from "react";
import Target from "./Target"
import targetStyle from "./TargetsBoard.css"
import axios from "axios";
/* This component define the plan's structure and display its targets. */

const server_url = 'http://localhost:5000/plan'

export default function TargetsBoard(props) {
    //TODO: Fix delete -> when [x] is clicked on one target everything is deleted.
    const deleteTarget = (id)=> {
        props.setTargets(props.allTargets.filter(item => item.targetId != id))
    }

    return (
        <div class="TargetInfo">
            <table>
                <tr>
                    <td>Plan Name:</td>
                    <td><input type="text" id={"title"}></input></td>
                </tr>
            </table>
            <div class="list">
                {
                    props.allTargets.map(item => <Target name={item.name} deleteTarget={deleteTarget} targetId={item.targetId}/>)
                }
            </div>
            <br />
            <button id="submit" onClick={()=> {
                console.log(props.allTargets)
                //enter title here
                axios.post(server_url, {
                    "title" : "plan1",
                    "observation" : props.allTargets
                }).then(res => console.log(res))
            }
            }>Submit</button>
        </div>
    );
}
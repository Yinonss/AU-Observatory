import React from "react";
import Target from "./Target"
import targetStyle from "./TargetsBoard.css"
import axios from "axios";
import ReactTooltip from "react-tooltip";


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
                    props.allTargets.map(item => <Target id={item.id}
                                                         key={item.id}
                                                         name={item.name}
                                                         ra={item.ra}
                                                         dec={item.dec}
                                                         filter={item.filter}
                                                         exposures={item.exposures}
                                                         exposureTime={item.exposureTime}
                                                         start={item.start}
                                                         end={item.end}
                                                         deleteTarget={deleteTarget}/>)
                }
            </div>
            <br />
                <table className={'planOptions'}>
                    <tr>
                        <td>Sets</td>
                        <td><input type={'text'} id={'sets'}/></td>
                    </tr>
                    <tr>
                        <td>Autofocus</td>
                        <td><input type={'text'} id={'autofocusPlan'} placeholder={'Seconds'}/></td>
                    </tr>
                    <tr>
                        <td>Always Solve</td>
                        <td><input type={'checkbox'} id={'alwaysSolve'}/></td>
                    </tr>
                    <tr>
                        <td>Limit Time</td>
                        <td><input type={'time'} id={'limitTime'}/></td>
                    </tr>
                    <td>
                        <tr>Quit Time</tr>
                        <td><input type={'datetime-local'} id={'quitTime'}/></td>
                    </td>
                    <tr>
                        <tr>Shutdown Time</tr>
                        <td><input type={'datetime-local'} id={'shutdownTime'}/></td>
                    </tr>
                    <td>
                        <tr>Shut Down When Finished</tr>
                        <td><input type={'checkbox'} id={'systemShutdown'}/></td>
                    </td>
                    <tr>
                        <td></td>
                    </tr>
                </table>
            <button className={"submit_button"} id="submit" onClick={()=> {
                console.log(props.allTargets)
                let sets = document.getElementById("sets").value
                let autofocusPlan = document.getElementById("autofocusPlan").value
                let alwaysSolve =document.getElementById("alwaysSolve").checked
                let limitTime = document.getElementById("limitTime").value
                let quitTime = document.getElementById("quitTime").value
                let shutdownTime = document.getElementById("shutdownTime").value
                let  systemShutdown = document.getElementById("systemShutdown").checked
                axios.post(server_url, {  // save the plan into the DB
                    "title" : document.getElementById("planName").value,
                    "sets" : document.getElementById("sets").value,
                     "autofocusPlan" : autofocusPlan,
                     "alwaysSolve": alwaysSolve,
                     "limitTime" : limitTime,
                      "quitTime": quitTime,
                      "shutdownTime" : shutdownTime,
                    "systemShutdown" : systemShutdown,
                    "observation" : props.allTargets
                }).then(res => console.log(res))
            }
            }>Submit</button>
        </div>
    );
}


import React, {useState} from "react";
import Target from "./Target"
import targetStyle from "./TargetsBoard.css"
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';
import ReactTooltip from "react-tooltip";
import {dark} from "@material-ui/core/styles/createPalette";
import BootButton from 'react-bootstrap/Button'
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'


/* This component define the plan's structure and display its targets. */

const server_url = 'http://localhost:5000/plan/add'

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#666666',
      color: '#ffff4d',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(16),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);


const AccordionStyle = withStyles({
    root: {
      border: '#37474f',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionDetailsStyle = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      backgroundColor: '#424242'
    },
  }))(MuiAccordionDetails);

  const AccordionSummaryStyle = withStyles({
root: {
backgroundColor: '#263238',
borderBottom: '1px solid rgba(0, 0, 0, .125)',
marginBottom: -1,
minHeight: 56,
'&$expanded': {
  minHeight: 56,
},
},
content: {
'&$expanded': {
  margin: '12px 0',
},
},
expanded: {},
})(MuiAccordionSummary);

export default function TargetsBoard(props) {
    const deleteTarget = (id)=> {
        props.setTargets(props.allTargets.filter(item => item.id !== id))
    }

    const addTarget = (target)=> {
        props.setTargets([...props.allTargets, target])
    }
    const [countDarks, setCountDarks] = useState(0);
    const [countBias, setCountBias] = useState(0);
    return (
        <div className="TargetInfo">
            <table>
                <tbody>
                    <tr>
                        <td>Plan Name:</td>
                        <td><input type="text" id={"planName"}/></td>
                    </tr>
                    <tr>
                        <td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Acquire a dark frame using the current target exposure interval.</p>
                                    <p>The input is the number for frame that would be take. If clicked without insert a number, the observatory will take one frame.</p>
                                    <p>(Optional)</p>
                                </React.Fragment>
                            }>
                            <button onClick={() => {
                            const darkFrames = document.getElementById('darks').value
                            const darkTargetName = darkFrames + ' Dark Frames'
                            setCountDarks(countDarks + 1)
                            const darkTarget = {
                                id: 'darks' + countDarks,
                                frameKind: 'DARK',
                                darkFrames: darkFrames,
                                name: darkTargetName
                            }
                            props.addTarget(darkTarget)
                        }
                        }>Dark</button>
                        </HtmlTooltip>
                        </td>
                    
                        <td><input type={'text'} id={'darks'} className={'dummyFrames'}/></td>
                    </tr>
                    <tr>
                    <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Acquire a bias frame using the current target exposure interval.</p>
                                    <p>The input is the number for frame that would be take. If clicked without insert a number, the observatory will take one frame.</p>
                                    <p>(Optional)</p>
                                </React.Fragment>
                            }>
                        <td><button onClick={() => {
                            const biasFrames = document.getElementById('biases').value
                            const biasTargetName = biasFrames + ' Bias Frams'
                            setCountBias(countBias + 1)
                            const biasTarget = {
                                id: 'bias' + countBias,
                                name: biasTargetName,
                                frameKind: 'BIAS',
                                biasFrames: biasFrames,
                            }
                            props.addTarget(biasTarget)
                        }
                        }>Bias</button></td></HtmlTooltip>
                        <td><input type={'text'} id={'biases'}  className={'dummyFrames'}/></td>
                        
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
                                                         isDummy={item.isDummy}
                                                         darkFrams={document.getElementById('darks')}
                                                         biasFrams={document.getElementById('biases')}
                                                         deleteTarget={deleteTarget}/>)
                }
            </div>
            <br />
            <AccordionStyle>
                <AccordionSummaryStyle>Plan Settings</AccordionSummaryStyle>
                <AccordionDetailsStyle>
                <table className={'planOptions'}>

                    <tr>
                        <td>Sets</td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Repeat the entire plan a given number of times.</p>
                                </React.Fragment>
                            }>
                        <td><input type={'text'} id={'sets'}/></td>
                        </HtmlTooltip>
                    </tr>
                    <tr>
                        <td>Autofocus</td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Turns on periodic autofocus and forces an autofocus at the start (or resumption) of the plan.</p>
                                    <p>The input is the interval duration in minutes.</p>
                                </React.Fragment>
                            }>
                        <td><input type={'text'} id={'autofocusPlan'} placeholder={'Minutes'}/></td>
                        </HtmlTooltip>
                    </tr>
                    <tr>
                        <td>Always Solve</td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Force solving image process for every image in the plan.</p>
                                </React.Fragment>
                            }>
                        <td><input type={'checkbox'} id={'alwaysSolve'}/></td>
                        </HtmlTooltip>
                    </tr>
                    <tr>
                        <td>Minimum Time</td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>The minimum amount of time that a set is allowed to take.</p>
                                </React.Fragment>
                            }>
                        <td><input type={'time'} id={'minTime'}/></td>
                        </HtmlTooltip>
                    </tr>
                    <tr>
                        <td>Limit Time</td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>???</p>
                                </React.Fragment>
                            }>
                        <td><input type={'time'} id={'limitTime'}/></td>
                        </HtmlTooltip>
                    </tr>
                    <tr>
                        <td>Quit Time</td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Set a quitting time at which the plan will stop acquiring images.</p>
                                </React.Fragment>
                            }>
                        <td><input type={'datetime-local'} id={'quitTime'}/></td>
                        </HtmlTooltip>
                    </tr>
                    <tr>
                        <td>Shutdown Time</td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Set a shutdown time at which the plan will stop acquiring images.</p>
                                    <p>If there is no imaging sessions left - the observatory will shut down Automatically.</p>
                                </React.Fragment>
                            }>
                        <td><input type={'datetime-local'} id={'shutdownTime'}/></td>
                        </HtmlTooltip>
                    </tr>
                    <tr>
                        <td>Shut Down When Finished</td>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Shut down the observatory at the enb of the plan.</p>
                                </React.Fragment>
                            }>
                        <td><input type={'checkbox'} id={'systemShutdown'}/></td>
                        </HtmlTooltip>
                    </tr>
                </table>
                </AccordionDetailsStyle>
                </AccordionStyle>
                <br/>
            <button className={"submit_button"} id="submit" onClick={()=> {
                console.log(props.allTargets)
                let sets = document.getElementById("sets").value
                let autofocusPlan = document.getElementById("autofocusPlan").value
                let alwaysSolve =document.getElementById("alwaysSolve").checked
                let minTime = document.getElementById("minTime").value
                let limitTime = document.getElementById("limitTime").value
                let quitTime = document.getElementById("quitTime").value
                let shutdownTime = document.getElementById("shutdownTime").value
                let  systemShutdown = document.getElementById("systemShutdown").checked
                axios.post(server_url, {  // save the plan into the DB
                    "title" : document.getElementById("planName").value,
                    "sets" : document.getElementById("sets").value,
                     "autofocusPlan" : autofocusPlan,
                     "alwaysSolve": alwaysSolve,
                     "minTime": minTime,
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


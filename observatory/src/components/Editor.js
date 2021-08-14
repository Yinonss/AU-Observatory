import React, {useState} from 'react';
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Tooltip from '@material-ui/core/Tooltip';
import editorStyle from '../Styles/Editor.css';
//import { Button, Grid } from '@material-ui/core';
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import {Button} from 'react-bootstrap';
const NUMBEROFFIELDS = 7;
const UNDEFINED = 'undefined';


/* This function returns a basic form for observation missions. */
export default function Editor(props) {


    const Accordion = withStyles({
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

      const AccordionDetails = withStyles((theme) => ({
        root: {
          padding: theme.spacing(2),
          backgroundColor: '#424242'
        },
      }))(MuiAccordionDetails);

      const AccordionSummary = withStyles({
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

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#666666',
      color: '#ffff4d',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(16),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);


    const [inputFields, setInputFields] = useState([
        {filter: '', exposures: '', exposureTime: '', bin: ''},
    ])

    React.useEffect(() => {
        console.log([...inputFields])
    }, [inputFields])

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields([...values]);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, {filter: '', exposures: '', exposureTime: '', bin: ''}])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];

        if (values.length > 1) {
            console.log([...values])
            // TODO: add alert that says the plan need to have at least one imaging session (rules engine).
            values.splice(index, 1);
            console.log(index)
            setInputFields([...values]);
            console.log([...values])
        }

    }
    const [count, setCount] = useState(0); // save the id number of the targets on the list
    return (
        <form>
            <table>
                <tbody>
                <tr>
                    <td>Target Name:</td>
                    <td><input type="text" id="name"/>
                    
                        <SearchIcon
                            onClick={() => {
                                const name = document.getElementById("name").value
                                axios.get(`http://simbad.u-strasbg.fr/simbad/sim-nameresolver?Ident=${name}&data=J,M(U,B,V),S,I&output=json`)
                                    .then(res => {
                                        const obj = res.data[0]
                                        document.getElementById("rightAscension").value = obj.ra
                                        document.getElementById("declination").value = obj.dec
                                    })
                            }}>Search Coordinates</SearchIcon>
                    </td>
                </tr>
                <tr>
                    <td>Right Ascension:</td>
                    <td><input type="text" id="rightAscension"/></td>
                </tr>
                <tr>
                    <td>Declination:</td>
                    <td><input type="text" id="declination"/></td>
                </tr>

                <tr>
                    <td>Start:</td>
                    <td><input type="date" id="start"/></td>
                </tr>
                <tr>
                    <td>End:</td>
                    <td><input type="date" id="end"/></td>
                </tr>
                <tr>
                    <td>Imaging Sessions:</td>
                    <td>
                        <Container>
                            <form>
                                {
                                    inputFields.map((inputField, index) => (
                                        <div key={index}>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <select name='filter' className='Filter' id='filter'
                                                                defaultValue="clear"
                                                                value={inputField.filter}
                                                                onChange={event => handleChangeInput(index, event)}>
                                                            <option value='clear'>Clear</option>
                                                            <option value='red'>Red</option>
                                                            <option value='green'>Green</option>
                                                            <option value='blue'>Blue</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type='text'
                                                            name='exposures'
                                                            id='exposures'
                                                            placeholder='Exposures'
                                                            className='exposures'
                                                            value={inputField.exposures}
                                                            onChange={event => handleChangeInput(index, event)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type='text'
                                                            name='exposureTime'
                                                            id='exposureTime'
                                                            className='exposureTime'
                                                            placeholder='Duration'
                                                            value={inputField.exposureTime}
                                                            onChange={event => handleChangeInput(index, event)}/>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type='text'
                                                            name='bin'
                                                            id='bin'
                                                            className='bin'
                                                            placeholder='Bin'
                                                            value={inputField.bin}
                                                            onChange={event => handleChangeInput(index, event)}/>
                                                    </td>
                                                    <td>
                                                        <RemoveIcon
                                                            onClick={() => handleRemoveFields(index)}> </RemoveIcon>
                                                    </td>
                                                    <td>
                                                        <AddIcon onClick={() => handleAddFields()}/>
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>

                                    ))
                                }</form>
                        </Container>
                    </td>
                </tr>
                <Accordion>
                    <AccordionSummary>Options</AccordionSummary>
                    <AccordionDetails>
                <div className={'targetOptions'} id={'targetOptions'}>
                    
                    <table >
                        <tr>
                            <td>Frame Friction</td>
                            <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <p>Sets the fraction of the chip to be used for subsequent images. Legal values are 0.1 to 1.0 (full frame). </p>
                                    <p id>For example, if the chip is 1K by 1K (1024 by 1024), a ratio of 0.5 will result in using the center 512 by 512 pixels of the chip.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id={'frameSize'}/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Rotator Degree</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Required if a rotator is connected. If a rotator is installed and connected, sets the position angle for subsequent images.</p>
                                    <p>The value of the position angle ranges from 0 up to but not including 360 degrees. 0 Degrees is pole-up, and the angle increases counterclockwise, that is, north toward east.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id={'rotatorDegree'}/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Dithering</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Offset each image in a repeat-set by some small amount away from the original target location.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id={'dithering'} placeholder={'Pixels'}/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Defocus</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Moves the focuser the given number of integer steps away from proper focus just before acquiring each subsequent image.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id={'defocus'}/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Track On</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Initiates orbital tracking of solar system bodies.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'checkbox'} id={'track'}/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Repeat</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>This option will take the given number of filter groups of the next target in a row.</p>
                                    <p> Limited to 3.</p>
                                </React.Fragment>
                            }>
                                <td><input type="text" id="repeat"></input></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Limit Sun Angle</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Pause during a specific set until the Sun gets below the given angle.</p>
                                    <p>If the set number is 0, it means that this would apply on all of the sets.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id="waituntilSet" placeholder={'Sets'}></input>
                                <input type={'text'} id="waituntilDeg" placeholder={'Degrees'}></input></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Limit Zenith</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Pause until the target is within the given zenith distance (deg) for up to the given time (min). If the target will never get within the given zenith distance, or won't get there within the time limit, it is skipped.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id="waitZenithDeg" placeholder={'Degrees'}></input>
                                <input type={'text'} id="waitZenithMin" placeholder={'Minutes'}></input></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Limit Air Mass</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Pause until the target is at or below the given air mass. If the target will never get within the given air mass, or won't Get there within the time limit, it is skipped.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id="waitairmassMass" placeholder={'Airmass'}></input>
                                <input type={'text'} id="waitairmassMin" placeholder={'Minutes'}></input></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Wait Limit</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>???</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id="waitlimit"></input></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Delay</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Pause for the given number of seconds before processing the next target.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'text'} id="waitfor" placeholder = "Seconds"></input></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Calibrate</td>
                        <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Forces calibration of the images for this target. This will not cause calibration of pointing exposures, only the final images.</p>
                                </React.Fragment>
                            }>
                            <td> <input type="checkbox" id="calibrate"/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Autoguide</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Forces the next target's images to be guided by the guiding camera.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'checkbox'} id="autoguide"/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Autofocus</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Automatically refocus the optical system before each filter group in the filter group for this target.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'checkbox'} id="autofocus"/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Do Not Solve</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Prevent final/data image plate solving for all of the images of the current target.</p>
                                </React.Fragment>
                            }>
                            <td><input type={'checkbox'} id="nosolve"/></td>
                            </HtmlTooltip>
                        </tr>
                        <tr>
                            <td>Scehdule Pointing</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Schedule a pointing update prior to the target.</p>
                                </React.Fragment>
                            }>
                            <input type={'radio'} id="pointing" name={'Point'} value={'pointing'}></input>
                            </HtmlTooltip>
                            <label htmlFor={'pointing'}>Yes</label>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>Prevent the pointing update prior to the target.</p>
                                </React.Fragment>
                            }>
                            <input type={'radio'} id="nopointing" name={'Point'} value={'nopointing'}></input>
                            </HtmlTooltip>
                            <label htmlFor={'noalign'}>No</label>
                        </tr>
                        <tr>
                            <td>Stack Images</td>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>This option will take the given number of filter groups of the next target in a row. Limited to 3.</p>
                                </React.Fragment>
                            }>
                            <input type={'radio'} id="align" name={'stackImages'} value={'align'}></input>
                            </HtmlTooltip>
                            <label htmlFor={'align'}>Align</label>
                            <HtmlTooltip title={
                                <React.Fragment>
                                    <p>This option will take the given number of filter groups of the next target in a row. Limited to 3.</p>
                                </React.Fragment>
                            }>
                            <input type={'radio'} id="noalign" name={'stackImages'} value={'noalign'}></input>
                            </HtmlTooltip>
                            <label htmlFor={'noalign'}>Without Align</label>

                        </tr>
                    </table>
                </div>
                </AccordionDetails>
                </Accordion>
                </tbody>
            </table>
            <button className={"add_button"} type="button" id="add_button" onClick={() => {
                //TODO change the way that we get the elements!

                let name = document.getElementById("name").value
                let rightAscension = document.getElementById("rightAscension").value
                let declination = document.getElementById("declination").value
                let exposures = inputFields.map(item => item.exposures)
                let exposureTime = inputFields.map(item => item.exposureTime)
                let filter = inputFields.map(item => item.filter)
                let bin = inputFields.map(item => item.bin)
                let start = document.getElementById("start").value
                let end = document.getElementById("end").value
                let planIsOK = validation(declination, rightAscension);
                let repeat = document.getElementById("repeat").value
                let waituntil = []
                waituntil[0] = document.getElementById('waituntilSet').value
                waituntil[1] = document.getElementById('waituntilDeg').value
                let zenith = []
                zenith[0] = document.getElementById('waitZenithDeg').value
                zenith[1] = document.getElementById('waitZenithMin').value
                let airmass = []
                airmass[0] = document.getElementById('waitairmassMass').value
                airmass[1] = document.getElementById('waitairmassMin').value
                let waitfor = document.getElementById('waitfor').value
                let calibrate = document.getElementById('calibrate').checked
                let autoguide = document.getElementById('autoguide').checked
                let autofocus = document.getElementById('autofocus').checked
                let nosolve = document.getElementById('nosolve').checked
                let pointing = document.getElementById('pointing').checked
                let nopointing = document.getElementById('nopointing').checked
                let align = document.getElementById('align').checked
                let noalign = document.getElementById('noalign').checked
                let waitlimit = document.getElementById('waitlimit').value
                let frameSize = document.getElementById('frameSize').value
                let rotatorDegree = document.getElementById('rotatorDegree').value
                let dithering = document.getElementById('dithering').value
                let track = document.getElementById('track').checked
                let defocus = document.getElementById('defocus').value

                setCount(count + 1)

                let target = {
                    id: count,
                    name: name,
                    ra: rightAscension,
                    dec: declination,
                    exposures: exposures,
                    exposureTime: exposureTime,
                    filter: filter,
                    bin: bin,
                    start: start,
                    end: end,
                    repeat: repeat,
                    calibrate: calibrate,
                    autoGuide: autoguide,
                    autoFocus: autofocus,
                    stack: noalign,
                    stackAlign: align,
                    pointing: pointing,
                    noPointing: nopointing,
                    noSolve: nosolve,
                    waitFor: waitfor,
                    _waitUntil: waituntil,
                    waitZenith: zenith,
                    waitAirMass: airmass,
                    waitLimits: waitlimit,
                    frameSize: frameSize,
                    rotatorDegree: rotatorDegree,
                    dithering: dithering,
                    track: track,
                    defocus: defocus
                }

                axios.post('http://localhost:5001/rules/1', { target: target})
                    .then(res => {
                        if (res.data.isValid) {
                            props.addTarget(target)
                        }
                        else {
                            setCount(count - 1)  // target not added so we need to lower his id
                            alert(res.data.reason)
                        }

                    }).catch(err => {
                        console.error(err)
                })
            }}><span>Add </span></button>
        </form>

    );
}

// Check if there is an empty field. If one found, do not approve it.
function validation(declination, rightAscension) {
    const inputFields = document.querySelectorAll("input");
    const validInputs = Array.from(inputFields).filter( input => input.value !== "");
    /* if (validInputs.length !== NUMBEROFFIELDS)
     {
         alert('Please fill in all of the fields')
         return false;
     }*/
    //TODO Make the next condition a rule
    if(declination === UNDEFINED || rightAscension === UNDEFINED)
    {
        alert('Target undefined - please search target again.');
        return false;
    }
    else
    {
        return true;
    }
}



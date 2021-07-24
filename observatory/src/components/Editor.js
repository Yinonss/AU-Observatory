import React, {useState} from 'react';
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import editorStyle from '../Styles/Editor.css';
const NUMBEROFFIELDS = 7;
const UNDEFINED = 'undefined';

/* This function returns a basic form for observation missions. */
export default function Editor(props) {


    const [inputFields, setInputFields] = useState([
        {filter : '', exposures: '', exposureTime: '', bin: ''},
    ])

    React.useEffect(() => {
        console.log([...inputFields])
    },[inputFields])

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        //console.log('index : ' + index)
        // console.log('event : ' + event.target.name)
        // console.log(values)

        values[index][event.target.name] = event.target.value;
        setInputFields([...values]);
        //console.log(values)
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, {filter : '', exposures: '', exposureTime: '', bin: ''}])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];

        if(values.length > 1) {
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
                    <td><input type="text" id="name"/></td>
                    <td>
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
                                                <select name = 'filter' className = 'Filter' id='filter' defaultValue="clear"
                                                        value = {inputField.filter}
                                                        onChange={event => handleChangeInput(index, event)}>
                                                    <option value='clear'>Clear</option>
                                                    <option value='red'>Red</option>
                                                    <option value='green'>Green</option>
                                                    <option value='blue'>Blue</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type = 'text'
                                                    name='exposures'
                                                    id = 'exposures'
                                                    placeholder='Exposures'
                                                    className = 'exposures'
                                                    value = {inputField.exposures}
                                                    onChange={event => handleChangeInput(index, event)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type = 'text'
                                                    name='exposureTime'
                                                    id = 'exposureTime'
                                                    className = 'exposureTime'
                                                    placeholder='Duration'
                                                    value = {inputField.exposureTime}
                                                    onChange={event => handleChangeInput(index, event)}/>
                                            </td>
                                            <td>
                                                <input
                                                    type = 'text'
                                                    name='bin'
                                                    id = 'bin'
                                                    className = 'bin'
                                                    placeholder='Bin'
                                                    value = {inputField.bin}
                                                    onChange={event => handleChangeInput(index, event)}/>
                                            </td>
                                            <td>
                                                <RemoveIcon onClick={() => handleRemoveFields(index)}>  </RemoveIcon>
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
                <div className={'targetOptions'} id={'targetOptions'}>
                    <table>
                                            <tr>
                                                <td>Frame Friction</td>
                                                <td><input type={'text'} id={'frameSize'}/></td>
                                            </tr>
                                            <tr>
                                                <td>Rotator Degree</td>
                                                <td><input type={'text'} id={'rotatorDegree'}/></td>
                                            </tr>
                                            <tr>
                                                <td>Dithering</td>
                                                <td><input type={'text'} id={'dithering'}/></td>
                                            </tr>
                                            <tr>
                                                <td>Defocus</td>
                                                <td><input type={'text'} id={'defocus'}/></td>
                                            </tr>
                                            <tr>
                                                <td>Track On</td>
                                                <td><input type={'checkbox'} id={'track'}/></td>
                                            </tr>


                                            <tr>
                                                <td>Repeat</td>
                                                <td><input type="text" id="repeat"></input></td>
                                            </tr>
                                            <tr>
                                                <td>Limit angle</td>
                                                <td><input type={'text'} id="waituntilSet" placeholder={'Sets'}></input>
                                                    <input type={'text'} id="waituntilDeg" placeholder={'Degrees'}></input></td>
                                            </tr>
                                            <tr>
                                                <td>Limit Zenith</td>
                                                <td><input type={'text'} id="waitZenithDeg" placeholder={'Degrees'}></input>
                                                    <input type={'text'} id="waitZenithMin" placeholder={'Minutes'}></input></td>
                                            </tr>
                                            <tr>
                                                <td>Limit Air Mass</td>
                                                <td><input type={'text'} id="waitairmassMass" placeholder={'Airmass'}></input>
                                                    <input type={'text'} id="waitairmassMin" placeholder={'Minutes'}></input></td>
                                            </tr>
                                            <tr>
                                                <td>Wait Limit</td>
                                                <td><input type={'text'} id="waitlimit"></input></td>
                                            </tr>
                                            <tr>
                                                <td>Wait For</td>
                                                <td><input type={'text'} id="waitfor"></input></td>
                                            </tr>

                                            <tr>

                                                <td>Calibrate <input type="checkbox" id="calibrate"/></td>
                                            </tr>
                                            <tr>
                                                <td>Autoguide</td>
                                                <td><input type={'checkbox'} id="autoguide"/></td>
                                            </tr>
                                            <tr>
                                                <td>Autofocus</td>
                                                <td><input type={'checkbox'} id="autofocus"/></td>
                                            </tr>
                                            <tr>
                                                <td>Do Not Solve</td>
                                                <td><input type={'checkbox'} id="nosolve"/></td>
                                            </tr>
                                            <tr>
                                                <td>Scehdule Pointing</td>
                                                <input type={'radio'} id="pointing" name={'Point'} value={'pointing'}></input>
                                                <label htmlFor={'pointing'}>Yes</label>
                                                <input type={'radio'} id="nopointing" name={'Point'} value={'nopointing'}></input>
                                                <label htmlFor={'noalign'}>No</label>
                                            </tr>
                                            <tr>
                                                <td>Stack Images</td>
                                                <input type={'radio'} id="align" name={'stackImages'} value={'align'}></input>
                                                <label htmlFor={'align'}>Align</label>
                                                <input type={'radio'} id="noalign" name={'stackImages'} value={'noalign'}></input>
                                                <label htmlFor={'noalign'}>Without Align</label>
                                            </tr>

                    </table>
                </div>

                </tbody>
            </table>
            <button className={"add_button"} type="button" id="add_button" onClick={()=>{
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
                let autofocus= document.getElementById('autofocus').checked
                let nosolve= document.getElementById('nosolve').checked
                let pointing =  document.getElementById('pointing').checked
                let nopointing =  document.getElementById('nopointing').checked
                let align =  document.getElementById('align').checked
                let noalign =  document.getElementById('noalign').checked
                let waitlimit = document.getElementById('waitlimit').value
                let frameSize = document.getElementById('frameSize').value
                let rotatorDegree = document.getElementById('rotatorDegree').value
                let dithering = document.getElementById('dithering').value
                let track = document.getElementById('track').checked
                let defocus = document.getElementById('defocus').value

                if(planIsOK)
                {
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

                    props.addTarget(target)
                }

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



import Style from './Style.css'
import React, {useState} from 'react';
import axios from "axios";
/* This function returns a basic form for observation missions. */
export default function Editor(props) {

    const [count, setCount] = useState(0); // save the id number of the targets on the list
    const [target, setTarget] = useState({})
    return (
            <form>
                <table>
                    <tr>
                        <td>Target Name:</td>
                        <td><input type="text" id="name"/></td>
                    </tr>
                    <button type="button" name="SimbadSearch" style={{ color: 'black' }}
                            onClick={() => {
                       const name = document.getElementById("name").value
                        axios.get(`http://simbad.u-strasbg.fr/simbad/sim-nameresolver?Ident=${name}&data=J,M(U,B,V),S,I&output=json`)
                            .then(res => {
                                const obj = res.data[0]
                                setTarget(obj)  // TODO what is that?
                                document.getElementById("rightAscension").value = obj.ra
                                document.getElementById("declination").value = obj.dec
                            })
                    }}>Simbad search</button>
                    <tr>
                        <td>Right Ascension:</td>
                        <td><input type="text" id="rightAscension" placeholder="DD:MM:SS.S"/></td>
                    </tr>
                    <tr>
                        <td>Declination:</td>
                        <td><input type="text" id="declination" placeholder="Decimal degrees"/></td>
                    </tr>
                    <tr>
                        <td>Exposures:</td>
                        <td><input type="text" id="exposures"/></td>
                    </tr>
                    <tr>
                        <td>Exposure Time:</td>
                        <td><input type="text" id="exposureTime"/></td>
                    </tr>
                    <tr>
                        <td>Filter:</td>
                        <td><select name="filter" id="filter">
                            <option value="clear">Clear</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </select></td>
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
                        <td>Priority:</td>
                        <td><select name="priority" id="priority">
                            <option value="1">1</option>
                            <option value="1">2</option>
                            <option value="1">3</option>
                            <option value="1">4</option>
                            <option value="1">5</option>
                        </select></td>
                    </tr>
                </table>
                <button type="button" id="add_button" onClick={()=>{
                    //TODO change the way that we get the elements!
                    const NUMBEROFFIELDS = 7;
                    let name = document.getElementById("name").value
                    let rightAscension = document.getElementById("rightAscension").value
                    let declination = document.getElementById("declination").value
                    let exposures = document.getElementById("exposures").value
                    let exposureTime = document.getElementById("exposureTime").value
                    let filter = document.getElementById("filter").value
                    let start = document.getElementById("start").value
                    let end = document.getElementById("end").value
                    let priority = document.getElementById("priority").value
                    // Check if there is an empty field. If one found, do not approve it.
                    const inputFeilds = document.querySelectorAll("input");
                    const validInputs = Array.from(inputFeilds).filter( input => input.value !== "");
                    if (validInputs.length != NUMBEROFFIELDS)
                    {
                        alert('Please fill in all of the fields')
                    }
                    else if(declination == 'undefined' || rightAscension == 'undefined')
                    {
                        alert('Target undefined - please search target again.');
                    }
                    else
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
                            start: start,
                            end: end,
                            priority: priority
                        }

                        props.addTarget(target)
                    }

                }}>Add</button>
            </form>
    );
}
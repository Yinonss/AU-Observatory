import React, {useState} from 'react';
import axios from "axios";

const NUMBEROFFIELDS = 7;
const UNDEFINED = 'undefined';

/* This function returns a basic form for observation missions. */
export default function Editor(props) {

    const [count, setCount] = useState(0); // save the id number of the targets on the list
    return (
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>Target Name:</td>
                            <td><input type="text" id="name"/></td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" name="SimbadSearch" style={{ color: 'black' }}
                                        onClick={() => {
                                   const name = document.getElementById("name").value
                                    axios.get(`http://simbad.u-strasbg.fr/simbad/sim-nameresolver?Ident=${name}&data=J,M(U,B,V),S,I&output=json`)
                                        .then(res => {
                                            const obj = res.data[0]
                                            document.getElementById("rightAscension").value = obj.ra
                                            document.getElementById("declination").value = obj.dec
                                        })
                                }}>Search Coordinates</button>
                            </td>
                        </tr>
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
                    </tbody>
                </table>
                <button type="button" id="add_button" onClick={()=>{
                    //TODO change the way that we get the elements!

                    let name = document.getElementById("name").value
                    let rightAscension = document.getElementById("rightAscension").value
                    let declination = document.getElementById("declination").value
                    let exposures = document.getElementById("exposures").value
                    let exposureTime = document.getElementById("exposureTime").value
                    let filter = document.getElementById("filter").value
                    let start = document.getElementById("start").value
                    let end = document.getElementById("end").value
                    let priority = document.getElementById("priority").value

                    let planIsOK = validation(declination, rightAscension);
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

// Check if there is an empty field. If one found, do not approve it.
function validation(declination, rightAscension) {
    const inputFeilds = document.querySelectorAll("input");
    const validInputs = Array.from(inputFeilds).filter( input => input.value !== "");
    if (validInputs.length !== NUMBEROFFIELDS)
    {
        alert('Please fill in all of the fields')
        return false;
    }
    else if(declination === 'undefined' || rightAscension === UNDEFINED)
    {
        alert('Target undefined - please search target again.');
        return false;
    }
    else
    {
        return true;
    }
}
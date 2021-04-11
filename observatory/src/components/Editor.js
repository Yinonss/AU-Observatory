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
                        <td><input type="text" id="name"></input></td>
                    </tr>
                    <button type={"button"} name={"searchTarget"} onClick={() => {
                       const name = document.getElementById("name").value
                        console.log(name)
                       fetch(`http://simbad.u-strasbg.fr/simbad/sim-nameresolver?Ident=${name}&data=J,M(U,B,V),S,I&output=json`).then(res => res.json)
                          .then(res => setTarget(res[0]))
                    }}/>
                    <tr>
                        <td>Right Ascension:</td>
                        <td><input type="text" id="rightAscension" placeholder="DD:MM:SS.S"></input></td>
                    </tr>
                    <tr>
                        <td>Declination:</td>
                        <td><input type="text" id="declination" placeholder="Decimal degrees"></input></td>
                    </tr>
                    <tr>
                        <td>Exposures:</td>
                        <td><input type="text" id="exposures"></input></td>
                    </tr>
                    <tr>
                        <td>Exposure Time:</td>
                        <td><input type="text" id="exposureTime"></input></td>
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
                        <td><input type="date" id="start"></input></td>
                    </tr>
                    <tr>
                        <td>End:</td>
                        <td><input type="date" id="end"></input></td>
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
                    let name = document.getElementById("name").value
                    // let rightAscension = document.getElementById("rightAscension").value
                    // let declination = document.getElementById("declination").value
                    // let exposures = document.getElementById("exposures").value
                    // let exposureTime = document.getElementById("exposureTime").value
                    // let filter = document.getElementById("filter").value
                    // let start = document.getElementById("start").value
                    // let end = document.getElementById("end").value
                    // let priority = document.getElementById("priority").value
                    //
                    // let target = {name: name, rightAscension: rightAscension, declination: declination,
                    //     exposures: exposures, exposureTime: exposureTime, filter: filter, start:start,
                    //     end: end, priority: priority}

                    if (name != "") {
                        let target2 = {name: name, targetId: count}
                        props.addTarget(target2)
                        setCount(count + 1)

                    }
                }}>Add</button>
            </form>
    );
}
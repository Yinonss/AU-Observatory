import React, {useState} from 'react';
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const NUMBEROFFIELDS = 7;
const UNDEFINED = 'undefined';

/* This function returns a basic form for observation missions. */
export default function Editor(props) {

    //let filter = []
    //let exposures = []
    //let exposureTime = []

    const [inputFields, setInputFields] = useState([
        {filter : '', exposures: '', exposureTime: ''},
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
        setInputFields([...inputFields, {filter : '', exposures: '', exposureTime: ''}])
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
                                            <td key={`${index} ${inputField.filter.value} ${inputField.exposureTime.value} ${inputField.exposures.value}`}>
                                                <select name = 'filter' className = 'Filter' id='filter'
                                                        value = {inputField.filter}
                                                        key={`${index} filter`}
                                                        onChange={event => handleChangeInput(index, event)}>
                                                    <option value='clear'>Clear</option>
                                                    <option value='red'>Red</option>
                                                    <option value='green'>Green</option>
                                                    <option value='blue'>Blue</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    key={`${index} exposures`}
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
                                                    key={`${index} exposureTime`}
                                                    type = 'text'
                                                    name='exposureTime'
                                                    id = 'exposureTime'
                                                    className = 'exposureTime'
                                                    placeholder='Duration'
                                                    value = {inputField.exposureTime}
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
                        }
                    </form>
                </Container>
                    </td>
                </tr>
                <tr>
                    <td>Start:</td>
                    <td><input type="date" id="start"/></td>
                </tr>
                <tr>
                    <td>End:</td>
                    <td><input type="date" id="end"/></td>
                </tr>
                </tbody>
            </table>
            <button type="button" id="add_button" onClick={()=>{
                //TODO change the way that we get the elements!

                let name = document.getElementById("name").value
                let rightAscension = document.getElementById("rightAscension").value
                let declination = document.getElementById("declination").value
                let exposures = inputFields.map(item => item.exposures) //document.getElementsByName("exposures")
                let exposureTime = inputFields.map(item => item.exposureTime) //document.getElementsByName("exposureTime")
                let filter = inputFields.map(item => item.filter) //document.getElementsByName("filter").value
                let start = document.getElementById("start").value
                let end = document.getElementById("end").value


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
    /* if (validInputs.length !== NUMBEROFFIELDS)
     {
         alert('Please fill in all of the fields')
         return false;
     }*/
    if(declination === 'undefined' || rightAscension === UNDEFINED)
    {
        alert('Target undefined - please search target again.');
        return false;
    }
    else
    {
        return true;
    }
}


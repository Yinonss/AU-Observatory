import React from "react";
import Style from './Style.css'

/* This function returns a basic form for observation missions. */
export default function () {
    return (
            <form>
                <table>
                    <tr>
                        <td>Target Name:</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>Right Ascension:</td>
                        <td><input type="text" placeholder="DD:MM:SS.S"></input></td>
                    </tr>
                    <tr>
                        <td>Declination:</td>
                        <td><input type="text" placeholder="Decimal degrees"></input></td>
                    </tr>
                    <tr>
                        <td>Exposures:</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>Exposure Time:</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>Filter:</td>
                        <td><select name="filter">
                            <option value="clear">Clear</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td>Start:</td>
                        <td><input type="date"></input></td>
                    </tr>
                    <tr>
                        <td>End:</td>
                        <td><input type="date"></input></td>
                    </tr>
                    <tr>
                        <td>Priority:</td>
                        <td><select name="priority">
                            <option value="1">1</option>
                            <option value="1">2</option>
                            <option value="1">3</option>
                            <option value="1">4</option>
                            <option value="1">5</option>
                        </select></td>
                    </tr>
                </table>
                <button id="add_button">Add</button>
            </form>
    );
}
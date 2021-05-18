import React from "react";
import NavMenu from "./NavMenu";
/* This function returns the upper page which includes title and menu. */

export default function Base() {
    return (
        <div className="UpperPage">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h2>Ariel University</h2>
                            <h1>Observatory</h1>
                        </td>
                        <td>
                            <NavMenu />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
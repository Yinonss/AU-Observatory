import React from "react"
import targetStye from "./Target.css"
import ReactTooltip from 'react-tooltip';

export default function Target(props) {

    return (
        <div>
            <div className="target" data-tip data-for="targetDetails">

                     <button className={"close-button"} aria-label="Close alert" type={"button"} data-close
                            onClick={() => {
                                props.deleteTarget(props.id)
                            }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5>{props.name}</h5>
            </div>
            <ReactTooltip id="targetDetails" place="right" props={props}>
                <div>
                    <table>
                        <tr>
                            <td>Name :</td>
                            <td>{props.name}</td>
                        </tr>
                        <tr>
                            <td>RA : </td>
                            <td>{props.ra}</td>
                        </tr>
                        <tr>
                            <td>Dec : </td>
                            <td>{props.dec}</td>
                        </tr>
                        <tr>
                            <td>Filter : </td>
                            <td>{props.filter}</td>
                        </tr>
                        <tr>
                            <td>Exposures : </td>
                            <td>{props.exposures}</td>
                        </tr>
                        <tr>
                            <td>Duration : </td>
                            <td>{props.exposureTime}</td>
                        </tr>
                        <tr>
                            <td>Start : </td>
                            <td>{props.start}</td>
                        </tr>
                        <tr>
                            <td>End : </td>
                            <td>{props.end}</td>
                        </tr>
                    </table>
                </div>
            </ReactTooltip>
        </div>
    )
}
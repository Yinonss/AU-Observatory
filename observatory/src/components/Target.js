import React from "react"
import targetStye from "./Target.css"
import ReactTooltip from 'react-tooltip';

export default function Target(props) {

    console.log('target : ' + props);

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
        </div>
    )
}
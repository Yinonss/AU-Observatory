import React from "react"
import targetStye from "./Target.css"
export default function Target(props) {

    return (
        <div className="target" data-closable>
            <button className={"close-button"} aria-label="Close alert" type={"button"} data-close
                    onClick={() => {
                        props.deleteTarget(props.targetId)
                    }}>
                <span aria-hidden="true">&times;</span>
            </button>
                <h5>{props.name}</h5>
        </div>
    )
}
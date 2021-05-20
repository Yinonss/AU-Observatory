import React from "react";
import Style from './Style.css'
import ReactTooltip from "react-tooltip";
import PlanList from "../Styles/PlanItem.css"

const formatDate = (dateString) => {  // function to handle the creation date we get from the plan
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

function planTool(plan) {
    let targets = "tagets: "
    plan.observations.forEach((plan) => {
        targets += plan.name + " "
    })
    console.log(targets)
    return (<div>
                <h3>{plan.title}</h3>
                <p>{targets}</p>
            </div>)
}

function plan(props) {
// planTool(props.plan)
    return (
        <li>
            <div className={"plan_item"}>
                <h3 className={"title"}>
                    {props.plan.title}
                </h3>
                <h5 className={"date"}>
                    {formatDate(props.plan.created_at)}
                </h5>
            </div>
        </li>
    )
}

export default plan

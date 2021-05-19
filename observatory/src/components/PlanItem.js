import React from "react";
import Style from './Style.css'
import ReactTooltip from "react-tooltip";


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
        <tr data-for={props.plan._id} data-tip={'tool'}>
            <td>{props.plan.title}</td>
            <td>
                <ReactTooltip id={props.plan._id} border={true}
                              getContent={(dataTip) => planTool(props.plan)}/>
            </td>
            <td>{formatDate(props.plan.created_at)}</td>
        </tr>
    )
}

export default plan

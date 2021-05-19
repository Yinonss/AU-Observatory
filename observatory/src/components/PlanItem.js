import React from "react";
import Style from './Style.css'

const formatDate = (dateString) => {  // function to handle the creation date we get from the plan
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

function plan(props) {
    return (
        <tr>
            <td>{props.title}</td>
            <td></td>
            <td>{formatDate(props.plan.created_at)}</td>
        </tr>
    )
}

export default plan
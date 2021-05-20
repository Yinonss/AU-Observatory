import React, {Component} from "react";
import axios from "axios";
import PlanItem from "./PlanItem";
import PlanList from "./../Styles/PlanList.css"

export default class planList extends Component {
    constructor(props) {
        super(props);
        this.deletePlan = this.deletePlan.bind(this)
        this.state = {
            plans: [],
            loading: false,
        }
    }

    componentDidMount() {  // get all the info from the data base
        this.setState({loading: true})
        axios.get('http://localhost:5000/plan')
            .then(res => {
                this.setState({plans: res.data, loading: false})
            })
            .catch(err => console.log(err))
    }

    deletePlan(id) {
        axios.delete('http://localhost:5000/plan/' + id)
            .then(res => {
                console.log(res.data)
                this.setState({plans: this.state.plans.filter(el => el._id !== id)})
            })
    }

    showList() {  // Function that show the plan list
        if (this.state.loading) {
            return "Loading..."
        }
        else {
            return this.state.plans.map(plan => {
                return <PlanItem key={plan._id} plan={plan} deletePlan={this.deletePlan}/>
            })
        }
    }


    render() {
       return(
            <div className='container'>
                <ul>
                    <li>
                        {this.showList()}
                    </li>
                </ul>
                {/*<table id={'plansDisplay'}>*/}
                {/*    <tbody>*/}
                {/*        <tr>*/}
                {/*            <th>Plan</th>*/}
                {/*            <th>Status</th>*/}
                {/*            <th>Create On</th>*/}
                {/*        </tr>*/}
                {/*        {this.showList()}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
        );
    }
}
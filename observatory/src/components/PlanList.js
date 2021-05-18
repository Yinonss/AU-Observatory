import React, {Component} from "react";
import axios from "axios";
import Style from './Style.css'


const Plan = props => (  // Help us to show each plan in the table
     <tr>
         <td>{props.plan.title}</td>
         <td></td>
         <td>{formatDate(props.plan.created_at)}</td>
     </tr>
)

const formatDate = (dateString) => {  // function to handle the creation date we get from the plan
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}


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
                return <Plan plan={plan} deletePlan={this.deletePlan} id={plan._id}/>
            })
        }
    }


    render() {
       return(
            <div className='container'>
                <table id={'plansDisplay'}>
                    <tbody>
                        <tr>
                            <th>Plan</th>
                            <th>Status</th>
                            <th>Create On</th>
                        </tr>
                        {this.showList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
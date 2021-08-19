import React, {Component, useState} from "react";
import axios from "axios";
import PlanItem from "./PlanItem";
import Modal from "react-modal";
import "../Styles/PlanList.css"


Modal.setAppElement('#root')

export default class planList extends Component {
    constructor(props) {
        super(props);
        this.deletePlan = this.deletePlan.bind(this)
        this.state = {
            plans: [],
            loading: false,
            modalState: false,
            planModal: undefined
        }
    }

    componentDidMount() {  // Get all the plans from the data base
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

    render() {

        const formatDate = (dateString) => {  // Function to handle the creation date we get from the plan
            const options = { year: "numeric", month: "numeric", day: "numeric" }
            return new Date(dateString).toLocaleDateString(undefined, options)
        }

        const toggleModalShow = () => {
            this.setState({modalState: !this.state.modalState})
        }

        const  modalInfo = () => {
            return (
                <div className="planModal">
                    <Modal className="Modal" overlayClassName="Overlay" isOpen={this.state.modalState}>
                        <h1>{this.state.planModal.title}</h1>
                        <h2>Targets:</h2>
                        <table className="modalTable">
                            <tr>
                                <th className="modalTh">
                                    <h3>Target Name</h3>
                                </th>
                                <th className="modalTh">
                                    <h3>Start Date</h3>
                                </th>
                                <th className="modalTh">
                                    <h3>End Date</h3>
                                </th>
                                <th className="modalTh">
                                    <h3>Exposures</h3>
                                </th>
                                <th className="modalTh">
                                    <h3>Filter</h3>
                                </th>

                            </tr>
                            {this.state.planModal.observations.map(target => {
                                return (
                                    <tr>
                                        <td className="modalTd">
                                            {target.name}
                                        </td>
                                        <td className="modalTd">
                                            {formatDate(target.start)}
                                        </td>
                                        <td className="modalTd">
                                            {formatDate(target.end)}
                                        </td>
                                        <td className="modalTd">
                                            {target.exposures}
                                        </td>
                                        <td className="modalTd">
                                            {target.filter}
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                        <div className="closeModal">
                            <button onClick={toggleModalShow}>close</button>
                        </div>
                    </Modal>
                </div>
            )
        }

        const setModal = (plan) => {
            this.setState({planModal: plan})
        }

         const handleClickPlan = (plan) => {
            setModal(plan)
            toggleModalShow()
        }

        const showList = () => {  // Function that show the plan list
            if (this.state.loading) {
                return "Loading..."
            }
            else {
                return this.state.plans.map(plan => {
                    return(
                        <PlanItem key={plan._id} plan={plan} deletePlan={this.deletePlan} clickHandle={handleClickPlan}/>
                    )
                })
            }
        }

       return(
            <div className='container'>
                <ul>
                    {showList()}
                </ul>
                {this.state.modalState ? modalInfo() : null}
            </div>
        );
    }
}

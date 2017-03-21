/**
 * Created by carlosriveros on 2017-03-13.
 */
import React, {Component} from 'react'
import {Input, Button as MuiButton, Divider, Container, Row, Col} from 'muicss/react';
import {genericHttpCall} from '../http.util'

class EmployeeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newEmployee : {
                name: 'enter name',
                id: null
            },
            selectedEmployee: null,
            newName: '',
            employees: []
        }

    }


    componentDidMount() {

        genericHttpCall('employees/')
            .then(response => {
                return response.json()
            })
            .then(res => {
                this.setState({employees: res});
            }).catch(function(err) {
            console.log('err', err)
        })

    }

    updateEmployee() {
        genericHttpCall('employees/update?id='+ this.state.newEmployee.id + '&name=' + this.state.newEmployee.name).then(response => {
            return response.json()
        }).then(res => {
            this.setState({employees: res, selectedEmployee: null});
        }).catch(function(err) {
            console.log('err', err)
        });
    }

    addNewEmployee(name) {

        if(!name) {
            return;
        }

        genericHttpCall('employees/add?name=' + name).then(response => {
            return response.json()
        }).then(res => {
            let newEmployeeList = this.state.employees;
            newEmployeeList.push({name: res.name, id: res.id})
            console.log('newEmployeeList', newEmployeeList)
            this.setState({employees: newEmployeeList});
        }).catch(function(err) {
            console.log('err', err)
        });
    }

    deleteEmployee() {

        genericHttpCall('employees/delete?employeeId=' + this.state.selectedEmployee.id).then(response => {
            return response.json()
        }).then(res => {
            console.log('res', res)

            this.setState({employees: res, selectedEmployee: null});
        }).catch(function(err) {
            console.log('err', err)
        });
    }


    render() {

        const styles = {
            row: {
                backgroundColor: '#E3F2FD',
                borderBottom: "1px solid #BBDEFB",

            },
            rowItem:{
                borderLeft: "1px solid #BBDEFB"
            },
            input: {
                color: 'blue',
                width: '200px'
            }
        }


        const employeeList = this.state.employees.map(employee => {


            let assignedReviews = [];

            if(employee.assignedReviews) {
                assignedReviews = employee.assignedReviews.map(review => review.id)
            }

            let reviewId = employee.review_id || "No Review";

            return (<Row key={employee.id} style={styles.row} onClick={() => {
                this.setState({selectedEmployee: {
                    id: employee.id,
                    name: employee.name,
                    review_id: employee.review_id
                }})
            }}>
                <Col style={styles.rowItem} md="4">{employee.name}</Col>
                <Col style={styles.rowItem} md="4">{assignedReviews.toString() || "Not assigned yet"}</Col>
                <Col style={styles.rowItem} md="4">{reviewId}</Col>
            </Row>)
        })

        let currentView = null;

        if(this.state.selectedEmployee) {
            currentView = (

                <div>
                    <a  onClick={()=> {
                        this.setState({selectedEmployee: null})
                    }}> &lt; Return to Employee List</a>

                    <h2>Updating employee: {this.state.selectedEmployee.name}</h2>


                    <Input style={styles.input} hint="Enter new name"  onChange={(e) => {
                        if(e.target.value) {
                            this.setState({newEmployee: { name: e.target.value,
                            id: this.state.selectedEmployee.id}});
                        }
                    }}/>
                    <MuiButton color="primary" onClick={() => this.updateEmployee()}>update employee</MuiButton>
                    <MuiButton color="primary" onClick={() => this.deleteEmployee()}>delete employee</MuiButton>

                </div>
            )
        } else {
            currentView = (<div>

                <Input style={styles.input} hint="Employee Name" onKeyPress={
                    (e) => {
                        if(e.key == 'Enter') {
                            this.addNewEmployee(this.state.employeeName)
                        }
                    }
                } onChange={(e) => this.state.employeeName = e.target.value}/>
                <MuiButton color="primary" onClick={() => this.addNewEmployee(this.state.employeeName)}>add new employee</MuiButton>

                <p className="mui--text-dark" style={{margin: "20px 0"}}>Click on an employee to view it or edit it.</p>

                <div className="a-class">
                    <Container fluid={true}>
                        <Row  style={Object.assign({},styles.row, {height: '40px'})}>
                        <Col style={Object.assign({},styles.rowItem, {height: '40px'})} md="4">Name</Col>
                        <Col style={Object.assign({},styles.rowItem, {height: '40px'})} md="4">Assigned Reviews</Col>
                        <Col  style={Object.assign({},styles.rowItem, {height: '40px'})} md="4">Review Id</Col>
                        </Row>
                        {employeeList}
                    </Container>

                </div>

            </div>)
        }

        return currentView;
    }
}

export default EmployeeList;
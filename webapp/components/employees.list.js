/**
 * Created by carlosriveros on 2017-04-02.
 */
import React, {Component, PropTypes} from 'react'
import {Input, Button as MuiButton, Container, Row, Col} from 'muicss/react';
import {Link} from 'react-router'


class Employees extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedEmployee: null,
            employees: [],
            employeeName: null
        }
    }

    componentDidMount() {
        const {initializeEmployeesStore} = this.props;
        initializeEmployeesStore();
    }

    addNewEmployee(name) {
        if(!name) {
            return;
        }
        this.props.addEmployee(name)
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

        const employeeList = this.props.employees.map(employee => {

            let assignedReviews = [];

            if(employee.assignedReviews) {
                assignedReviews = employee.assignedReviews.map(review => review.id)
            }

            let reviewId = employee.review_id || "No Review";

            return (
                <Link key={employee.id} to={{
                    pathname: '/employees/' + employee.id
                }}>
                <Row  style={styles.row} onClick={() => {
                this.props.selectEmployee({
                    id: employee.id,
                    name: employee.name,
                    review_id: employee.review_id
                })
            }}>
                <Col style={styles.rowItem} md="4">{employee.name}</Col>
                <Col style={styles.rowItem} md="4">{assignedReviews.toString() || "Not assigned yet"}</Col>
                <Col style={styles.rowItem} md="4">{reviewId}</Col>
                </Row>
                </Link>
            )
        })

        return (<div>

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
}

Employees.PropTypes = {
   addEmployee: React.PropTypes.func,
    initializeEmployeesStore: React.PropTypes.func,
    selectEmployee: React.PropTypes.func,
    employees: React.PropTypes.array
}

export default Employees;
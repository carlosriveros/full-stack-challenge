/**
 * Created by carlosriveros on 2017-04-02.
 */


import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Input, Button as MuiButton} from 'muicss/react';




class EmployeeEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newEmployee : {
                name: 'enter name',
                id: null
            }
        }

    }


    updateEmployee() {
        this.props.updateEmployee(this.state.newEmployee)
    }

    deleteEmployee() {
        this.props.deleteEmployee(this.state.selectedEmployee.id)
    }

    render() {

        const styles = {
            input: {
                color: 'blue',
                width: '200px'
            }
        }

       return ( <div>
           <Link to="/" >Return To Employee List </Link>

            <h2>Updating employee: {this.props.employee.name}</h2>


            <Input style={styles.input} hint="Enter new name"  onChange={(e) => {
                if(e.target.value) {
                    this.setState({newEmployee: { name: e.target.value,
                        id: this.props.employee.id}});
                }
            }}/>
            <MuiButton color="primary" onClick={() => this.updateEmployee()}>update employee</MuiButton>
            <MuiButton color="primary" onClick={() => this.deleteEmployee()}>delete employee</MuiButton>

        </div> )

    }

}

EmployeeEditor.PropTypes = {
    deleteEmployee: React.PropTypes.func,
    updateEmployee: React.PropTypes.func,
    initializeEmployeesStore: React.PropTypes.func,
    employee: React.PropTypes.object,
    employees: React.PropTypes.array
}

export default EmployeeEditor;
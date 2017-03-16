/**
 * Created by carlosriveros on 2017-03-13.
 */
import React, {Component} from 'react'

class EmployeeList extends Component {
    constructor(props) {
        super(props);

        this.state={
            employees:[
                {id: 1, name: 'carlos'},
                {id: 2, name: 'carlos'},
                {id: 3, name: 'carlos'}] //props.employees
        }

    }

    componentWillReceiveProps(nextProps) {

       // this.setState({employees: nextProps.employees});

    }

    render() {

        const styles = {
            list: {
                'list-style': 'none'
            },
            listItem: {
                display: 'inline',
                margin: '10px 50px'
            }
        }

        const employeeList = this.state.employees.map(employee => {

            return (<div key={employee.id}>{employee.name}</div>)
        })

        return <div>

            <div className="a-class">
               {employeeList}
            </div>
        </div>
    }
}

export default EmployeeList;
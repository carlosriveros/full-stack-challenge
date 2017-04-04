/**
 * Created by carlosriveros on 2017-03-16.
 */
import { connect } from 'react-redux'
import EmployeeList from '../components/employees.list'
import { initializeEmployees, addEmployee, selectEmployee } from '../actions/employee.actions'




const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initializeEmployeesStore: () => {
            dispatch(initializeEmployees())
        },
        addEmployee: (name) => {
            dispatch(addEmployee(name))
        },
        selectEmployee: (employee) => {
        dispatch(selectEmployee(employee))
    }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeList);
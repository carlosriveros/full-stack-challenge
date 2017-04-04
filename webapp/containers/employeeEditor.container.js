/**
 * Created by carlosriveros on 2017-03-16.
 */
import { connect } from 'react-redux'
import EmployeeEditor from '../components/employee.editor'
import { initializeEmployees, deleteEmployee, updateEmployee } from '../actions/employee.actions'




const mapStateToProps = (state) => {

    return {
        employees: state.employees,
        employee: state.employee
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initializeEmployeesStore: () => {

            dispatch(initializeEmployees())
        },
        deleteEmployee: (name) => {
            dispatch(deleteEmployee(name))
        },
        updateEmployee: employee => {
            dispatch(updateEmployee(employee))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeEditor);
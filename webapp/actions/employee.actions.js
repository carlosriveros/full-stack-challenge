import {genericHttpCall} from '../http.util'


const initializeEmployeesComplete =  employees => ({
    type: 'INITIALIZE_STORE',
    employees
})

export const initializeEmployees = () => ((dispatch) => (

    genericHttpCall('employees/')
        .then(response => {
            return response.json()
        })
        .then((responses) => {
                dispatch(initializeEmployeesComplete(responses))
            }
        )
));


const addEmployeeComplete = employee => ({
    type: 'ADD_EMPLOYEE',
    employee
})

export const addEmployee = (name) => ((dispatch) => (
    genericHttpCall('employees/add?name=' + name)
        .then(response => {
            return response.json()
        })
        .then((responses) => {
                dispatch(addEmployeeComplete(responses))
            }
        )
));

const deleteEmployeeComplete = employee => ({
    type: 'DELETE_EMPLOYEE',
    employee
})

export const deleteEmployee = (id) => ((dispatch) => (
    genericHttpCall('employees/delete?employeeId=' + id)
        .then(response => {
            return response.json()
        })
        .then((responses) => {
                dispatch(deleteEmployeeComplete(responses))
            }
        )
));

const selectEmployeeComplete = employee => ({
    type: 'SELECT_EMPLOYEE',
    employee
})

export const selectEmployee = (employee) => ((dispatch) => (

    dispatch(selectEmployeeComplete(employee))

));

const updateEmployeeComplete = employee => ({
    type: 'UPDATE_EMPLOYEE',
    employee
})

export const updateEmployee = (employee) => ((dispatch) => (
    genericHttpCall('employees/update?id='+ employee.id + '&name=' + employee.name)
        .then(response => {
            return response.json()
        })
        .then((responses) => {
                dispatch(updateEmployeeComplete(responses))
            }
        )
));



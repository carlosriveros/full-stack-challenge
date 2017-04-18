

const initialState =  []

export default function employees(state = initialState, action) {

    switch(action.type) {
        case 'ADD_EMPLOYEE':
            return [
                ...state,
                {
                    id: action.employee.id,
                    name: action.employee.name,
                    review_id: null,
                    assignedReviews: null
                }
            ]
            break;
        case 'INITIALIZE_STORE':
            return [
                ...action.employees
            ]
            break;
        case 'UPDATE_EMPLOYEE':
            return [
                ...action.employee
            ]
            break;
        default:
            return state;
    }


}
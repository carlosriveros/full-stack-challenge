

const initialState =  {}


export default function employee(state = initialState, action) {

    switch(action.type) {
        case 'SELECT_EMPLOYEE':
            return action.employee;
            break;
        default:
            return state;
    }


}
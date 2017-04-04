

const initialState =  {}


export default function employee(state = initialState, action) {

    switch(action.type) {
        case 'SELECT_REVIEW':
            return action.review;
            break;
        default:
            return state;
    }


}
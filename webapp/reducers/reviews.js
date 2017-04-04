/**
 * Created by carlosriveros on 2017-03-17.
 */


const initialState =  []


export default function reviews(state = initialState, action) {

    switch(action.type) {
        case 'ADD_REVIEW':
            return [
                ...state,
                action.review
            ]
            break;case 'INITIALIZE_REVIEWS':
            return [
                ...action.reviews
            ]
            break;
        case 'UPDATE_REVIEW':
            return [
                ...action.reviews
            ]
            break;
        default:
            return state;
    }


}
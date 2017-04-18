/**
 * Created by carlosriveros on 2017-03-17.
 */
import {combineReducers} from 'redux'
import employees from './employees'
import employee from './employee'
import reviews from './reviews'
import review from './review'

const reducer = combineReducers({
    employees,
    reviews,
    employee,
    review
});

export default reducer;
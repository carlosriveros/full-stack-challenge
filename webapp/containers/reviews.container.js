/**
 * Created by carlosriveros on 2017-03-16.
 */
import { connect } from 'react-redux'
import ReviewList from '../components/review.list'
import { initializeEmployees } from '../actions/employee.actions'
import {initializeReviews, addReview, selectReview} from '../actions/review.actions'




const mapStateToProps = (state) => {

    return {
        employees: state.employees,
        reviews: state.reviews
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initializeReviewsStore: () => {
            dispatch(initializeReviews())
        },
        initializeEmployeesStore: () => {
            dispatch(initializeEmployees());
        },
        addReview: (employeeId) => {

            dispatch(addReview(employeeId))
        },

        selectReview: (review) => {
            dispatch(selectReview(review))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ReviewList);
/**
 * Created by carlosriveros on 2017-03-16.
 */
import { connect } from 'react-redux'
import ReviewEditor from '../components/review.editor'
import { initializeEmployees } from '../actions/employee.actions'
import {initializeReviews, updateReview} from '../actions/review.actions'




const mapStateToProps = (state) => {

    console.log('mapState to props state', state)

    return {
        employees: state.employees,
        reviews: state.reviews,
        review: state.review
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
        updateReview: (reviewParams) => {
            dispatch(updateReview(reviewParams))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ReviewEditor);
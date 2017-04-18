import {genericHttpCall} from '../http.util'

const initializeReviewsComplete =  reviews => ({
    type: 'INITIALIZE_REVIEWS',
    reviews
})

export const initializeReviews = () => ((dispatch) => (
    genericHttpCall('reviews/')
        .then(response => {
            return response.json()
        })
        .then((responses) => {
                dispatch(initializeReviewsComplete(responses))
            }
        )
));

const addReviewComplete = review => ({
    type: 'ADD_REVIEW',
    review
})

export const addReview = (employeeId) => ((dispatch) => (
    genericHttpCall('reviews/add?revieweeId=' + employeeId)
        .then(response => {
            return response.json()
        })
        .then((responses) => {
                dispatch(addReviewComplete(responses))
            }
        )
));

const updateReviewComplete = reviews => ({
    type: 'UPDATE_REVIEW',
    reviews
})

export const updateReview = (reviewParams) => ((dispatch) => (
    genericHttpCall('reviews/update?id=' + reviewParams)
        .then(response => {
            return response.json()
        })
        .then((responses) => {
                dispatch(updateReviewComplete(responses))
            }
        )
));


const selectReviewComplete = review => ({
    type: 'SELECT_REVIEW',
    review
})

export const selectReview = (review) => ((dispatch) => (

    dispatch(selectReviewComplete(review))

));



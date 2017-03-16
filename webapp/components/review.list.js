/**
 * Created by carlosriveros on 2017-03-13.
 */
/**
 * Created by carlosriveros on 2017-03-13.
 */
import React, {Component} from 'react'

class ReviewList extends Component {
    constructor(props) {
        super(props);

        console.log('hit reviws')
        this.state={
            reviews: props.reviews
        }

    }

    componentWillReceiveProps(nextProps) {

        this.setState({reviews: nextProps.reviews});

    }

    render() {

        const styles = {
            list: {
                'list-style': 'none'
            },
            listItem: {
                display: 'inline',
                margin: '10px 50px'
            }
        }

        const reviewList = this.state.reviews.map(review => {

            return (<div key={review.id}>{review.body}  {review.completed}</div>)
        })


        return <div>
            hello hello
            <div>
                {reviewList}
            </div>
        </div>
    }
}

export default ReviewList;
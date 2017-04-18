/**
 * Created by carlosriveros on 2017-04-03.
 */
import React, {Component, PropTypes} from 'react';
import { Button as MuiButton, Container, Row, Col} from 'muicss/react';
import {Link} from 'react-router'

class Reviews extends Component {

    constructor(props){
        super(props)
        this.state = {
            selectedEmployee: null
        }
    }


    componentDidMount() {
        const {initializeReviewsStore, initializeEmployeesStore} = this.props;
        initializeReviewsStore();
        initializeEmployeesStore();
    }

    addNewReview() {


        if(this.state.selectedEmployeeOption === null) {
            return;
        }

        const [ id ] = this.state.selectedEmployeeOption.split(" ");

        this.props.addReview(id);

    }

    render() {

        const styles = {
            row: {
                backgroundColor: '#E3F2FD',
                borderBottom: "1px solid #BBDEFB",

            },
            rowItem:{
                borderLeft: "1px solid #BBDEFB"
            },
            select: {
                margin: '10px 60px 0 0',
                width: '200px'
            },
            newReviewParagraph: {
                marginTop: '30px'
            },
            newReview: {
                marginBottom: '30px'
            }
        }

        const reviewList = this.props.reviews.map(review => {

            let reviewee = "none";
            if(review.reviewee && review.reviewee.name  ) {
                reviewee = review.reviewee.name;
            }

            let assignedReviewers = review.assignedReviewers ? review.assignedReviewers.toString() :'none';

            return (<Link key={review.id} to={{
                pathname: '/reviews/' + review.id
            }}><Row style={styles.row} onClick={ () => {

                this.props.selectReview({
                    name: reviewee,
                    body: review.body,
                    completed: review.completed === 'N' ? false : true,
                    assignedReviewers: assignedReviewers,
                    reviewee: review.reviewee,
                    id: review.id
                })

            }}>
                <Col style={styles.rowItem} md="3">{reviewee}</Col>
                <Col style={styles.rowItem} md="3">{review.body}</Col>
                <Col style={styles.rowItem} md="3">{review.completed}</Col>

                <Col style={styles.rowItem} md="3">{assignedReviewers}</Col>
            </Row></Link>)
        })

        const reviewDropDownItems = this.props.employees.map(employee => {

            const value = employee.id  + " " + employee.name;

            return (<option key={employee.id} value={value}>{employee.name}</option>)
        })

        return(<div>


            <div style={styles.newReview}>

                <h3 style={styles.newReviewParagraph}>Select an employee below to create a new review</h3>

                <select color="primary" style={styles.select} onChange={ e => {

                    if(e.target.value != 0) {
                        this.setState({selectedEmployeeOption: e.target.value})
                    }

                }}>
                    <option value="0">Select an employee</option>
                    {reviewDropDownItems}
                </select>

                <MuiButton color="primary" onClick={() => this.addNewReview()}>Create Review</MuiButton>

            </div>
            <div>
                <h3 style={styles.newReviewParagraph}>Click on a review to go into it and update it.</h3>

                <Container fluid={true}>
                    <Row style={Object.assign({},styles.row, {height: '40px'})}>
                        <Col style={Object.assign({},styles.rowItem, {height: '40px'})} md="3">Reviewe</Col>
                        <Col style={Object.assign({},styles.rowItem, {height: '40px'})} md="3">Body</Col>
                        <Col style={Object.assign({},styles.rowItem, {height: '40px'})} md="3">Completed</Col>

                        <Col style={Object.assign({},styles.rowItem, {height: '40px'})} md="3">Reviewer Ids</Col>
                    </Row>
                    {reviewList}
                </Container>

            </div>


        </div>)


}

}

Reviews.PropTypes = {
    addReview: React.PropTypes.func,
    employees: React.PropTypes.array,
    initializeEmployeesStore: React.PropTypes.func,
    initializeReviewsStore: React.PropTypes.func,
    reviews: React.PropTypes.array,
    selectReview: React.PropTypes.func
}

export default Reviews;
/**
 * Created by carlosriveros on 2017-03-13.
 */
import React, {Component} from 'react'
import {Input, Button as MuiButton, Dropdown, DropdownItem, Container, Col, Row} from 'muicss/react';
import {genericHttpCall} from '../http.util'

class ReviewList extends Component {
    constructor(props) {
        super(props);

        this.state= {
            reviews: [],
            newReviewEmployee: 'Select an Employee',
            employees: [],
            selectedEmployeeOption: null,
            selectedReview: null,
            selectedReviewerOption: null,
            updatedReviewBody: null,
            updatedReviewCompleted: null
        }

    }

    componentDidMount() {

        genericHttpCall('reviews/').then(response => {
            return response.json()
        }).then(res => {
            this.setState({reviews: res});
        }).catch(function(err) {
            console.log('err', err)
        });



        genericHttpCall('employees/').then(response => {
            return response.json()
        }).then(res => {
            this.setState({employees: res});
        }).catch(function(err) {
            console.log('err', err)
        });
    }

    addNewReview() {


        if(this.state.selectedEmployeeOption === null) {
            return;
        }

        const [ id, ...name] = this.state.selectedEmployeeOption.split(" ");

        genericHttpCall('reviews/add?revieweeId=' + id).then(response => {
            return response.json()
        }).then(res => {
            let newReviewList = this.state.reviews;
            newReviewList.push({body: res.body, id: res.id, completed: res.completed, reviewee: {id: id, name: name.join(" ")}, assignedReviewers: []})
            this.setState({reviews: newReviewList, selectedEmployeeOption: null});
        }).catch(function(err) {
            console.log('err', err)
        });
    }


    updateReview() {


        let id = this.state.selectedReview.review.id;

        let url = '';

        if(this.state.selectedReviewerOption) {

            url = url + 'reviewerId=' + this.state.selectedReviewerOption.split(" ")[0] + '&';
        }

        if(this.state.selectedReview.review.body) {
            url = url + 'body=' + this.state.selectedReview.review.body+ '&';
        }

        if(this.state.updatedReviewCompleted) {
            url = url + 'completed=yes&';
        }

        genericHttpCall('reviews/update?id=' + id +"&"+ url).then(response => {
            return response.json()
        }).then(res => {

            this.setState({reviews: res, selectedReview: null});
        }).catch(function(err) {
            console.log('err', err)
        });

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
            },
            reviewEditBody: {
                width: '300px',
                height: '200px'
            },
            reviewCompleted: {
                marginTop: '30px 0px'
            },
            reviewCompletedCheckbox: {
                marginLeft: '15px'
            }
        }

        const reviewList = this.state.reviews.map(review => {

            let reviewee = "none";
            if(review.reviewee && review.reviewee.name  ) {
                reviewee = review.reviewee.name;
            }



            return (<Row style={styles.row} key={review.id} onClick={ () => {

                this.setState({selectedReview: {review}})

            }}>
                <Col style={styles.rowItem} md="3">{reviewee}</Col>
                <Col style={styles.rowItem} md="3">{review.body}</Col>
                <Col style={styles.rowItem} md="3">{review.completed}</Col>

                <Col style={styles.rowItem} md="3">{review.assignedReviewers.toString() || "none"}</Col>
            </Row>)
        })

        const reviewDropDownItems = this.state.employees.map(employee => {

            const value = employee.id  + " " + employee.name;

            return (<option key={employee.id} value={value}>{employee.name}</option>)
        })


        let currentView = null;

        if(this.state.selectedReview) {

            console.log('selectedReview', this.state.selectedReview)

            let name = this.state.selectedReview.review.reviewee.name;


            currentView = (<div>

                <a  onClick={()=> {
                    this.setState({selectedReview: null})
                }}> &lt; Return to Review List</a>

                <h2>Reviewee Name: {name}</h2>


                <h3>Write your review below.</h3>
                <textarea style={styles.reviewEditBody} value={this.state.selectedReview.review.body} onChange={(e) => {
                    this.setState({selectedReview:
                        {review: {body:  e.target.value
                                  ,id: this.state.selectedReview.review.id,
                                    reviewee : this.state.selectedReview.review.reviewee }
                        }
                    })
                }} placeholder="enter your review here"></textarea>

                <h3>Select a reviewer.</h3>
                <select color="primary" style={styles.select} onChange={ e => {

                    if(e.target.value != 0) {
                        this.setState({selectedReviewerOption: e.target.value})
                    }

                }}>
                    <option value="0">Select an employee</option>
                    {reviewDropDownItems}
                </select>

                <div style={styles.reviewCompleted }>
                    <label >
                        Review Complete
                        <input style={styles.reviewCompletedCheckbox}
                               type="checkbox"
                               checked={this.state.selectedReview.completed}
                               ref="complete"
                               onChange={(e) => {
                                   console.log('e', e.target.checked)
                                   this.setState({updatedReviewCompleted: e.target.checked})
                               }}
                        />
                    </label>
                </div>

                <MuiButton color="primary" onClick={() => this.updateReview()}>update employee</MuiButton>
            </div>)
        } else {
            currentView = (<div>


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

        return currentView
    }
}

export default ReviewList;
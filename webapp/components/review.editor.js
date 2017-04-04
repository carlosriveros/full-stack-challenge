/**
 * Created by carlosriveros on 2017-04-03.
 */

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Button as MuiButton} from 'muicss/react';


class ReviewEditor extends Component {

    constructor(props) {
        super(props)
        this.state= {
            selectedReview: this.props.review,
            selectedReviewerOption: null,
            updatedReviewBody: null,
            updatedReviewCompleted: this.props.review.completed,
            updatedReviewBody: this.props.review.body
        }
     }

    updateReview() {

        let id = this.state.selectedReview.id;
        let url = '';
        if(this.state.selectedReviewerOption) {
            url = url + 'reviewerId=' + this.state.selectedReviewerOption.split(" ")[0] + '&';
        }
        if(this.state.selectedReview.body) {
            url = url + 'body=' + this.state.selectedReview.body+ '&';
        }
        if(this.state.updatedReviewCompleted) {
            url = url + 'completed=yes&';
        }
        let reviewParams = id +"&"+ url;

        this.props.updateReview(reviewParams);
    }


    render() {

        const styles = {
            select: {
                margin: '10px 60px 0 0',
                width: '200px'
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

        const reviewDropDownItems = this.props.employees.map(employee => {

            const value = employee.id  + " " + employee.name;

            return (<option key={employee.id} value={value}>{employee.name}</option>)
        })

        return(<div>

            <Link to="/reviews"> &lt; Return to Review List</Link>

            <h2>Reviewee Name: {this.state.selectedReview.name}</h2>


            <h3>Write your review below.</h3>
            <textarea style={styles.reviewEditBody} value={this.state.updatedReviewBody} onChange={(e) => {
                this.setState({updatedReviewBody:e.target.value
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
                           checked={this.state.updatedReviewCompleted}
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
    }


}

ReviewEditor.PropTypes = {
    employees: React.PropTypes.array,
    initializeEmployeesStore: React.PropTypes.func,
    initializeReviewsStore: React.PropTypes.func,
    review: React.PropTypes.object,
    reviews: React.PropTypes.array,
    updateReview: React.PropTypes.func
}

export default ReviewEditor;
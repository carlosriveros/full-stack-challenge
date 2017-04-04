/**
 * Created by carlosriveros on 2017-03-13.
 */
import React, {Component} from 'react'
import Employees from './employees'
import Reviews from './reviews'
import EmployeeList from './../containers/employees.container'
import EmployeeEditor from './../containers/employeeEditor.container'
import reviewEditor from './../containers/reviewEditor.container'
import ReviewList from './../containers/reviews.container'
import App from './employee.review.app'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'

class Root extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (

                <Router history={hashHistory}>
                    <Route  path="" component={App}>
                        <Route path="/"  component={Employees}>
                            <IndexRoute component={EmployeeList}/>
                            <Route path="/employees/:employeeId"  component={EmployeeEditor}/>
                        </Route>
                        <Route path="reviews" component={Reviews}>
                            <IndexRoute component={ReviewList}/>
                            <Route path="/reviews/:reviewId"  component={reviewEditor}/>
                        </Route>
                    </Route>
                </Router>
        )
    }
}

export default Root;
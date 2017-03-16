/**
 * Created by carlosriveros on 2017-03-13.
 */
import React, {Component} from 'react'
import Employees from './employee.list'
import Reviews from './review.list'
import App from './root'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'
import createHistory from 'history/createBrowserHistory'

class Root extends Component {
    constructor(props) {
        super(props);

    }

    render() {


        return (

                <Router history={hashHistory}>
                    <Route  path="/" component={App}>
                        <IndexRoute component={Employees}/>
                        <Route path="employees"  component={Employees}/>
                        <Route path="reviews" component={Reviews}/>
                    </Route>
                </Router>
        )
    }
}

export default Root;
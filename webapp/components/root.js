/**
 * Created by carlosriveros on 2017-03-13.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Appbar, Input, Button as MuiButton} from 'muicss/react';
import Employees from './employee.list'
import Reviews from './review.list'

class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            reviews: []
        }


    }



    render() {

        const styles = {
            buttons: {
                'text-align': 'center'
            },

        }


        return<div>
            <Appbar>

                <div style={styles.buttons}>
                    <Link className="mui-btn mui-btn--raised" to="/employees">Employees</Link>
                    <Link className="mui-btn mui-btn--raised" to="/reviews">Reviews</Link>
                </div>



            </Appbar>

            <ul style={styles.list}>

                {this.props.children}

            </ul>
        </div>

    }
}

export default Root;
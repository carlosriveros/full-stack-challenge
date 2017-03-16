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

    componentDidMount() {

        const config = {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        const employeeRequest = new Request('http://localhost:8080/employees/', config);
        const reviewRequest = new Request('http://localhost:8080/reviews/', config);


        window.fetch(employeeRequest).then(response => {
            return response.json()
        }).then(res => {
            this.setState({employees: res});
        }).catch(function(err) {
            console.log('err', err)
        });

        window.fetch(reviewRequest).then(response => {
            return response.json()
        }).then(res => {
            this.setState({reviews: res});
        }).catch(function(err) {
            console.log('err', err)
        });


    }

    addEmployee()  {

        const config = {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        const employeeRequest = new Request('http://localhost:8080/employees/add?name=carlos&email=carlos@email.com', config);

        console.log('addd employee');
        window.fetch(employeeRequest).then(response => {
            return response.json()
        }).then(res => {

        }).catch(function(err) {
            console.log('err', err)
        });
    }

    addReview()  {

        const config = {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        const employeeRequest = new Request('http://localhost:8080/reviews/add?', config);

        console.log('addd employee');
        window.fetch(employeeRequest).then(response => {
            return response.json()
        }).then(res => {

        }).catch(function(err) {
            console.log('err', err)
        });
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

        console.log('root this.state.employees', this.state.employees)
        console.log('root this.state.reviews', this.state.reviews)

        return<div>
            <Appbar>
                <MuiButton variant="raised" onClick={this.addEmployee}>
                    {/*<Link to="/employees">Employees</Link>*/} Employees
                </MuiButton>
                <MuiButton variant="raised" onClick={this.addReview}>
                    {/*<Link to="/reviews">Reviews</Link>*/} Reviews
                </MuiButton>
                <Input hint="Input 1"/>

            </Appbar>

            <ul style={styles.list}>

                {this.props.children}

                {/*  <Employees employees={this.state.employees} />
                 <Reviews reviews={this.state.reviews}/>*/}
            </ul>
        </div>

    }
}

export default Root;
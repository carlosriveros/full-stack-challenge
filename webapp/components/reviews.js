/**
 * Created by carlosriveros on 2017-03-13.
 */
import React, {Component} from 'react'

class ReviewList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

      return (<div>
          {this.props.children}
      </div>)
    }
}

export default ReviewList;
import React, { Component } from 'react'
import Generate from './Generate';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class Form extends Component {

    render() {
        return (
            <React.Fragment>
                <Generate id='button-fill'/>
            </React.Fragment>
        )
    }
}

const mapStateProps=(state) => {
    return state
}

export default connect (mapStateProps, actions) (Form);
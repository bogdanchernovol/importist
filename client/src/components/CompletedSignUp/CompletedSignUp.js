import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {getUser} from '../../store/user/selectors';

class CompletedSignUp extends Component {
    render() {
        return (
            <div></div>
        );
    }
}
function mapStateToProps(state){
    return {
        user: getUser(state),
        signUpCompleteStatus: state.userReducer.signUpCompleteStatus,
        error: state.userReducer.error,
    }
}

export default withRouter(connect(mapStateToProps)(CompletedSignUp));

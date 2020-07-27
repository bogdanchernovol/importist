import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {userAction} from '../../store/user';
import {getUser} from '../../store/user/selectors';
import { message} from '../../utils/antd';
import * as constant from '../../utils/constant';

class VerifyEamil extends Component {
    componentDidMount(){
        const {id, verifyCode} = this.props.match.params;        
        if (!id && !verifyCode){
            this.props.history.push('/');
            return
        }
        this.props.dispatch(userAction.clearError());
        this.props.dispatch(userAction.verifyEmail({id, verifyCode}));
    }
    componentWillReceiveProps(nextProps){
        if (this.props.error !== nextProps.error && nextProps.error){
            message.warning(nextProps.error);
            return;
        }
        if (this.props.signUpStatus !== nextProps.signUpStatus && nextProps.signUpStatus &&
            nextProps.user ){
            this.props.history.push(constant.routeComplteRegistration);
        }       
    }
    componentWillUnmount(){
        this.props.dispatch(userAction.clearError());
    }
    render() {
        return (
            <div></div>
        );
    }
}
function mapStateToProps(state){
    return {
        user: getUser(state), 
        signUpStatus: state.userReducer.signUpStatus,
        error: state.userReducer.error,
    }
}

export default withRouter(connect(mapStateToProps)(VerifyEamil));
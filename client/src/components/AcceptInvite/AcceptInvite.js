import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {userAction} from '../../store/user';
import {getUser} from '../../store/user/selectors';
import { message} from '../../utils/antd';
import * as constant from '../../utils/constant';

class AcceptInvite extends Component {
    componentDidMount(){
        const {code} = this.props.match.params;
        if (!code){
            return this.props.history.push('/');
        }
        this.props.dispatch(userAction.clearError());
        this.props.dispatch(userAction.acceptInvite({code}));
    }
    componentWillReceiveProps(nextProps){
        if (this.props.error !== nextProps.error && nextProps.error) {
            this.props.history.push('/');
            return message.warning(nextProps.error);
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

export default withRouter(connect(mapStateToProps)(AcceptInvite));

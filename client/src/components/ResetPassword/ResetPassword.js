import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {userAction} from '../../store/user';
import {getUser} from '../../store/user/selectors';
import {Col, Row, Button, message} from '../../utils/antd';
import SignUpFormPass from '../SignUpFormPass';
import Auth from '../../containers/Auth';
import {validatePassword, validateConfirmPassword} from '../../utils/validate';
import * as constant from '../../utils/constant';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidEmail: false,
            statusPassReset: false,
            password: {},
            confirmPassword: {},
        }
    }
    componentDidMount(){
        const {id, verifyCode} = this.props.match.params;        
        if (id && verifyCode){
            this.props.dispatch(userAction.clearError());
            this.props.dispatch(userAction.verifyEmail({id, verifyCode}));
        }
        
    }
    componentWillReceiveProps(nextProps){
        if (this.props.error !== nextProps.error && nextProps.error){
            const field = nextProps.error.split(' ');
            let flag = false;
            if (field[field.length-1] === 'password'){
                this.setState({
                    password: {
                        validateStatus: constant.ERROR,
                        errorMsg: nextProps.error,
                        value: this.state.password.value
                    }
                }); 
                flag = true;
            }    
            if (field[field.length-1] === 'confirmPassword'){
                this.setState({
                    confirmPassword: {
                        validateStatus: constant.ERROR,
                        errorMsg: nextProps.error,
                        value: this.state.confirmPassword.value
                    }
                }); 
                flag = true;
            } 
            if (field[field.length-1] === 'role'){
                message.warning(`Please select 'Client' or 'Supplier'!`);
                return;
            } 
            if (field[field.length-1] === 'data'){
                message.warning('Incorrect user id!');
                return;
            } 
            if (!flag) {
                message.warning(nextProps.error);
                setTimeout(() => {
                    this.props.history.push(constant.routeForgotPass);
                }, 5000);
                return;
            }                
        }
        if (nextProps.signUpStatus === constant.SUCCESS){
                this.setState({isValidEmail: true});
        }
        if (nextProps.signUpStatus === constant.PASS_RESETED){
            this.setState({statusPassReset: true});
        }
        
    }
    onReset = () => {
        const password =  { ...validatePassword(this.state.password.value),  value: this.state.password.value};
        const confirmPassword =  { ...validateConfirmPassword(this.state.confirmPassword.value, this.state.password.value),  value: this.state.confirmPassword.value};  
       
        if (password.validateStatus === constant.ERROR || confirmPassword.validateStatus === constant.ERROR)  {
            this.setState({password, confirmPassword});
            return;
        }  
        console.log({
            ...this.props.user,
            password: password.value,
            confirmPassword: confirmPassword.value,
            role: this.props.user.role
        })
        this.props.dispatch(userAction.clearError());
        this.props.dispatch(userAction.resetPass({
            ...this.props.user,
            password: password.value,
            confirmPassword: confirmPassword.value,
            role: this.props.user.role
        }));    
    }
    handleChangePass = (value)=>{        
        this.setState({
            password: {
                ...validatePassword(value),
                value
            }
        });
    }
    handleChangeConfirmPass = (value)=>{        
        this.setState({
            confirmPassword: {
                ...validateConfirmPassword(value, this.state.password.value),
                value: value
            }
        });       
    } 
    onFinished = () =>{
        this.props.history.push(constant.routeSignIn);
    }
    render() {
        const {isValidEmail, statusPassReset, password, confirmPassword} = this.state;
        if (!isValidEmail){
            return (
                <Row  className='page-signIn sign-up-pass forgot display-all-center'></Row>
            );
        }
        return (
            <Row  className={!statusPassReset ? 'page-signIn sign-up-pass display-all-center' : 'page-signIn sign-up-pass display-all-center forgot'}>
                <Auth>
                    <Row className='group-block'>
                        <Row className='f-block'>
                            <Col span={24} className='title'>
                                { !statusPassReset ? `Reset Password` : 
                                    <div className='display-all-center'>
                                        <div>Password successfully reset!</div>
                                    </div>
                                }
                            </Col>
                            { !statusPassReset ?
                                <Col span={24}>
                                    <SignUpFormPass
                                        password={password}
                                        confirmPassword={confirmPassword}
                                        handleChangePass={this.handleChangePass}
                                        handleChangeConfirmPass={this.handleChangeConfirmPass}
                                    />                                   
                                    <Col span={24} className={'btn-block'}>                                
                                        <Button 
                                            type="primary" 
                                            className='btn-green'
                                            onClick={this.onReset}>
                                            Reset Password
                                        </Button>
                                    </Col>                        
                                </Col> 
                                :
                                <Col span={24} className='display-all-center'>                                    
                                    <Col span={24} className={'btn-block'}>                                
                                        <Button 
                                            type="primary" 
                                            className='btn-green'
                                            onClick={this.onFinished}>
                                            Return to Login
                                        </Button>
                                    </Col>    
                                </Col>
                            }
                        </Row>
                    </Row>
                </Auth>                             
            </Row>
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

export default withRouter(connect(mapStateToProps)(ResetPassword));
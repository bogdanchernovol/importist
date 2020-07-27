import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {userAction} from '../../store/user';
import {getUser} from '../../store/user/selectors';
import {Col, Row, Button} from '../../utils/antd';
import LoginForm from '../LoginForm';
import Auth from '../../containers/Auth';
import {validatePassword, validateEmail} from '../../utils/validate';
import * as constant from '../../utils/constant';
import './styles.less';

export class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = this.initState();
    }
    initState = () =>{
        return {
            email: {},
            password: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.user && this.props.user !== nextProps.user){
            this.props.history.push(constant.routeProducts);
        }
        if (nextProps.error){
            const field = nextProps.error.split(' ');
            if (field[field.length-1] === 'password'){
                this.setState({
                    password: {
                        validateStatus: constant.ERROR,
                        errorMsg: nextProps.error,
                        value: this.state.password.value
                    }
                }); 
            }
            if (field[field.length-1] === 'email'){
                this.setState({
                    email: {
                        validateStatus: constant.ERROR,
                        errorMsg: nextProps.error,
                        value: this.state.email.value
                    }
                });  
            }
        }
    }
        
    handleChangeEmail = (value)=>{        
        this.setState({
            email: {
                ...validateEmail(value),
                value
            }
        });
    }
    handleChangePass = (value)=>{        
        this.setState({
            password: {
                ...validatePassword(value, this.props.flag),
                value: value
            }
        });       
    }   
    onSignIn = ()=>{ 
        const email =  { ...validateEmail(this.state.email.value),  value: this.state.email.value};
        const password =  { ...validatePassword(this.state.password.value),  value: this.state.password.value};   
        if (email.validateStatus === constant.ERROR || password.validateStatus === constant.ERROR)  {
            this.setState({email, password});
            return;
        }   
        this.props.dispatch(userAction.clearError());
        this.props.dispatch(userAction.signIn({
            email: email.value,
            password: password.value
        }));        
    }
    componentWillUnmount(){
        this.props.dispatch(userAction.clearError());
    }
    render() { 
        const {email, password} = this.state;
         return (
            <Row  className='page-signIn display-all-center'>
                <Auth>
                    <Row className='group-block'>
                        <Row className='f-block'>
                            <Col span={24} className='title'>
                                Sign In
                            </Col>
                            <Col span={24}>
                                <LoginForm
                                    password={password}
                                    email={email}
                                    handleChangePass={this.handleChangePass}
                                    handleChangeEmail={this.handleChangeEmail}
                                />
                                <Col span={24} className={'btn-block'}>                                
                                    <Button 
                                        type="primary" 
                                        className='btn-green'
                                        onClick={this.onSignIn}>
                                        Sign In
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <Link to={constant.routeSignUp}>
                                        <Row className='btn-link-black'>
                                            Create Account
                                        </Row>                                    
                                    </Link>
                                </Col>  
                            </Col> 
                       </Row>
                    </Row>
                </Auth> 
                <Col span={24} className='forgot-link'>
                    <Link to={constant.routeForgotPass}>
                        Forgot your password?
                    </Link>
                </Col>                
            </Row>
        );
    }
}
function mapStateToProps(state){
    return {
        user: getUser(state), 
        error: state.userReducer.error
    }
}
export default withRouter(connect(mapStateToProps)(SignIn));
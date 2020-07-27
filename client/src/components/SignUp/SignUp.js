import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {userAction} from '../../store/user';
import {getUser} from '../../store/user/selectors';
import {Col, Row, Button} from '../../utils/antd';
import SignUpForm from '../SignUpForm';
import Auth from '../../containers/Auth';
import {validateEmail, validateName} from '../../utils/validate';
import * as constant from '../../utils/constant';
import './styles.less';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = this.initState();
    }
    initState = () =>{
        return {
            email: {},
            fullName: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.user && this.props.user !== nextProps.user){
            this.props.history.push(constant.routeSignUpPass);
        }
        if (nextProps.error){
            const field = nextProps.error.split(' ');
            if (field[field.length-1] === 'name'){
                this.setState({
                    fullName: {
                        validateStatus: constant.ERROR,
                        errorMsg: nextProps.error,
                        value: this.state.fullName.value
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
    handleChangeName = (value)=>{        
        this.setState({
            fullName: {
                ...validateName(value),
                value: value
            }
        });       
    }   
    onSignUp = ()=>{ 
        const email =  { ...validateEmail(this.state.email.value),  value: this.state.email.value};
        const fullName =  { ...validateName(this.state.fullName.value),  value: this.state.fullName.value};   
        if (email.validateStatus === constant.ERROR || fullName.validateStatus === constant.ERROR)  {
            this.setState({email, fullName});
            return;
        }   
        this.props.dispatch(userAction.clearError());
        this.props.dispatch(userAction.signUp({
            email: email.value,
            fullName: fullName.value
        }));        
    }
    componentWillUnmount(){
        this.props.dispatch(userAction.clearError());
    }
    render() { 
        const {email, fullName} = this.state;
         return (
            <Row  className='page-signIn sign-up display-all-center'>
                <Auth>
                    <Row className='group-block'>
                        <Row className='f-block'>
                            <Col span={24} className='title'>
                                Create Account
                            </Col>
                            <Col span={24}>
                                <SignUpForm
                                    fullName={fullName}
                                    email={email}
                                    handleChangeName={this.handleChangeName}
                                    handleChangeEmail={this.handleChangeEmail}
                                />
                                <Col span={24} className={'btn-block'}>                                
                                    <Button 
                                        type="primary" 
                                        className='btn-green'
                                        onClick={this.onSignUp}>
                                        Get Started
                                    </Button>
                                </Col>                        
                            </Col> 
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
        error: state.userReducer.error
    }
}
export default withRouter(connect(mapStateToProps)(SignUp));
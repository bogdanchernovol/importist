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
import SignUpRoleBlock from '../SignUpRoleBlock';
import './styles.less';

class SignUpPass extends Component {
    constructor(props){
        super(props);
        this.state = this.initState();
    }
    initState = () =>{
        return {
            password: {},
            confirmPassword: {},
            role: '',
            statusSignUp: false
        }
    }
    componentWillMount(){
        if (!this.props.user){
            this.changeRouteOnRoot();
        }
        if (this.props.user && this.props.user.statusRegistration !== constant.REGISTRATION_START){
            this.changeRouteOnRoot();
        }
    }
    changeRouteOnRoot = ()=>{
        this.props.history.push('/');
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.user && this.props.user !== nextProps.user){
            this.props.history.push(constant.routeSignUpPass);
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
            if (field[field.length-1] === 'confirmPassword'){
                this.setState({
                    confirmPassword: {
                        validateStatus: constant.ERROR,
                        errorMsg: nextProps.error,
                        value: this.state.confirmPassword.value
                    }
                });
            }
            if (field[field.length-1] === 'role'){
                message.warning(`Please select 'Client' or 'Supplier'!`);
            }
            if (field[field.length-1] === 'data'){
                message.warning('Incorrect user id!');
            }
        }
        if (nextProps.signUpStatus === constant.SUCCESS){
            this.setState({statusSignUp: true});
        }
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
    handleChangeClient = () =>{
        const {role}  = this.state;
        if (role === constant.CLIENT){
            this.setState({role: ''});
            return;
        }
        this.setState({role: constant.CLIENT});
    }
    handleChangeSupplier = () =>{
        const {role}  = this.state;
        if (role === constant.SUPPLIER){
            this.setState({role: ''});
            return;
        }
        this.setState({role: constant.SUPPLIER});
    }
    onSignUp = ()=>{
        const password =  { ...validatePassword(this.state.password.value),  value: this.state.password.value};
        const confirmPassword =  { ...validateConfirmPassword(this.state.confirmPassword.value, this.state.password.value),  value: this.state.confirmPassword.value};
        const {role}  = this.state;
        if (password.validateStatus === constant.ERROR || confirmPassword.validateStatus === constant.ERROR)  {
            this.setState({password, confirmPassword});
            return;
        }
        if (!role){
             message.warning(`Please select 'Client' or 'Supplier'!`);
             return;
        }
        this.props.dispatch(userAction.clearError());
        this.props.dispatch(userAction.signUpPass({
            ...this.props.user,
            password: password.value,
            confirmPassword: confirmPassword.value,
            role
        }));
    }
    componentWillUnmount(){
        this.props.dispatch(userAction.clearError());
    }
    onFinished = () =>{
        this.props.history.push('/');
    }
    render() {
        const {password, confirmPassword, role, statusSignUp} = this.state;
        const {user = {}} =this.props;
         return (
            <Row  className='page-signIn sign-up-pass display-all-center'>
                <Auth>
                    <Row className='group-block'>
                        <Row className='f-block'>
                            <Col span={24} className='title'>
                                { !statusSignUp ? `Create Account` :
                                    <div className='display-all-center congrat-text'>
                                        <div>Congratulations!</div>
                                        <div>Your account has been created.</div>
                                    </div>
                                }
                            </Col>
                            { !statusSignUp ?
                                <Col span={24}>
                                    <SignUpFormPass
                                        password={password}
                                        confirmPassword={confirmPassword}
                                        handleChangePass={this.handleChangePass}
                                        handleChangeConfirmPass={this.handleChangeConfirmPass}
                                    />
                                    <Col className='combine-role-block' span={24}>
                                        <SignUpRoleBlock
                                            textLogo='client'
                                            text='I’m looking for suppliers'
                                            textButton='Client'
                                            isActive={role === constant.CLIENT ? true : false}
                                            select={this.handleChangeClient}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="35" viewBox="0 0 33 35">
                                                    <path fill={role !== constant.CLIENT ? "#FFF" : '#0095FF'} fillRule="nonzero" d="M0 0v29.333h13.313v-.114l-2.553-2.55H2.667V2.667h20v9.507l2.666 2.67V0H0zm5.333 5.333V8h5.334V5.333H5.333zm9.334 0V8H20V5.333h-5.333zm-9.334 5.334v2.666h5.334v-2.666H5.333zm9.334 0v2.666H20v-2.666h-5.333zm7.979 5.26l-2.76 2.76h-3.907v3.907l-2.76 2.76 2.76 2.76v3.907h3.906l2.76 2.76 2.761-2.76h3.907v-3.906l2.76-2.76-2.76-2.761v-3.907h-3.907l-2.76-2.76zM5.333 16v2.667h5.334V16H5.333zm17.313 3.698l1.656 1.656h2.344v2.344l1.656 1.656-1.656 1.656V29.354h-2.344l-1.656 1.656-1.656-1.656h-2.344V27.01l-1.656-1.656 1.656-1.656v-2.344h2.344l1.656-1.656zM5.333 21.333V24h5.334v-2.667H5.333z"/>
                                                </svg>
                                        </SignUpRoleBlock>
                                        <SignUpRoleBlock
                                            textLogo='supplier'
                                            text='I’m a supplier looking for clients'
                                            textButton='Supplier'
                                            select={this.handleChangeSupplier}
                                            isActive={role === constant.SUPPLIER ? true : false}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                                <path fill={role !== constant.SUPPLIER ? "#FFF" : '#0095FF'} fillRule="nonzero" d="M28.148 0c-1.033 0-1.936.802-1.98 1.867h-.023v.068l-1.35 13.973a.714.714 0 0 0-.315-.068h-.72v-4.32a.718.718 0 0 0-1.035-.652L12.24 15.75v-3.51a.718.718 0 0 0-1.058-.63l-10.8 5.76A.721.721 0 0 0 0 18v17.28c0 .397.323.72.72.72h34.56a.72.72 0 0 0 .72-.765L33.975 1.98v-.045C33.868.875 33.047 0 31.972 0h-3.825zm0 1.44h3.825c.213 0 .506.273.562.63l1.98 32.49H1.44V18.427l9.36-4.995v3.128c0 .397.323.72.72.72h.72a.714.714 0 0 0 .315-.068l9.765-4.567v3.915c0 .397.323.72.72.72h.72v9.36c-.02.397.29.734.686.754.397.02.734-.29.754-.686v-.068l2.363-24.637a.633.633 0 0 0 .022-.068c0-.335.177-.495.563-.495zm-23.108 18v3.6H7.2v-3.6H5.04zm6.48 0v3.6h2.16v-3.6h-2.16zm6.48 0v3.6h2.16v-3.6H18zM5.04 25.92v3.6H7.2v-3.6H5.04zm6.48 0v3.6h2.16v-3.6h-2.16zm6.48 0v3.6h2.16v-3.6H18z"/>
                                            </svg>
                                        </SignUpRoleBlock>
                                    </Col>
                                    <Col span={24} className={'btn-block'}>
                                        <Button
                                            type="primary"
                                            className='btn-green'
                                            onClick={this.onSignUp}>
                                            Create Account
                                        </Button>
                                    </Col>
                                </Col>
                                :
                                <Col span={24} className='display-all-center'>
                                    <div className='verify-email-text'>{`Please verify ${user.email} via the link in your inbox.`}</div>
                                    <Col span={24} className={'btn-block'}>
                                        <Button
                                            type="primary"
                                            className='btn-green'
                                            onClick={this.onFinished}>
                                            Finished
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
        error: state.userReducer.error,
        signUpStatus: state.userReducer.signUpStatus
    }
}
export default withRouter(connect(mapStateToProps)(SignUpPass));

import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {userAction} from '../../store/user';
import {getUser} from '../../store/user/selectors';
import {Col, Row, Button, Input, Form, FormItem, message} from '../../utils/antd';
import Auth from '../../containers/Auth';
import {validateEmail} from '../../utils/validate';
import * as constant from '../../utils/constant';
import './styles.less';

class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.signUpStatus === constant.SUCCESS && 
            nextProps.user !== this.props.user){
            message.info(`Please verify ${nextProps.user.email} via the link in your inbox.`);
            setTimeout(()=> 
                this.props.history.push('/')    
            , 5000)
        }
        if (nextProps.error){
            const field = nextProps.error.split(' ');           
            if (field[field.length-1] === 'email'){
                this.setState({
                    email: {
                        validateStatus: constant.ERROR,
                        errorMsg: nextProps.error,
                        value: this.state.email.value
                    }
                });  
            }
            if (field[field.length-1] === 'data'){
                message.warning('Incorrect email!');
            } 
        }
    }
    handleChangeEmail= (value)=>{
        this.setState({
            email: {
                ...validateEmail(value),
                value
            }
        });
    }
    onSend = () =>{
        const email =  { ...validateEmail(this.state.email.value),  value: this.state.email.value};
        if (email.validateStatus === constant.ERROR)  {
            this.setState({email});
            return;
        }   
        this.props.dispatch(userAction.clearError());
        this.props.dispatch(userAction.forgotPass({
            email: email.value
        }));
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
          }; 
        const {email} = this.state;
        return (
            <Row  className='page-signIn sign-up-pass forgot display-all-center'>
                <Auth>
                    <Row className='group-block'>
                        <Row className='f-block'>
                            <Col span={24} className='title'>                            
                                Forgot Password?                       
                            </Col>
                            <Col span={24} className='display-all-center'>
                            <Form> 
                                <FormItem
                                    {...formItemLayout}
                                    label="Email Address"  
                                    validateStatus={email.validateStatus}
                                    help={email.errorMsg}                      
                                    >
                                    <Input           
                                        className='input-field'                     
                                        value={email.value}
                                        onChange={(e)=>this.handleChangeEmail(e.target.value)}
                                    />                     
                                </FormItem>
                            </Form>
                                <Col span={24} className={'btn-block'}>                                
                                    <Button 
                                        type="primary" 
                                        className='btn-green'
                                        onClick={this.onSend}>
                                        Send Reset Link
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
        error: state.userReducer.error,
        signUpStatus: state.userReducer.signUpStatus
    }
}
export default withRouter(connect(mapStateToProps)(ForgotPassword));
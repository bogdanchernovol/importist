import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Input, Form, FormItem} from '../../utils/antd';

class LoginForm extends Component {
    render() {
        const {password, email} = this.props;
        const formItemLayout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
          };  
        return (
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
                        onChange={(e)=>this.props.handleChangeEmail(e.target.value)}
                    />                     
                </FormItem>   
                <FormItem
                    {...formItemLayout}                                        
                    label="Password"  
                    validateStatus={password.validateStatus}
                    help={password.errorMsg}                      
                    >
                    <Input 
                        className='input-field'    
                        type='password'                       
                        value={password.value}
                        onChange={(e)=>this.props.handleChangePass(e.target.value)}
                    />                     
                </FormItem>   
            </Form>
        );
    }
}

LoginForm.propTypes = {
    password: PropTypes.object.isRequired,
    email: PropTypes.object.isRequired,
    handleChangeEmail: PropTypes.func.isRequired,
    handleChangePass: PropTypes.func.isRequired
};

export default LoginForm;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Input, Form, FormItem} from '../../utils/antd';

class SignUpFormPass extends Component {
    render() {
        const {password, confirmPassword} = this.props;
        const formItemLayout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
          };  
        return (
            <Form>
                <FormItem
                    {...formItemLayout}                                        
                    label="Password"  
                    validateStatus={password.validateStatus}
                    help={password.errorMsg}                      
                    >
                    <Input        
                        className='input-field'                 
                        value={password.value}
                        type='password'
                        onChange={(e)=>this.props.handleChangePass(e.target.value)}
                    />                     
                </FormItem>   
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"  
                    validateStatus={confirmPassword.validateStatus}
                    help={confirmPassword.errorMsg}                      
                    >
                    <Input         
                        className='input-field'                       
                        value={confirmPassword.value}
                        type='password'
                        onChange={(e)=>this.props.handleChangeConfirmPass(e.target.value)}
                    />                     
                </FormItem>
            </Form>
        );
    }
}

SignUpFormPass.propTypes = {
    password: PropTypes.object.isRequired,
    confirmPassword: PropTypes.object.isRequired,
    handleChangePass: PropTypes.func.isRequired,
    handleChangeConfirmPass: PropTypes.func.isRequired
};

export default SignUpFormPass;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Input, Form, FormItem} from '../../utils/antd';

class SignUpForm extends Component {
    render() {
        const {fullName, email} = this.props;
        const formItemLayout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
          };  
        return (
            <Form>
                <FormItem
                    {...formItemLayout}                                        
                    label="Full Name"  
                    validateStatus={fullName.validateStatus}
                    help={fullName.errorMsg}                      
                    >
                    <Input      
                        className='input-field'                   
                        value={fullName.value}
                        onChange={(e)=>this.props.handleChangeName(e.target.value)}
                    />                     
                </FormItem>   
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
            </Form>
        );
    }
}

SignUpForm.propTypes = {
    fullName: PropTypes.object.isRequired,
    email: PropTypes.object.isRequired,
    handleChangeEmail: PropTypes.func.isRequired,
    handleChangeName: PropTypes.func.isRequired
};

export default SignUpForm;
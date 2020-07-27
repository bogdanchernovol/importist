import React from 'react';
import {Row, Col, FormItem, Input} from '../../utils/antd';
import PropTypes from 'prop-types';

const UserForm = props => {
    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    return (
        <Row className='page-block'>
            {
                !props.notShowTitle &&
                <Col span={24}>
                    <div className='sub-title' id='userInformation'>User Information</div>
                </Col>
            }            
            <Row gutter={20}>
                <Col span={12}>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.fullName.validateStatus}
                        help={props.fullName.errorMsg}
                        label="Full Name"
                        >
                        <Input
                            value={props.fullName.value}
                            onChange={(e)=>props.handleChangeFullName(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.email.validateStatus}
                        help={props.email.errorMsg}
                        label="Email"
                        >
                        <Input
                            value={props.email.value}
                            onChange={(e)=>props.handleChangeEmail(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Create Password"
                        validateStatus={props.password.validateStatus}
                        help={props.password.errorMsg}
                        >
                        <Input
                            className='input-field'
                            value={props.password.value}
                            type='password'
                            onChange={(e)=>props.handleChangePass(e.target.value)}
                        />
                    </FormItem>

                </Col>
                <Col span={12}>
                    <FormItem
                        {...formItemLayout}
                        label="Position"
                        >
                        <Input
                            value={props.position.value}
                            onChange={(e)=>props.handleChangePosition(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.telephone.validateStatus}
                        help={props.telephone.errorMsg}
                        label="Telephone"
                        >
                        <Input
                            value={props.telephone.value}
                            onChange={(e)=>props.handleChangeTelephone(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Confirm Password"
                        validateStatus={props.confirmPassword.validateStatus}
                        help={props.confirmPassword.errorMsg}
                        >
                        <Input
                            className='input-field'
                            value={props.confirmPassword.value}
                            type='password'
                            onChange={(e)=>props.handleChangeConfirmPass(e.target.value)}
                        />
                    </FormItem>
                </Col>
            </Row>
        </Row>
    );
};

UserForm.propTypes = {
    handleChangeTelephone: PropTypes.func.isRequired,
    handleChangePosition: PropTypes.func.isRequired,
    handleChangeEmail: PropTypes.func.isRequired,
    handleChangeFullName: PropTypes.func.isRequired,
    handleChangePass: PropTypes.func,
    handleChangeConfirmPass: PropTypes.func,
    telephone: PropTypes.object,
    position: PropTypes.object,
    fullName: PropTypes.object.isRequired,
    email: PropTypes.object.isRequired,
    password: PropTypes.object,
    confirmPassword: PropTypes.object,
};

export default UserForm;

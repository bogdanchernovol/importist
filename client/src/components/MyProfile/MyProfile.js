import React, {Component} from 'react';
import {Button, Col, Row} from '../../utils/antd';
import UserForm from '../UserForm';
import {validateName, validateRequired, validatePhone, validateEmail, validatePassword, validateConfirmPassword} from '../../utils/validate';
import * as constant from '../../utils/constant';
import './styles.less';

class MyProfile extends Component{
  constructor(props){
    super(props);
    this.state = this.initState();
  }
  triggerIsEdit = () =>{    
    this.setState({isEdit: !this.state.isEdit});
  }
  handleChangeFullName= (value) =>{
    this.setState({
        fullName: {
            ...validateRequired(value),
            value
        }
    });
  }
  handleChangePosition = (value) =>{
      this.setState({
          position: {
              value
          }
      });
  }
  handleChangeTelephone = (value) =>{
      this.setState({
          telephone: {
              ...validatePhone(value),
              value
          }
      });
  }
  handleChangeEmail = (value) =>{
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
  saveUser = () => {
    const email =  {...validateEmail(this.state.email.value),  value: this.state.email.value};
    const fullName =  {...validateName(this.state.fullName.value),  value: this.state.fullName.value};
    const password =  {...validatePassword(this.state.password.value),  value: this.state.password.value};
    const confirmPassword =  {...validateConfirmPassword(this.state.confirmPassword.value, this.state.password.value),  value: this.state.confirmPassword.value};
    const phone =  {...validatePhone(this.state.telephone.value),  value: this.state.telephone.value};
    const position = this.state.position.value;

    if (
        email.validateStatus === constant.ERROR ||
        fullName.validateStatus === constant.ERROR ||
        password.validateStatus === constant.ERROR ||
        confirmPassword.validateStatus === constant.ERROR
    ) {
        return this.setState({email, fullName, password, confirmPassword, phone});
    }

    this.props.updateUserProfile({
      email: email.value,
      fullName: fullName.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      phone: phone.value,
      position
    })
  }
  render(){
    const {isEdit, telephone, position, fullName, email, password, confirmPassword} = this.state;
    return (
      <div className='app-subcontent'>
        <h2>User Information
          { !isEdit && 
            <span className='profile-edit-link' onClick={this.triggerIsEdit}>
              Edit
            </span>
          }          
        </h2>
        {
          isEdit ? 
          <Row>
            <UserForm
              handleChangeTelephone={this.handleChangeTelephone}
              handleChangePosition={this.handleChangePosition}
              handleChangeEmail={this.handleChangeEmail}
              handleChangeFullName={this.handleChangeFullName}
              handleChangePass={this.handleChangePass}
              handleChangeConfirmPass={this.handleChangeConfirmPass}
              telephone={telephone}
              position={position}
              fullName={fullName}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              notShowTitle={true}
            />
            <Button
                  type="default"
                  className='app-change-password-btn'
                  onClick={this.saveUser}>
                  Update
            </Button>
            <Button
                type="default"
                className='app-change-password-btn'
                onClick={this.triggerIsEdit}>
                Cancel
            </Button>
          </Row>
          
          :
          <Row>
            <Col span={6}>
              <h4 className='profile-field-title'>Full Name</h4>
              <p className='profile-value'>{fullName.value}</p>
              <h4 className='profile-field-title'>Email</h4>
              <p className='profile-value'>{email.value}</p>
              <h4 className='profile-field-title'>Password</h4>
              <p className='profile-value'>••••••••••••••••</p>
              <Button
                  type="default"
                  className='app-change-password-btn'
                  onClick={() => {}}>
                  Change Password
              </Button>
            </Col>
            <Col span={6}>
              <h4 className='profile-field-title'>Position</h4>
              <p className='profile-value'>{position.value}</p>
              <h4 className='profile-field-title'>Telephone</h4>
              <p className='profile-value'>{telephone.value}</p>
            </Col>
          </Row>
        }        
      </div>
    );
  }   
  initState = () =>{
    return {      
        isEdit: false,
        telephone: { value: this.props.user.phone },
        position: {value: this.props.user.position},
        fullName: { value: this.props.user.fullName && this.props.user.fullName.trim() },
        email: { value: this.props.user.email },
        password: {},
        confirmPassword: {}
    }
  } 
};

export default MyProfile;

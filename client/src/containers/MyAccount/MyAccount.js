import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {userAction} from '../../store/user';
import {getUser} from '../../store/user/selectors';
import {Content, Menu} from '../../utils/antd';
import MyProfile from '../../components/MyProfile';
import AppLayout from '../AppLayout';
import * as constant from '../../utils/constant';
import './styles.less';

class MyAccount extends Component {
    constructor(props){
        super(props);
        this.state = this.initState();
    }
    updateUserProfile = (user)=>{
        this.props.dispatch(userAction.clearError());
        console.log({
            ...this.props.user,
            ...user
        })
        // this.props.dispatch(userAction.completeSignUpUser({
        //     ...this.props.user,
        //     ...user            
        // }));
    }
    render() {
      const tab = this.props.location.hash.replace('#', '') || 'myProfile';
      return (
        <AppLayout>
          <Content className='app-content'>
            <h1>My Account</h1>
            <Menu className='app-menu' mode="horizontal" selectedKeys={[tab]}>
              <Menu.Item key="myProfile" className='app-menu-item'>
                  <a href="#myProfile">My Profile</a>
              </Menu.Item>
              <Menu.Item key="companyProfile" className='app-menu-item'>
                  <a href="#companyProfile">Company Profile</a>
              </Menu.Item>
              <Menu.Item key="userAndPermissions" className='app-menu-item'>
                  <a href="#userAndPermissions">Users & Permissions</a>
              </Menu.Item>
              <Menu.Item key="billing" className='app-menu-item'>
                  <a href="#billing">Billing</a>
              </Menu.Item>
              <Menu.Item key="settings" className='app-menu-item'>
                  <a href="#settings">Settings</a>
              </Menu.Item>
            </Menu>

            { (!tab || tab === 'myProfile') &&
              <MyProfile 
                user= {constant.USER_PROFILE}
                updateUserProfile={this.updateUserProfile}
                />
            }
            { tab === 'companyProfile' &&
              <div>Company Profile</div>
            }

          </Content>
        </AppLayout>
      );
    }

    initState = () =>{
        return {
        }
    }
};
function mapStateToProps(state) {
    return {
        user: getUser(state),
        error: state.userReducer.error,
    }
}
export default withRouter(connect(mapStateToProps)(MyAccount));

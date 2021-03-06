import React from 'react';
import PropTypes from 'prop-types';
import {Menu} from '../../utils/antd';

const MenuRegClient = props => {
    return (
        <Menu
            onClick={props.handleClickMenu}
            selectedKeys={[props.currentMenu]}
            mode="horizontal">
            <Menu.Item key="company">
                <a href="#company">Company</a>
            </Menu.Item>
            <Menu.Item key="companyDetails">
                <a href="#companyDetails">Company Details</a>                
            </Menu.Item>
            <Menu.Item key="userInformation">
                <a href="#userInformation">User Information</a>   
            </Menu.Item>
        </Menu>
    );
};

MenuRegClient.propTypes = {
    handleClickMenu: PropTypes.func.isRequired,
    currentMenu: PropTypes.string
};

export default MenuRegClient;
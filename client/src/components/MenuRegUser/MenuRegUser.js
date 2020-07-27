import React from 'react';
import PropTypes from 'prop-types';
import {Menu} from '../../utils/antd';

const MenuRegUser = props => {
    return (
        <Menu
            onClick={props.handleClickMenu}
            selectedKeys={[props.currentMenu]}
            mode="horizontal">
            <Menu.Item key="userInformation">
                <a href="#userInformation">User Information</a>
            </Menu.Item>
        </Menu>
    );
};

MenuRegUser.propTypes = {
    handleClickMenu: PropTypes.func.isRequired,
    currentMenu: PropTypes.string
};

export default MenuRegUser;

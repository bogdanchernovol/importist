import React from 'react';
import {Row} from '../../utils/antd';
import Logo from '../../images/square-logo.png';
import './styles.less';

const Auth = (props) => {
    return (
        <Row className='form display-all-center'>
            <img className='logo' src={Logo} alt='logo' />            
                {props.children}                            
        </Row> 
    );
};

export default Auth;
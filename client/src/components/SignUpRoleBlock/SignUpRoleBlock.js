import React from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const SignUpRoleBlock = props => {
    return (
        <div className='block' onClick={props.select}>
            {props.children}
            <div className={props.isActive ? 'text text-blue' : 'text'}>{props.text}</div>
            <div className={props.isActive ? 'btn-text btn-text-blue' : 'btn-text'}>{props.textButton}</div>
        </div>
    );
};

SignUpRoleBlock.propTypes = {
    text: PropTypes.string.isRequired,
    textLogo: PropTypes.string,
    textButton: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
    isActive: PropTypes.bool
};

export default SignUpRoleBlock;
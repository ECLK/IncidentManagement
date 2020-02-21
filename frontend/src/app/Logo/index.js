import React from "react";
import PropTypes from 'prop-types';

import ECLogo from "../../static/img/ec-logo.png";
import './Logo.css';

function Logo(props) {
    return (
        <div className='logo-container' >
            <img src={ECLogo} alt='logo' style={{
                maxWidth: props.maxWidth
            }}></img>
        </div>
    );
  
}

Logo.propTypes ={
    maxWidth: PropTypes.string
}

export default Logo;
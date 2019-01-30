import React from "react";
import ECLogo from "../../static/img/ec-logo.png";
import { withStyles } from '@material-ui/core/styles';
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


export default Logo;
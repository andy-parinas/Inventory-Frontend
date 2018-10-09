import React from 'react';
import PropTypes from 'prop-types';


const QRCodeIcon = props => {

    return(
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
           <title>qrcode</title>
            <path d="M10 2h-8v8h8v-8zM12 0v0 12h-12v-12h12zM4 4h4v4h-4zM30 2h-8v8h8v-8zM32 0v0 12h-12v-12h12zM24 4h4v4h-4zM10 22h-8v8h8v-8zM12 20v0 12h-12v-12h12zM4 24h4v4h-4zM14 0h2v2h-2zM16 2h2v2h-2zM14 4h2v2h-2zM16 6h2v2h-2zM14 8h2v2h-2zM16 10h2v2h-2zM14 12h2v2h-2zM14 16h2v2h-2zM16 18h2v2h-2zM14 20h2v2h-2zM16 22h2v2h-2zM14 24h2v2h-2zM16 26h2v2h-2zM14 28h2v2h-2zM16 30h2v2h-2zM30 16h2v2h-2zM2 16h2v2h-2zM4 14h2v2h-2zM0 14h2v2h-2zM8 14h2v2h-2zM10 16h2v2h-2zM12 14h2v2h-2zM18 16h2v2h-2zM20 14h2v2h-2zM22 16h2v2h-2zM24 14h2v2h-2zM26 16h2v2h-2zM28 14h2v2h-2zM30 20h2v2h-2zM18 20h2v2h-2zM20 18h2v2h-2zM22 20h2v2h-2zM26 20h2v2h-2zM28 18h2v2h-2zM30 24h2v2h-2zM18 24h2v2h-2zM20 22h2v2h-2zM24 22h2v2h-2zM26 24h2v2h-2zM28 22h2v2h-2zM30 28h2v2h-2zM20 26h2v2h-2zM22 28h2v2h-2zM24 26h2v2h-2zM26 28h2v2h-2zM20 30h2v2h-2zM24 30h2v2h-2zM28 30h2v2h-2z"></path>
        </svg>
    )

};


QRCodeIcon.propTypes = {
    className: PropTypes.string.isRequired
};

export default QRCodeIcon;
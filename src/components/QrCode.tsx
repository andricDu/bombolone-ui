import React from 'react';

export const QrCode = (props: any) => {
    return (
        <img src={`${process.env.REACT_APP_CAM_API}/qrcode.svg`} alt="qrcode" />
    );
}

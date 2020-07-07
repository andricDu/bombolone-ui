import React from 'react';
import { Camera } from './Camera';
import { QrCode } from './QrCode';

export const MainDisplay = (props: any) => {
    return (
        <div className="ui grid">
            <div className="one column row">
                <Camera/>
            </div>
            <div className="one column row">
                <QrCode/>
            </div>
        </div>
    );
}

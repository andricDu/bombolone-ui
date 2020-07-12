import React from 'react';
import { Camera } from './Camera';
import { QrCode } from './QrCode';

export const MainDisplay = (props: any) => {
    return (
        <div className="ui grid">
            <div className="one column row">
                <h2 className="column block inverted section-header">Camera</h2>
            </div>
            <div className="one column row">
                <div className="column center">
                    <Camera/>
                </div>
            </div>

            <div className="one column row">
                <h2 className="column block inverted section-header">Environmentals</h2>
            </div>
            <div className="one column row">
                <div className="column center section-text">
                    UNDER CONSTRUCTION
                </div>
            </div>


            <div className="one column center row">
                <div className="column center">
                    <QrCode/>
                </div>
            </div>
        </div>
    );
}

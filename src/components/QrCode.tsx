import React from 'react';

type QrState = {
    show: boolean
}

export class QrCode extends React.Component<any, QrState> {

    constructor(props: any) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        if (this.state.show) {
            return (
                <img src={`${process.env.REACT_APP_CAM_API}/qrcode.svg`} alt="qrcode" />
            );
        } else {
            return (
                <button className="ui button" onClick={() => this.showCode()}>Show QRCode</button>
            );
        }
    }

    private showCode() {
        this.setState({
            show: true
        });
    }

}

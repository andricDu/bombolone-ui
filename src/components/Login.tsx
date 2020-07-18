import React, { ChangeEvent } from 'react';
import QrReader from 'react-qr-reader'

type LoginProps = { 
    loginSuccessCallback: Function
}

type LoginState = {
    secret: string,
    attempted: boolean
    showQr: boolean
};

export class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            secret: '',
            attempted: false,
            showQr: false
        };
    }

    render() {
        return (
            <div className="ui grid">
                <div className="one column row login-header">
                    <h1 className="column block violet inverted center aligned header">Bombolone-Cam</h1>
                </div>
                <div className="one column row">
                        <h3 className="column center inverted aligned header">
                            <div className="ui inverted segment">
                                Your current device/browser is not paired to the camera. 
                                Please enter secret key or scan the secret QR code to pair your device.
                            </div>
                        </h3>
                </div>
                <div className="one column row">
                    <div className="column center aligned">
                        <div className="ui icon input">
                            <input type="password" name="secret" id="secret" 
                                value={this.state.secret} onChange={evt => this.updateUserInput(evt)} 
                                placeholder="Secret Key" />
                            <i className="lock icon"></i>
                        </div>
                    </div>
                </div>
                <div className="one column row">
                    <div className="column center aligned">
                        {
                            this.state.showQr
                            ? <QrReader delay={300} onError={(err) => this.handleError(err)} onScan={(data) => this.handleScan(data)} style={{ 'width': '100%', 'margin-right': '-50%' }}/>
                            : <button className="ui button" onClick={() => this.showQr()}>Scan QR Code</button>
                        }
                    </div>
                </div>
                <div className="one column row">
                    <div className="column center aligned">
                        <button className="ui primary button" onClick={() => this.doLogin()}>Login</button>
                    </div>
                </div>
            </div>
        );
    }

    private showQr = () => {
        this.setState({ showQr: true })
    }

    private handleScan = (data: any) => {
        if (data) {
            alert("Code Scanned, try Login.")
            this.setState({secret: data});
        }
    }

    private handleError(err: any) {
        console.error(err);
    }

    private updateUserInput(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        this.setState({secret: event.target.value});
    }

    private doLogin() {
        const secret = this.state.secret;
        const jsonData = {
            secret: secret
        };
        fetch(`${process.env.REACT_APP_CAM_API}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)  
        }).then(res => {
            if (res.status === 200) {
                this.props.loginSuccessCallback();
            } else {
                alert("Wrong Login!");
            }
        });
    }

}

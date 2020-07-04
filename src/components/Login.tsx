import React, { ChangeEvent } from 'react';
import QrReader from 'react-qr-reader'

type LoginProps = { 
    loginSuccessCallback: Function
}

type LoginState = {
    secret: string,
    attempted: boolean
};

export class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            secret: '',
            attempted: false
        };
    }

    render() {
        return (
            <div className="login">
                <h1>Bombolone-Cam</h1>
                <span>
                    <p>
                        Your current device/browser is not paired to the camera. 
                        Please enter secret key or scan the secret QR code to pair your device.
                    </p>
                </span>
                <label>
                    <span>Login Key:</span>
                    <input type="password" name="secret" id="secret" value={this.state.secret} onChange={evt => this.updateUserInput(evt)} />
                    <QrReader
                        delay={300}
                        onError={(err) => this.handleError(err)}
                        onScan={(data) => this.handleScan(data)}
                        style={{ width: '100%' }}
                    />
                    <button onClick={() => this.doLogin()}>Login</button>
                </label>
            </div>
        );
    }

    private handleScan = (data: any) => {
        if (data) {
            alert(data);
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
                alert("FUCK YOU!");
            }
        });
    }

}

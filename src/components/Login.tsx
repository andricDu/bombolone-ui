import React, { ChangeEvent } from 'react';

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
                <label>
                    <span>Login Key:</span>
                    <input type="password" name="secret" id="secret" value={this.state.secret} onChange={evt => this.updateUserInput(evt)} />
                    <button onClick={() => this.doLogin()}>Login</button>
                </label>
            </div>
        );
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

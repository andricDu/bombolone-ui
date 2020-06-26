import React from 'react';
import { Login } from './Login';
import { Camera } from './Camera';


type HomePageState = {
    loggedIn: boolean,
    error: boolean
}

export class HomePage extends React.Component<any, HomePageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loggedIn: false,
            error: false
        };
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    render() {
        const {loggedIn, error} = this.state;

        if (error) {
            return (
                <div>ERROR!</div>
            );
        } else if (!loggedIn) {
            return (
                <Login loginSuccessCallback={() => this.checkLoginStatus()}/>
            );
        } else {
            return (
                <Camera/>
            );
        }
    }

    private checkLoginStatus() {
        fetch(`${process.env.REACT_APP_CAM_API}/test_auth`, {
            credentials: "include",
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({loggedIn: true});
            } else if (res.status === 401 || res.status === 403) {
                this.setState({loggedIn: false});
            } else {
                this.setState({error: true});
            }
        });
    }

}

import * as React from "react";
import {Input} from "../../../Core/Components/Input";
import {EAsyncStatus, TRender} from "../../../Core/Types";
import {IAuthStore} from "../AuthStore";
import {EAuthStatus} from "../Models";

import './AuthPage.scss';

interface IProps {
    authStore: IAuthStore;
}

export class AuthPage extends React.Component<IProps> {
    protected login: string = '';
    protected password: string = '';

    public handleOnChangeLogin = (value: string) => {
        this.login = value;
    };

    public handleOnChangePassword = (value: string) => {
        this.password = value;
    };

    public handleOnClickLogin = () => {
        const {authStore} = this.props;
        authStore.auth(this.login, this.password);
    };

    public renderAuthPanel(): TRender {
        const {authStore} = this.props;
        const authData = authStore.getData();

        if (!authData) {
            return null;
        }

        const isProcessing = authData.status === EAsyncStatus.PROCESSING;

        return (
            <div className="auth-page-panel">
                <div className="auth-page-panel-line title">
                    NICE TO SEE YOU AGAIN
                </div>

                <div className="auth-page-panel-line">
                    <Input placeholder="Username / email" onChange={this.handleOnChangeLogin}/>
                </div>

                <div className="auth-page-panel-line">
                    <Input placeholder="Password" type="password"
                           onChange={this.handleOnChangePassword}/>
                </div>

                {authData.data && authData.data.status === EAuthStatus.WRONG_AUTH_DATA && (
                    <div className="auth-page-panel-line">
                        Wrong auth data
                    </div>
                )}

                <div className="auth-page-panel-line">
                    <button
                        className="button"
                        onClick={this.handleOnClickLogin}
                        disabled={isProcessing}
                    >
                         {isProcessing ? '... LOGIN ...' : 'LOGIN'}
                    </button>
                </div>

                {authData.status === EAsyncStatus.ERROR && (
                    <div className="auth-page-panel-line">
                        Connection error
                    </div>
                )}
            </div>
        );
    }

    public render(): TRender {
        const {authStore} = this.props;
        const authData = authStore.getData();

        if (!authData) {
            return null;
        }

        return (
            <div className="auth-page">
                <div className="auth-page-side">
                    <div className="auth-page-side-logo-top"/>
                    <div className="auth-page-side-logo-center"/>
                    <div className="auth-page-side-phone-bottom">
                        5 5656 83 342 34
                    </div>
                </div>
                <div className="auth-page-ui">
                    {this.renderAuthPanel()}
                </div>
            </div>
        );
    }
}

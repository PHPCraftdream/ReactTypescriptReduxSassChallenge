import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {AuthActions, IAuthActions} from "../../Auth/Actions";
import {AuthService} from "../../Auth/AuthService";
import {IAuthState} from "../../Auth/Models";
import {AuthPage} from "../../Auth/Pages/AuthPage";
import {IRootState, TAllActions} from "../Redux";
import {Routes} from "../Routes";
import {TRender} from "../Types";

import "../../assets/scss/App.scss";

interface IOwnProps {}

interface IStateProps {
    authState: IAuthState;
}

interface IDispatchProps {
    authActions: IAuthActions;
}

type TProps = IOwnProps & IStateProps & IDispatchProps;

export class AppComponent extends React.Component<TProps, {}> {
    public render(): TRender {
        const {authState, authActions} = this.props;

        if (authState && authState.data && authState.data.isAuth) {
            return <Routes/>;
        }

        return <AuthPage authActions={authActions} authState={authState} />;
    }
}

const mapStateToProps = (state: IRootState, ownProps: IOwnProps): IStateProps => {
    return {
        authState : state.auth,
    };
};

const mapDispatchToProps = (dipatch: Dispatch<TAllActions>, ownProps: IOwnProps): IDispatchProps => {
    return {
        authActions: new AuthActions(dipatch, new AuthService()),
    };
};

export const App = connect(
    mapStateToProps, mapDispatchToProps
)(AppComponent);

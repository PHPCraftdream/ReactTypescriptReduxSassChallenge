import { Dispatch } from "redux";
import {EAsyncStatus, IAsyncData} from "../Core/Types";
import {IAuthService} from "./AuthService";
import {IAuthData} from "./Models";
import {getDefaultAuthData} from "./Reducer";

export enum EAuthActions {
    SET_STATE = "AUTH_SET_STATE",
    LOG_OUT = "AUTH_LOG_OUT",
}

export interface IAuthSetState {
    type: EAuthActions.SET_STATE;
    payload: IAsyncData<IAuthData>;
}

export interface IAuthLogOut {
    type: EAuthActions.LOG_OUT;
    payload?: any;
}

export type TAuthAction = IAuthSetState | IAuthLogOut;

export interface IAuthActions {
    auth: (login: string, password: string) => void;
    authSogOut: () => void;
}

export class AuthActions implements IAuthActions {
    constructor(protected dispatch: Dispatch<any>, protected service: IAuthService) {
    }

    public auth = (login: string, password: string): void => {

        this.dispatch({
            payload: {data: getDefaultAuthData(), status: EAsyncStatus.PROCESSING},
            type: EAuthActions.SET_STATE,
        });

        this.service.auth(login, password).then(data => {

            this.dispatch({
                payload: {data, status: EAsyncStatus.SUCCESS},
                type: EAuthActions.SET_STATE,
            });
        }).catch(error => {
            this.dispatch({
                payload: {data: getDefaultAuthData(), status: EAsyncStatus.ERROR},
                type: EAuthActions.SET_STATE,
            });
        });
    };

    public authSogOut = (): void => {
        this.dispatch({
            type: EAuthActions.LOG_OUT,
        });
    };
}

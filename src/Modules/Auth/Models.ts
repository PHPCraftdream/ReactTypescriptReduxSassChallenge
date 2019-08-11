import {EAsyncStatus, IAsyncData} from "../../Core/Types";

export enum EAuthStatus {
    SUCCESS = 'SUCCESS',
    INPUT_CODE = 'INPUT_CODE',
    WRONG_CODE = 'WRONG_CODE',
    WRONG_AUTH_DATA = 'WRONG_AUTH_DATA',
}

export interface IAuthData {
    isAuth?: boolean;
    userId?: string;
    userName?: string;
    token?: string;
    status?: EAuthStatus;
    error?: Error;
}

export interface IAuthState extends IAsyncData<IAuthData> {}

export interface IAuthRequest {
    login: string;
    password: string;
}

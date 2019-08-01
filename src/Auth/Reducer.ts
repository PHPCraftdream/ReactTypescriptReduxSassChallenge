import {EAsyncStatus} from "../Core/Types";
import {EAuthActions, TAuthAction} from "./Actions";
import {IAuthState} from "./Models";

export const getDefaultAuthData = () => ({
    isAuth: false,
});

export const getInitialStateAuth = (): IAuthState => {
    return {
        data: getDefaultAuthData(),
        status: EAsyncStatus.SUCCESS,
    };
};

export const authReducer = (state: IAuthState = getInitialStateAuth(), action: TAuthAction): IAuthState => {
    const {type, payload} = action;

    if (type === EAuthActions.SET_STATE) {
        return {
            ...payload,
        };
    }

    if (type === EAuthActions.LOG_OUT) {
        return getInitialStateAuth();
    }

    return state;
};

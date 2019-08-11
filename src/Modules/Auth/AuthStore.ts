import {EAsyncStatus} from "../../Core/Types";
import {FruitStore} from "../../FruitState/FruitStore";
import {fruitMem} from "../../FruitState/tools";
import {IFruitStore} from "../../FruitState/types";
import {getAuthService, IAuthService} from "./AuthService";
import {IAuthData, IAuthState} from "./Models";

const getDefaultAuthData = () => ({
    isAuth: false,
});

const getInitialStateAuth = (): IAuthState => {
    return {
        data: getDefaultAuthData(),
        status: EAsyncStatus.SUCCESS,
    };
};

export interface IAuthStore extends IFruitStore<IAuthState> {
    auth: (login: string, password: string) => void;
    logout: () => void;
}

export class AuthStore extends FruitStore<IAuthState> implements IAuthStore {
    constructor(protected service: IAuthService) {
        super();
        this.data = getInitialStateAuth();
    }

    protected setProcessing = () => {
        const {data} = this;

        this.data = {
            ...data,
            status: EAsyncStatus.PROCESSING
        };

        this.emmitRefresh();
    };

    protected handleAuthSuccess = (data: IAuthData) => {
        this.data = {
            data,
            status: EAsyncStatus.SUCCESS
        };

        this.emmitRefresh();
    };

    protected handleAuthError = (e: Error) => {
        this.data = {
            data: getDefaultAuthData(),
            status: EAsyncStatus.ERROR
        };

        this.emmitRefresh();
    };

    public auth = (login: string, password: string) => {
        this.setProcessing();

        this.service
            .auth(login, password)
            .then(this.handleAuthSuccess)
            .catch(this.handleAuthError)
        ;
    };

    public logout = () => {
        this.data = getInitialStateAuth();
        this.emmitRefresh();
    };
}

export const getAuthStore = fruitMem(
    () => new AuthStore(getAuthService())
);

import {AppConfig} from "../Core/AppConfig";
import {Requests} from "../Core/Requests";
import {EAuthStatus, IAuthData} from "./Models";

export const MOCK_TOKEN = "___MOCK_TOKEN___";

export interface IAuthService {
    isMocksEnabled(): boolean;

    auth(login: string, password: string): Promise<IAuthData>;
}

export class AuthService implements IAuthService {
    public isMocksEnabled = (): boolean => {
        return AppConfig.isMocksEnabled();
    };

    public auth = (login: string, password: string): Promise<IAuthData> => {
        if (!this.isMocksEnabled()) {
            return new Promise<IAuthData>((resolve, reject) => {
                Requests.post<IAuthData>(
                    '/rest/auth',
                    {login, password}
                ).then((data: IAuthData) => {
                    resolve(data);
                }).catch(error => reject(error));
            });
        }

        return new Promise<IAuthData>((resolve, reject) => {
            setTimeout(() => {
                if (login.toLocaleLowerCase() === 'error') {
                    reject(new Error('fake error'));
                    return;
                }

                if (login.toLocaleLowerCase() === 'admin' && password === 'admin') {
                    resolve({
                        isAuth: true,
                        status: EAuthStatus.SUCCESS,
                        token: MOCK_TOKEN,
                        userId: 'root',
                        userName: 'Admin Dev',
                    });
                } else {
                    resolve({
                        isAuth: false,
                        status: EAuthStatus.WRONG_AUTH_DATA,
                    });
                }
            }, AppConfig.mockTimeout());
        });
    };
}

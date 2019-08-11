import {AppConfig} from "../../Core/AppConfig";
import {Requests} from "../../Core/Requests";
import {fruitMem} from "../../FruitState/tools";
import {getListMockData, getMockDetailsData} from "./Mocks";
import {IPhotographerDetails, IPhotographerListItem} from "./Models";

export interface IPhotographerService {
    loadList: () => Promise<IPhotographerListItem[]>;
    loadDetails: (guid: string) => Promise<IPhotographerDetails>;
}

export class PhotographersService implements IPhotographerService {
    public isMocksEnabled = (): boolean => {
        return AppConfig.isMocksEnabled();
    };

    public loadList = (): Promise<IPhotographerListItem[]> => {
        if (!this.isMocksEnabled()) {
            return new Promise<IPhotographerListItem[]>((resolve, reject) => {
                Requests.post<IPhotographerListItem[]>(
                    '/photographers/get-list',
                    {}
                ).then((data: IPhotographerListItem[]) => {
                    resolve(data);
                }).catch(error => reject(error));
            });
        }

        return new Promise<IPhotographerListItem[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(getListMockData());
            }, AppConfig.mockTimeout());
        });
    };

    public loadDetails = (guid: string): Promise<IPhotographerDetails> => {
        if (!this.isMocksEnabled()) {
            return new Promise<IPhotographerDetails>((resolve, reject) => {
                Requests.post<IPhotographerDetails>(
                    '/photographers/get-details',
                    {guid}
                ).then((data: IPhotographerDetails) => {
                    resolve(data);
                }).catch(error => reject(error));
            });
        }

        return new Promise<IPhotographerDetails>((resolve, reject) => {
            setTimeout(() => {
                resolve(getMockDetailsData(guid));
            }, AppConfig.mockTimeout());
        });
    };
}

export const getPhotographersService = fruitMem<IPhotographerService>(
    () => new PhotographersService()
);

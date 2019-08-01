import { Dispatch } from "redux";
import {EAsyncStatus, IAsyncData} from "../Core/Types";
import {IPhotographerDetails, IPhotographerListItem} from "./Models";
import {IPhotographerService} from "./PhotographerService";

export enum EPhotographerActions {
    SET_LIST = "PHOTOGRAPHER_SET_LIST",
    SET_DETAILS = "PHOTOGRAPHER_SET_SET_DETAILS",
}

export interface IPhotographerSetList {
    type: EPhotographerActions.SET_LIST;
    payload: IAsyncData<IPhotographerListItem[]>;
}

export interface IPhotographerSetDetails {
    type: EPhotographerActions.SET_DETAILS;
    payload: IAsyncData<IPhotographerDetails>;
}

export type TPhotographerAction = IPhotographerSetList | IPhotographerSetDetails;

export interface IPhotographersActions {
    loadList: () => void;
    loadDetails: (guid: string) => void;
    closeDetails: () => void;
}

export class PhotographerActions implements IPhotographersActions {
    constructor(protected dispatch: Dispatch<any>, protected service: IPhotographerService) {}

    public loadList = (): void => {
        this.dispatch({
            type: EPhotographerActions.SET_LIST,
            payload: {
                data: [],
                status: EAsyncStatus.PROCESSING
            }
        });

        this.service.loadList().then(data => {
            this.dispatch({
                type: EPhotographerActions.SET_LIST,
                payload: {
                    data,
                    status: EAsyncStatus.SUCCESS
                }
            });
        }).catch(error => {
            this.dispatch({
                type: EPhotographerActions.SET_LIST,
                payload: {
                    data: [],
                    status: EAsyncStatus.ERROR
                }
            });
        });
    };

    public loadDetails = (guid: string) => {
        this.dispatch({
            type: EPhotographerActions.SET_DETAILS,
            payload: {
                data: {guid},
                status: EAsyncStatus.PROCESSING
            }
        });

        this.service.loadDetails(guid).then(data => {
            this.dispatch({
                type: EPhotographerActions.SET_DETAILS,
                payload: {
                    data: {
                        ...data,
                        guid,
                    },
                    status: EAsyncStatus.SUCCESS
                }
            });
        }).catch(error => {
            this.dispatch({
                type: EPhotographerActions.SET_DETAILS,
                payload: {
                    data: {guid},
                    status: EAsyncStatus.ERROR
                }
            });
        });
    };

    public closeDetails = () => {
        this.dispatch({
            type: EPhotographerActions.SET_DETAILS,
            payload: {
                data: {},
                status: EAsyncStatus.SUCCESS
            }
        });
    }
}

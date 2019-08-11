import {memoize} from "lodash";

import {EAsyncStatus} from "../../Core/Types";
import {FruitStore} from "../../FruitState/FruitStore";
import {fruitMem} from "../../FruitState/tools";
import {IFruitStore} from "../../FruitState/types";
import {IPhotographerDetails, IPhotographerListItem, IPhotographersState} from "./Models";
import {getPhotographersService, IPhotographerService} from "./PhotographersService";

const getInitialDetailsState = () => ({
    data: null,
    status: EAsyncStatus.SUCCESS,
});

const getInitialPhotographerState = (): IPhotographersState => {
    return {
        currentDetailsData: getInitialDetailsState(),
        data: [],
        status: EAsyncStatus.SUCCESS,
    };
};

export interface IPhotographersStore extends IFruitStore<IPhotographersState> {
    loadList: () => void;
    loadDetails: (guid: string) => void;
    closeDetails: () => void;
}

export class PhotographersStore extends FruitStore<IPhotographersState> implements IPhotographersStore {
    constructor(protected service: IPhotographerService) {
        super();
        this.data = getInitialPhotographerState();
    }

    // -----------------------------------------------------------------------------------------------------------------

    protected processingLoadDetails = (guid: string) => {
        this.data = {
            ...this.data,
            currentDetailsData: {
                data: {guid},
                status: EAsyncStatus.PROCESSING
            },
        };

        this.emmitRefresh();
    };

    // -----------------------------------------------------------------------------------------------------------------

    public closeDetails = () => {
        this.data = {
            ...this.data,
            currentDetailsData: getInitialDetailsState(),
        };

        this.emmitRefresh();
    };

    // -----------------------------------------------------------------------------------------------------------------

    protected handleLoadDetailsSuccess = memoize((guid: string) => (data: IPhotographerDetails) => {
        this.data = {
            ...this.data,
            currentDetailsData: {
                data: {
                    ...data,
                    guid,
                },
                status: EAsyncStatus.SUCCESS
            },
        };

        this.emmitRefresh();
    });

    protected handleLoadDetailsError = memoize((guid: string) => (e: Error) => {
        this.data = {
            ...this.data,
            currentDetailsData: {
                data: {guid},
                status: EAsyncStatus.ERROR
            },
        };

        this.emmitRefresh();
    });

    public loadDetails = (guid: string) => {
        this.processingLoadDetails(guid);

        this.service
            .loadDetails(guid)
            .then(this.handleLoadDetailsSuccess(guid))
            .catch(this.handleLoadDetailsError(guid))
        ;
    };

    // -----------------------------------------------------------------------------------------------------------------

    protected processingLoadList = () => {
        this.data = {
            ...this.data,
            status: EAsyncStatus.PROCESSING,
        };

        this.emmitRefresh();
    };

    protected handleLoadListSuccess = (data: IPhotographerListItem[]) => {
        this.data = {
            ...this.data,
            data,
            status: EAsyncStatus.SUCCESS,
        };

        this.emmitRefresh();
    };

    protected handleLoadListError = (e: Error) => {
        this.data = {
            ...this.data,
            data: [],
            status: EAsyncStatus.ERROR,
        };

        this.emmitRefresh();
    };

    public loadList = () => {
        this.processingLoadList();

        this.service
            .loadList()
            .then(this.handleLoadListSuccess)
            .catch(this.handleLoadListError)
        ;
    };

    // -----------------------------------------------------------------------------------------------------------------
}

export const getPhotographersStore = fruitMem(
    () => new PhotographersStore(getPhotographersService())
);

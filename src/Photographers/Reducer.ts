import {EAsyncStatus} from "../Core/Types";
import {EPhotographerActions, TPhotographerAction} from "./Actions";
import {IPhotographerState} from "./Models";

export const getInitialStatePhotographers = (): IPhotographerState => {
    return {
        currentDetailsData: {
            data: null,
            status: EAsyncStatus.SUCCESS,
        },
        data: [],
        status: EAsyncStatus.SUCCESS,
    };
};

export const photographersReducer = (
    state: IPhotographerState = getInitialStatePhotographers(),
    action: TPhotographerAction
): IPhotographerState => {
    if (action.type === EPhotographerActions.SET_DETAILS) {
        return {
            ...state,
            currentDetailsData: {
                ...action.payload
            }
        };
    }

    if (action.type === EPhotographerActions.SET_LIST) {
        return {
            ...state,
            ...action.payload,
        };
    }

    return state;
};

import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {TAuthAction} from "../Auth/Actions";
import {IAuthState} from "../Auth/Models";
import {authReducer, getInitialStateAuth} from "../Auth/Reducer";
import {TPhotographerAction} from "../Photographers/Actions";
import {IPhotographerState} from "../Photographers/Models";
import {getInitialStatePhotographers, photographersReducer} from "../Photographers/Reducer";

export type TAllActions = TAuthAction & TPhotographerAction;

export interface IRootState {
    auth: IAuthState;
    photographers: IPhotographerState;
}

export const rootReducer = combineReducers<IRootState, TAllActions>({
    auth: authReducer,
    photographers: photographersReducer,
});

const makeInitialState = (): IRootState => ({
    auth: getInitialStateAuth(),
    photographers: getInitialStatePhotographers(),
});

export const Store = createStore(
    rootReducer,
    makeInitialState(),
    composeWithDevTools({})(applyMiddleware(thunk)),
);

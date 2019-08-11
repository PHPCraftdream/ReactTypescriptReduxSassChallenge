import * as React from "react";

import "../../assets/scss/App.scss";
import {FruitLink} from "../../FruitState/FruitLink";
import {IFruitStoreDict, TFruitComponentProps, TFruitLinkStoresBuilder} from "../../FruitState/types";
import {getAuthStore, IAuthStore} from "../../Modules/Auth/AuthStore";
import {AuthPage} from "../../Modules/Auth/Pages/AuthPage";
import {getPhotographersStore, IPhotographersStore} from "../../Modules/Photographers/PhotographersStore";
import {Routes} from "../Routes";
import {TRender} from "../Types";

interface IOwnProps {}

interface IStoresProps extends IFruitStoreDict {
    authStore: IAuthStore;
    photographersStore: IPhotographersStore;
}

export class AppComponent extends React.Component<TFruitComponentProps<IOwnProps, IStoresProps>> {
    public render(): TRender {
        const {authStore} = this.props.stores;
        const authData = authStore && authStore.getData();

        if (authData && authData.data && authData.data.isAuth) {
            return <Routes/>;
        }

        return <AuthPage authStore={authStore} />;
    }
}

const linkObject: TFruitLinkStoresBuilder<IStoresProps> = () => ({
    authStore: getAuthStore(),
    photographersStore: getPhotographersStore(),
});

export const App = FruitLink<IOwnProps, IStoresProps>(AppComponent, linkObject);

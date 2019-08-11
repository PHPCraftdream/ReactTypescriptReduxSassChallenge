import * as React from "react";
import {TRender} from "../../../Core/Types";
import {FruitLink} from "../../../FruitState/FruitLink";
import {IFruitStoreDict, TFruitComponentProps, TFruitLinkStoresBuilder} from "../../../FruitState/types";
import {PhotographersList} from "../Components/PhotographersList";

import '../Components/PhotographersList.scss';
import {getPhotographersStore, IPhotographersStore} from "../PhotographersStore";

interface IOwnProps {}

interface IStoresProps extends IFruitStoreDict {
    photographersStore: IPhotographersStore;
}

export class PhotographersPageComponent extends React.Component<TFruitComponentProps<IOwnProps, IStoresProps>> {
    public render(): TRender {
        const {photographersStore} = this.props.stores;

        return (
            <div className="photographers-page">
                <div className="photographers-side-bar">
                    <div className="photographers-side-bar-logo" />
                </div>
                <div className="photographers-list-ui">
                    <PhotographersList
                        photographersStore={photographersStore}
                    />
                </div>
            </div>
        );
    }
}

const linkObject: TFruitLinkStoresBuilder<IStoresProps> = () => ({
    photographersStore: getPhotographersStore(),
});

export const PhotographersPage = FruitLink<IOwnProps, IStoresProps>(PhotographersPageComponent, linkObject);

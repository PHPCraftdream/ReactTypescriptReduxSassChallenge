import {isEmpty, memoize} from "lodash";
import * as React from "react";

import {EAsyncStatus, IAsyncData, TRender} from "../../Core/Types";
import {IPhotographersActions} from "../Actions";
import {IPhotographerDetails, IPhotographerListItem, IPhotographerState} from "../Models";

interface IProps {
    photographersState: IPhotographerState;
    photographersActions: IPhotographersActions;
}

export class PhotographersList extends React.Component<IProps> {
    public loadList = () => {
        const {photographersActions} = this.props;
        photographersActions.loadList();
    };

    public componentDidMount(): void {
        this.loadList();
    }

    public toggleDetails = (guid: string) => {
        const {photographersActions, photographersState} = this.props;

        const currentDetailsData = photographersState && photographersState.currentDetailsData;
        const details = currentDetailsData && currentDetailsData.data;
        const detailsGuid = details && details.guid;

        if (!detailsGuid) {
            photographersActions.loadDetails(guid);
            return;
        }

        photographersActions.closeDetails();
        if (detailsGuid !== guid) {
            photographersActions.loadDetails(guid);
        }
    };

    public toggleDetailsMem = memoize((guid: string) => () => {
        this.toggleDetails(guid);
    });

    public listItemRender = (item: IPhotographerListItem) => {
        const name = `${item.name.first} ${item.name.last}`;

        return (
            <div className="photographers-list-item"  key={item.guid}>
                <div className="avatar-container">
                    <img src={item.picture} alt={name} className="avatar"/>
                </div>
                <div className="info-container">
                    <div className="name">{name}</div>
                    <div className="city">{item.city}</div>
                </div>
                <div>
                    <button onClick={this.toggleDetailsMem(item.guid)} className="button-arrow-down">
                        View
                    </button>
                </div>
            </div>
        );
    };

    public renderDetails = (item: IPhotographerListItem, details?: IAsyncData<IPhotographerDetails>) => {
        const name = `${item.name.first} ${item.name.last}`;
        const detData = details && details.data;
        const specialization = detData && detData.specialization;
        const pictures = detData && detData.pictures;

        const avaContainer = (
            <div className="avatar-container">
                <div className="name">{name}</div>
                <div className="city">{item.city}</div>
                <img src={item.picture} alt={name} className="avatar"/>
            </div>
        );

        if (details && details.status === EAsyncStatus.PROCESSING) {
            return (
                <div className="photographers-details-item" key={item.guid}>
                    {avaContainer}
                    <div className="info-specialization">Loading ...</div>
                    <div/>
                </div>
            );
        }

        if (details && details.status === EAsyncStatus.SUCCESS) {
            return (
                <div className="photographers-details-item" key={item.guid}>
                    {avaContainer}
                    <div className="info-specialization">
                        <div className="specialization-title">Specialization</div>
                        {specialization && specialization.map(spec => (
                            <div key={spec} className="specialization-item">{spec}</div>
                        ))}
                    </div>
                    <div className="info-pictures">
                        {pictures && pictures.map(pic => (
                            <div key={pic.url} className="info-picture">
                                <img src={pic.url} alt={pic.url}/>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button onClick={this.toggleDetailsMem(item.guid)} className="button-arrow-down">
                            hide
                        </button>
                    </div>
                </div>
            );
        }
    };

    public renderList(): TRender {
        const {photographersState} = this.props;
        const data = photographersState && !isEmpty(photographersState.data) && photographersState.data;

        const currentDetailsData = photographersState && photographersState.currentDetailsData;
        const detailsStatus = currentDetailsData && currentDetailsData.status;
        const details = currentDetailsData && currentDetailsData.data;
        const detailsGuid = details && details.guid;

        return (
            <div className="photographers-list">
                {data && data.map((item: IPhotographerListItem) => {
                    const showDetails = detailsGuid && detailsGuid === item.guid;

                    if (showDetails) {
                        return this.renderDetails(item, currentDetailsData);
                    } else {
                        return this.listItemRender(item);
                    }
                })}
                <div className="photographers-reload">
                    <button className="button" onClick={this.loadList}>Reload list</button>
                </div>
            </div>
        );
    }

    public render(): TRender {
        const {photographersState} = this.props;

        if (photographersState.status === EAsyncStatus.PROCESSING) {
            return (
                <div>Loading photogrphers ....</div>
            );
        }

        if (photographersState.status === EAsyncStatus.SUCCESS) {
            return this.renderList();
        }
    }
}

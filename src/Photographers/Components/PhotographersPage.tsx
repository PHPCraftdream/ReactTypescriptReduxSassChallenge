import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {IRootState} from "../../Core/Redux";
import {TRender} from "../../Core/Types";
import {IPhotographersActions, PhotographerActions} from "../Actions";
import {IPhotographerState} from "../Models";
import {PhotographerService} from "../PhotographerService";
import {PhotographersList} from "./PhotographersList";

import './PhotographersList.scss';

interface IOwnProps {}

interface IStateProps {
    photographersState: IPhotographerState;
}

interface IDispatchProps {
    photographersActions: IPhotographersActions;
}

type TProps = IOwnProps & IStateProps & IDispatchProps;

export class PhotographersPageComponent extends React.Component<TProps> {
    public render(): TRender {
        return (
            <div className="photographers-page">
                <div className="photographers-side-bar">
                    <div className="photographers-side-bar-logo" />
                </div>
                <div className="photographers-list-ui">
                    <PhotographersList
                        photographersState={this.props.photographersState}
                        photographersActions={this.props.photographersActions}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState, ownProps: IOwnProps): IStateProps => {
    return {
        photographersState : state.photographers,
    };
};

const mapDispatchToProps = (dipatch: Dispatch, ownProps: IOwnProps): IDispatchProps => {
    return {
        photographersActions: new PhotographerActions(dipatch, new PhotographerService()),
    };
};

export const PhotographersPage = connect(
    mapStateToProps, mapDispatchToProps
)(PhotographersPageComponent);

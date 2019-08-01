import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {PhotographersPage} from "../Photographers/Components/PhotographersPage";
import {TRender} from "./Types";

export class Routes extends React.Component {
    public render(): TRender {
        return <BrowserRouter>
            <Switch>
                <Route exact path="/" component={PhotographersPage} />
            </Switch>
        </BrowserRouter>;
    }
}

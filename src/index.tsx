import * as React from "react";
import {render} from "react-dom";
import { Provider } from "react-redux";
import {App} from "./Core/Pages/App";
import {Store} from "./Core/Redux";

const rootEl = document.getElementById("root");

render(
    <Provider store={Store}>
        <App/>
    </Provider>,
    rootEl
);

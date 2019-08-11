import * as React from "react";
import {FVoid, IFruitIRenderCount, IFruitStore, IFruitStoreDict} from "./types";

export class FruitLinkedComponent<IProps>
    extends React.Component<IProps, IFruitIRenderCount> {

    public state: IFruitIRenderCount = {
        renderCount: 0
    };

    protected unmountCallbacks: FVoid[] = [];
    protected storesProps: IFruitStoreDict = {};

    public letsRefresh = () => {
        const renderCount = this.state.renderCount || 0;
        this.setState({renderCount: renderCount + 1});
    };

    public componentDidMount(): void {
        Object.keys(this.storesProps).forEach(key => {
            const store = this.storesProps[key];

            if (store) {
                const unmountCallback = store.subscribe(this.letsRefresh);
                this.unmountCallbacks.push(unmountCallback);
            }
        });
    }

    public componentWillUnmount(): void {
        this.unmountCallbacks.forEach(func => func());
        this.unmountCallbacks = [];
    }
}

import * as React from "react";
import {
    FruitLinkedComponent,
} from "./FruitLinkedComponent";
import {IFruitStoreDict, TFruitComponentProps, TFruitLinkStoresBuilder} from "./types";

export function FruitLink<IComponentPassProps, IComponentStoreProps extends IFruitStoreDict>(
    Comp: React.ComponentClass<TFruitComponentProps<IComponentPassProps, IComponentStoreProps>, any>,
    linkObject: TFruitLinkStoresBuilder<IComponentStoreProps>
): React.ComponentClass<IComponentPassProps> {

    return class extends FruitLinkedComponent<IComponentPassProps> {
        protected storesProps: IComponentStoreProps = {} as IComponentStoreProps;

        constructor(props: IComponentPassProps) {
            super(props);
            this.storesProps = linkObject();
        }

        public render(): React.ReactNode {
            const {renderCount} = this.state;
            const passProps = this.props;
            const stores = this.storesProps;

            return <Comp {...passProps} stores={stores} renderCount={renderCount}/>;
        }
    };
}

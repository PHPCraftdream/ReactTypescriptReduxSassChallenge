export type FVoid = () => void;

export interface IMap<T> {
    [key: string]: T;
}

export interface IVoidFuncMap extends IMap<FVoid> {}

export interface IFruitStore<TData extends {}> {
    subscribe: (callback: FVoid) => FVoid;
    getData(): TData;
}

export interface IFruitStoreDict {
    [key: string]: IFruitStore<any>;
}

export interface IFruitIRenderCount {
    renderCount?: number;
}

export type TFruitComponentProps<PROPS extends {}, STORES extends IFruitStoreDict> = IFruitIRenderCount & PROPS & {
    stores: STORES;
};

export type TFruitLinkStoresBuilder<IStoresProps extends IFruitStoreDict> = () => IStoresProps;

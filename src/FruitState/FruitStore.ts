import {FVoid, IFruitStore, IVoidFuncMap} from "./types";

export class FruitStore<TData extends {}> implements IFruitStore<TData> {
    protected callbacks: IVoidFuncMap = {};
    protected data: TData = {} as TData;
    protected lastCallbackIndex: string = "0";

    constructor() {}

    protected emmitRefresh() {
        Object.keys(this.callbacks).forEach(key => {
            this.callbacks[key]();
        });
    }

    public getData(): TData {
        return this.data;
    }

    public subscribe = (callback: FVoid): FVoid => {
        const newIndex = String(Number(this.lastCallbackIndex) + 1);
        this.callbacks[newIndex] = callback;
        this.lastCallbackIndex = newIndex;

        return () => {
            delete this.callbacks[newIndex];
        };
    }
}

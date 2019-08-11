import { FetchError } from "node-fetch";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type TReactRenderA = React.ReactElement<any, string | React.JSXElementConstructor<any>>;
type TReactRenderB = React.ReactNodeArray | React.ReactPortal | React.ReactFragment;

export type TRender = TReactRenderA | TReactRenderB | null | undefined;

export enum EAsyncStatus {
    PROCESSING = "PROCESSING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

export interface IAsyncData<DataType> {
    data?: DataType | null;
    error?: FetchError;
    status: EAsyncStatus;
}

export interface IHTMLInputElementType
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export interface IHTMLInputElementProps extends Omit<IHTMLInputElementType, "onChange" | "value"> {
    addClassName?: string;
    className?: string;
    initialValue?: string;
    value?: string;
    onChange?: TOnChangeFunc;
}

/**
 * false - не обновлять
 * string - установить значения
 * true | void | undefined | null - обновить
 */
export type TOnChangeResult = boolean | string | void | undefined | null;

export type TOnChangeFunc = (value: string, name?: string) => TOnChangeResult;

export interface IDictionary<T> {
    [key: string]: T;
}

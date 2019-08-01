import {isFunction, isString} from "lodash";
import * as React from "react";

import {IHTMLInputElementProps, TOnChangeResult, TRender} from "../Types";

interface IHTMLInputElementState {
    value?: string;
}

export class Input extends React.Component<IHTMLInputElementProps, IHTMLInputElementState> {
    public static getDerivedStateFromProps(
        props: IHTMLInputElementProps,
        state: IHTMLInputElementState
    ): Partial<IHTMLInputElementState> | null {
        if (isString(props.value) && props.value !== state.value) {
            return {value: props.value};
        }
        return null;
    }

    constructor(props: IHTMLInputElementProps) {
        super(props);

        this.state = {
            value: props.value || props.initialValue || ''
        };
    }

    public onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, onChange} = this.props;
        const {value} = e.target;

        if (isFunction(onChange)) {
            const onChangeResult: TOnChangeResult = onChange(value, name);

            if (isString(onChangeResult)) {
                this.setState({value: onChangeResult});
            } else {
                if (onChangeResult !== false) {
                    this.setState({value});
                }
            }
        } else {
            this.setState({value});
        }
    };

    public render(): TRender {
        const {addClassName, className, onChange, initialValue, ...props} = this.props;
        const {value} = this.state;

        let classNames = className || 'input';
        if (addClassName) {
            classNames += addClassName;
        }

        return <input className={classNames} onChange={this.onChangeHandle} value={value} {...props} />;
    }

}

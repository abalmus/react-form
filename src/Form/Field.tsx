import * as React from 'react';
import { Input, Select, TextArea } from './elements/index';
import ErrorContainer from './ErrorContainer';

const elements = {
    checkbox: Input,
    color: Input,
    email: Input,
    number: Input,
    select: Select,
    submit: Input,
    tel: Input,
    text: Input,
    password: Input,
    textarea: TextArea,
};

export namespace FormField {
    export interface Props {
        component?: React.Component;
        errors?: string[];
        handleOnBlur?: (event: Event, name: string) => any;
        handleOnChange?: (event: Event, name: string) => any;
        handleOnClick?: (event: Event, name: string) => any;
        label?: string;
        name: string;
        options?: string[] | Array<object> | string;
        placeholder?: string;
        type: string;
        value?: string;
    }

    export interface State {
        changed: boolean;
        clicked: boolean;
        dirty: boolean;
        errors: any[];
        value: string;
    };
}

export class Field extends React.Component<FormField.Props, FormField.State> {
    state: FormField.State = {
        changed: false,
        clicked: false,
        dirty: false,
        errors: [],
        value: this.props.value || '',
    };

    componentWillReceiveProps(nextProps): void {
        if (nextProps.errors !== this.state.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    handleOnBlur(event, name): void {
        this.setState((prevState, props) => ({
            dirty: true,
        }));

        this.props.handleOnBlur(event, name);
    }

    handleOnChange(event, name): void {
        event.persist();

        this.setState((prevState, props) => ({
            changed: true,
            value: event.target.value,
        }));

        this.props.handleOnChange(event, name);
    }

    handleOnClick(event, name): void {
        this.setState((prevState, props) => ({
            clicked: true,
        }));

        this.props.handleOnClick(event, name);
    }

    render() {
        const {
            errors,
            value,
        } = this.state;

        const component = getComponent(this.props.type, {
            ...this.props,
            changed: this.state.changed,
            clicked: this.state.clicked,
            dirty: this.state.dirty,
            handleOnBlur: (event) => this.handleOnBlur(event, this.props.name),
            handleOnChange: (event) => this.handleOnChange(event, this.props.name),
            handleOnClick: (event) => this.handleOnClick(event, this.props.name),
            value,
        });

        return (
            <ErrorContainer errors={ errors }>{ component }</ErrorContainer>
        );
    }
}

function getComponent(type, props) {
    if (typeof elements[type] === 'undefined') {
        console.error('Field type: ' + type + ' doesn\'t exist');
        return null;
    }

    const element = elements[type](props);
    return React.isValidElement(element) ? element : null;
}

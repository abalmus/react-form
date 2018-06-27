import * as React from 'react';
import { map, isPlainObject, isArray, isString } from 'lodash';

export namespace Select {
    export interface Option {
        value: string;
        label: string;
    }
}

export const Select = (props) => {
    const {
        name,
        label,
        placeholder,
        handleOnClick,
        handleOnChange,
        handleOnBlur,
        options,
        value,
        disabled,
    } = props;

    const classList = [
        (props.changed ? 'changed' : ''),
        (props.clicked ? 'clicked' : ''),
        (props.dirty ? 'dirty' : ''),
    ];

    const defaultOption = getDefaultOption(placeholder) || '';

    return <div className={classList.join(' ')}>
        <label> {label}
            <select id={name}
                name={name}
                onClick={handleOnClick}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                value={value} disabled={disabled}>

                { defaultOption }

                {
                    adaptOptions(options).map(option => {
                        return <option key={option.value.toLowerCase()} value={option.value}>{option.label}</option>;
                    })
                }
            </select>
        </label>
    </div>;
};

function getDefaultOption(placeholder: string): JSX.Element {
    let option: JSX.Element;

    if (placeholder) {
        if (placeholder) {
            option = <option>{ placeholder }</option>;
        }
    }

    return option;
};

function adaptOptions(options): Select.Option[] {
    if (isString(options)) {
        return adaptStringValue(options);
    }

    if (isArray(options)) {
        return adaptArrayValue(options);
    }

    if (isPlainObject(options)) {
        return adaptObjectValue(options);
    }

    return [];
};

function adaptStringValue(options: string): Select.Option[] {
    const optionsAfterSplit = options.split(',');

    return map(optionsAfterSplit, option => ({
        label: option.trim().toLowerCase(),
        value: option.trim(),
    }));
}

function adaptArrayValue(options: any[]): Select.Option[] {
    return map(options, option => {
        return (isString(option) ? adaptStringValue(option)[0] : adaptObjectValue(option));
    });
}

function adaptObjectValue(options: any): Select.Option[] {
    return options;
}

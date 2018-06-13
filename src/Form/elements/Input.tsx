import * as React from 'react';

export interface InputProps {
    handleOnBlur: () => any;
    handleOnChange: () => any;
    handleOnClick: () => any;
    changed: boolean;
    clicked: boolean;
    dirty: boolean;
    label: string;
    name: string;
    placeholder: string;
    type: string;
    value: string;
}

export const Input: React.StatelessComponent<InputProps> = (props) => {
    const classList = [
        (props.changed ? 'changed' : ''),
        (props.clicked ? 'clicked' : ''),
        (props.dirty ? 'dirty' : ''),
    ];

    const {
        handleOnBlur,
        handleOnChange,
        handleOnClick,
        label,
        name,
        placeholder,
        type,
        value,
    } = props;

    return (
        <div className={classList.join(' ')}>
            <label>
                <span>{label}</span>
                <input type={type}
                    onClick={handleOnClick}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    name={name}
                    value={value}
                    placeholder={placeholder} />
            </label>
        </div>
    );
};

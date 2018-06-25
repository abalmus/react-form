import * as React from 'react';

export namespace FormSubmit {
    export interface Props {
        label?: string;
        enabled?: boolean;
        processing?: boolean;
        disableCondition?: boolean;
    }
}

export class Submit extends React.Component<FormSubmit.Props> {
    render() {
        const {
            label,
            enabled,
            processing,
            disableCondition
        } = this.props;

        const disabled = enabled ? processing : processing || disableCondition;

        return (
            <button
                type="submit"
                disabled={disabled}>
                {label}
            </button>
        );
    }
}

import * as React from 'react';
import { keys, first, isEmpty, map, forIn, filter } from 'lodash';
import { PropTypes } from 'prop-types';
import { Field } from './Field';
import { ValidationProcessor  } from '@tacitknowledge/validator';
import { ValidationDecorator } from './ValidationDecorator';
import { Children } from '@tacitknowledge/react-utils';

function formSubmit(options: object) {
    // will be in request library
    console.log(options);
}

export interface FormProps {
    validationRules: ValidationRules;
    validateOn: string | Array<string>;
    children: any;
    action: string;
    method: string;
    ajax: boolean;
}

export interface FormState {
    errors: any[];
}

interface DefaultProps {
    action: string;
    method: string;
    validateOn: string | Array<string>;
    submitLabel: string;
}

export interface ValidationRules {
    messages: object;
    rules: object;
}

export interface IForm {
    validateOn: string | Array<string>;
    errors?: any[];
    formState: object;
    onSubmitHandler(event: Event): void;
    populateFormState(children: React.ReactElement<any>): any;
    validationProcessor?: ValidationProcessor;
}

/**
 * Form component with *Validation*.
 */
@ValidationDecorator
export class Form extends React.Component <FormProps & DefaultProps, FormState> implements IForm {
    validateField?(fieldName: string, value: any): void;
    validateForm?(cb: Function): void;

    static Field = Field;

    static propTypes = {
        /** "action" - to ba passes as form action. */
        action: PropTypes.string.isRequired,
        /** "submitLabel" - will be set as label of submit button */
        submitLabel: PropTypes.string,
        /** children - all children between Form tags */
        children: PropTypes.arrayOf(PropTypes.element),
        /** "method" - to ba passes as form method (POST, GET). */
        method: PropTypes.string,
        /** "validateOn" - array of hooks to trigger validation process ['submit', "blur", "click"]*/
        validateOn: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        action: '/',
        method: 'POST',
        validateOn: ['submit'],
        submitLabel: 'Submit'
    };

    state = {
        errors: [],
    };

    formState: object = {};
    validateOn = '';

    constructor(props) {
        super(props);

        this.validateOn = props.validateOn;
        this.populateFormState(filter(props.children, child => child.type === Field));

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    shouldComponentUpdate(nextProps, nextStates) {
        return this.state.errors !== nextStates.errors;
    }

    onFieldChangedHandler(event, fieldName) {
        this.formState[fieldName] = event.target.value;

        this.proofValidation('change', () => {
            this.validateField(fieldName, event.target.value);
        });
    }

    onSubmitHandler(event) {
        const { ajax } = this.props;

        event.preventDefault();

        this.proofValidation('submit', () => {
            this.validateForm(errors => {
                if (errors.length) return false;

                formSubmit({
                    ajax: Boolean(ajax),
                    formData: this.formState
                });
            });
        });
    }

    onFieldClickedHandler(event, fieldName) {
        this.proofValidation('click', () => {
            this.validateField(fieldName, event.target.value);
        });
    }

    onFieldBlurHandler(event, fieldName) {
        this.proofValidation('blur', () => {
            this.validateField(fieldName, event.target.value);
        });
    }

    render() {
        const {
            action,
            method,
            submitLabel,
        } = this.props;

        return (
            <form action={action} method={method} onSubmit={this.onSubmitHandler}>
                {
                    this.renderChildren(this.props, this.state, {
                        handleOnBlur: this.onFieldBlurHandler.bind(this),
                        handleOnChange: this.onFieldChangedHandler.bind(this),
                        handleOnClick: this.onFieldClickedHandler.bind(this),
                    })
                }
                <button type="submit">{submitLabel}</button>
            </form>
        );
    }

    populateFormState(children: React.ReactElement<any>) {
        if (isEmpty(this.formState)) {
            return map(children, child => {
                this.formState[child.props.name] = child.props.value;
            });
        }
    }

    private proofValidation(handleType, validate) {
        return this.validateOn.indexOf(handleType) !== -1 ?
            validate() :
            null;
    }

    private extractErrors(errors: any[], child) {
        const result = errors.filter(error => keys(error).indexOf(child.props.name) !== -1);
        return first(result) ? first(result)[child.props.name] : [];
    }

    private renderChildren(formProps, formState, childProps) {
        const {
            handleOnBlur,
            handleOnChange,
            handleOnClick,
        } = childProps;

        const {
            errors,
        } = formState;

        return Children.deepMap(formProps.children, child => {
            if (child.type === Field) {
                return React.cloneElement(child as React.ReactElement<any>, {
                    errors: this.extractErrors(errors, child),
                    handleOnBlur,
                    handleOnChange,
                    handleOnClick,
                });
            } else {
                return child;
            }
        });
    }
}

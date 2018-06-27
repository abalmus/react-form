import * as React from 'react';
import { keys, first, isEmpty, map, forIn, filter, pickBy } from 'lodash';
import { PropTypes } from 'prop-types';
import { Field } from './Field';
import { Submit } from './Submit';
import { Behavior } from './Behavior';
import { ValidationProcessor  } from '@tacitknowledge/validator';
import { ValidationDecorator } from './ValidationDecorator';
import { Children } from '@tacitknowledge/react-utils';

interface submitHandler {
    (options: object): Promise<any>;
}

interface submitSuccess {
    (options: object): any;
}

interface submitError {
    (options: object): any;
}

export interface FormProps {
    validationRules: ValidationRules;
    validateOn: string | Array<string>;
    children: any;
    action: string;
    method: string;
    ajax: boolean;
    submitHandler: submitHandler;
    submitSuccess: submitSuccess;
    submitError: submitError;
}

export interface FormState {
    errors: any[];
    processing: boolean;
    formValid: boolean;
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
    validateFormSilently?(cb: Function): void;

    static Field = Field;
    static Submit = Submit;
    static Behavior = Behavior;

    static propTypes = {
        /** "action" - to ba passes as form action. */
        action: PropTypes.string.isRequired,
        /** "submitLabel" - will be set as label of submit button */
        submitLabel: PropTypes.string,
        /** "submitHandler" - handle form submit is required */
        submitHandler: PropTypes.func.isRequired,
        /** "submitSuccess" - handle success form submission */
        submitSuccess: PropTypes.func,
        /** "submitError" - handle error form submission */
        submitError: PropTypes.func,
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
        submitLabel: 'Submit',
        submitHandler: () => { throw new Error('Please provide submit handler'); }
    };

    state = {
        processing: false,
        errors: [],
        formValid: false
    };

    formState: object = {};
    validateOn = '';
    submitCtaProps = {};

    constructor(props) {
        super(props);

        this.validateOn = props.validateOn;
        this.populateFormState(filter([].slice.call(props.children), child => child.type === Field));

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.submitSuccess = this.submitSuccess.bind(this);
        this.submitError = this.submitError.bind(this);
    }

    shouldComponentUpdate(nextProps, nextStates) {
        return this.state.errors !== nextStates.errors
            || this.state.processing !== nextStates.processing;
    }

    onFieldChangedHandler(event, fieldName) {
        this.formState[fieldName] = event.target.value;

        this.proofValidation('change', () => {
            this.validateField(fieldName, event.target.value);
        });

        this.validateFormSilently((errors) => {
            this.setState({
                formValid: isEmpty(pickBy(errors, (error) => !isEmpty(error)))
            })
        })
    }

    onSubmitHandler(event) {
        const { ajax, submitHandler } = this.props;

        event.preventDefault();

        this.setProcessing(true);

        this.proofValidation('submit', () => {
            this.validateForm(errors => {
                if (errors.length) {
                    this.setProcessing(false);
                    return false;
                }

                submitHandler({
                    ajax: Boolean(ajax),
                    formData: this.formState
                }).then(this.submitSuccess, this.submitError)
                .catch(this.submitError);
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

    private submitSuccess(payload) {
        const {
            submitSuccess
        } = this.props;

        this.setProcessing(false);

        if (typeof submitSuccess === 'function') {
            submitSuccess(payload);
        }
    }

    private submitError(error) {
        const {
            submitError
        } = this.props;

        this.setProcessing(false);

        if (typeof submitError === 'function') {
            submitError(error);
        }
    }

    private setProcessing(processing = false) {
        this.setState({ processing });
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
            formValid,
            processing
        } = formState;

        return Children.deepMap(formProps.children, child => {
            switch(child.type) {
                case Field:
                    return React.cloneElement(child as React.ReactElement<any>, {
                        errors: this.extractErrors(errors, child),
                        handleOnBlur,
                        handleOnChange,
                        handleOnClick,
                    });
                case Submit:
                    return React.cloneElement(child as React.ReactElement<any>, {
                        disableCondition: !formValid,
                        processing
                    });
                case Behavior:
                    return React.cloneElement(child as React.ReactElement<any>, {
                        processing,
                        formValid,
                        formState: this.formState
                    });
                default:
                    return child;
            }
        });
    }
}

import { ValidationProcessor, ErrorsPopulator } from '@tacitknowledge/validator';
import { normalizeErrors } from './utils/errors';

export function ValidationDecorator<T extends {new(...args: any[]): any}>(constructor: T) {
    return class Form extends constructor {
        validationProcessor = new ValidationProcessor(this.props.validationRules, {
            dependsOnValues: this.formState,
        });

        errorsPopulator = new ErrorsPopulator(this.validationProcessor);
        silentErrors = {};

        public validateField(fieldName: string, value: any, silently: boolean = false) {
            this.validationProcessor.validate(fieldName, value);

            return this.errorsPopulator.getByField(fieldName).then((errors) => {
                if (silently) {
                    const filedErrors = { [fieldName]: errors };

                    this.silentErrors = Object.assign({}, this.silentErrors, filedErrors);

                    return filedErrors;
                }

                this.populateErrors(errors, fieldName);
            });
        }

        public validateForm(cb: Function) {
            const fieldsToValidate = [];

            for (const key in this.formState) {
                fieldsToValidate.push(this.validateField(key, this.formState[key]));
            };

            Promise.all(fieldsToValidate).then(() => {
                const {
                    errors,
                } = this.state;

                cb.call(this, errors);
            });
        }

        public validateFormSilently(cb: Function) {
            const fieldsToValidate = [];

            for (const key in this.formState) {
                fieldsToValidate.push(this.validateField(key, this.formState[key], true));
            };

            Promise.all(fieldsToValidate).then(() => {
                cb && typeof cb === 'function' && cb.call(this, this.silentErrors);
            });
        }

        private populateErrors(errors, fieldName) {
            this.setState(prevState => {
                return normalizeErrors(prevState, errors, fieldName);
            });
        }
    };
}

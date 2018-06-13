import { ValidationProcessor, ErrorsPopulator } from '@tacitknowledge/validator';
import { normalizeErrors } from './utils/errors';

export function ValidationDecorator<T extends {new(...args: any[]): any}>(constructor: T) {
    return class Form extends constructor {
        validationProcessor = new ValidationProcessor(this.props.validationRules, {
            dependsOnValues: this.formState,
        });

        errorsPopulator = new ErrorsPopulator(this.validationProcessor);

        public validateField(fieldName: string, value: any) {
            this.validationProcessor.validate(fieldName, value);

            return this.errorsPopulator.getByField(fieldName).then((errors) => {
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

        private populateErrors(errors, fieldName) {
            this.setState(prevState => {
                return normalizeErrors(prevState, errors, fieldName);
            });
        }
    };
}

import { filter } from 'lodash';

export const normalizeErrors = (state, errors: any[], fieldName: string): any => {
    return { errors: errors.length ?
            [{[fieldName]: errors}, ...filter(state.errors, error => !error[fieldName])] :
            filter(state.errors, error => !error[fieldName]),
    };
}

const KNOWN_BEHAVIORS = [
    'hideIf',
    'showIf',
    'disableIf'
];

const EQUALITY_OPTIONS = [
    'equal',
    'oneOf',
    'notEmpty',
    'regex'
];

const equalityCheck = (equals, oneOf, notEmpty, regex) => (value, formState) => {
    if (equals) {
        return formState[value] === equals;
    }

    if (oneOf && oneOf instanceof Array) {
        return oneOf.indexOf(formState[value]) !== -1;
    }

    if (regex && regex instanceof RegExp) {
        return regex.test(formState[value]);
    }

    if (notEmpty) {
        return !!formState[value];
    }

    return false;
}

export const behaviorDetector = (props) => {
    const {
        equals,
        formState,
        oneOf,
        notEmpty,
        regex
    } = props;

    const behaviorsToApply = {};
    const equality = equalityCheck(equals, oneOf, notEmpty, regex);

    KNOWN_BEHAVIORS
        .filter(behavior => props[behavior])
        .map(behavior => {
            behaviorsToApply[behavior] = (typeof props[behavior] === 'function') ?
            props[behavior](formState) :
            equality(props[behavior], formState)
    });

    return behaviorsToApply;
}

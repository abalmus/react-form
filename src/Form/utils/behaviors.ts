const KNOWN_BEHAVIORS = [
    'hideIf',
    'showIf',
    'disableIf'
];

const equalityCheck = (equal, oneOf) => (value, formState) => {
    if (equal) {
        return formState[value] === equal;
    }

    return oneOf.indexOf(formState[value]) !== -1;
}

export const behaviorDetector = (props) => {
    const {
        equals,
        formState,
        oneOf,
    } = props;

    const behaviorsToApply = {};
    const equality = equalityCheck(equals, oneOf);

    KNOWN_BEHAVIORS
        .filter(behavior => props[behavior])
        .map(behavior => {
            behaviorsToApply[behavior] = equality(props[behavior], formState)
    });

    return behaviorsToApply;
}

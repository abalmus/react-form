import * as React from 'react';
import { map } from 'lodash';
import * as behaviors from './utils/behaviors';

export namespace FormSubmit {
    export interface Props {
        children: React.ReactChild;
        hideIf?: string;
        showIf?: string;
        disableIf?: string;
        classIf?: string;
        equals?: string;
        oneOf?: string[];
        formState: object;
        processing: boolean;
    }
}

export class Behavior extends React.Component<FormSubmit.Props> {
    render() {
        const {
            hideIf,
            showIf,
            children
        } = this.props;

        const behaviorsToApply: any = behaviors.behaviorDetector(this.props);
        const childProps: any = {};

        let visibility: boolean = showIf && !hideIf ? false : true;

        if (behaviorsToApply.showIf) {
            visibility = true;
        }

        if (behaviorsToApply.hideIf) {
            visibility = false;
        }

        if (behaviorsToApply.disableIf) {
            childProps.disabled = true;
        }

        return (
            <section className="behavior">
                {
                    visibility ?
                    map(children, child => React.cloneElement(child as React.ReactElement<any>, childProps)) :
                    null
                }
            </section>
        );
    }
}

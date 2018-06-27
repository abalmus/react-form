import * as React from 'react';
import { map } from 'lodash';

export namespace FormSubmit {
    export interface Props {
        children: React.ReactChild;
    }
}

export class Group extends React.Component<FormSubmit.Props> {
    render() {
        const {
            children
        } = this.props;

        return (
            <section className="group">
                {
                    map(children, child => React.cloneElement(child as React.ReactElement<any>, {...this.props}))
                }
            </section>
        );
    }
}

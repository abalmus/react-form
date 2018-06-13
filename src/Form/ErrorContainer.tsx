import * as React from 'react';
import { values } from 'lodash';

export default function ErrorContainer(props): JSX.Element {
    if (props.errors.length) {
        return (
            <div className="errors">
                {props.children}
                {
                    props.errors.map((error, index) => {
                        return (
                            <small className="error" key={index}>
                                {
                                    values(error)
                                }
                            </small>
                        );
                    })
                }
            </div>
        );
    } else {
        return <div>{props.children}</div>;
    }
};

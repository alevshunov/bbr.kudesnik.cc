import * as React from 'react';
import classNames from 'classnames';

type Props = {
    locked: boolean,
    onToggle: (state: boolean) => void
};

export class LockIcon extends React.Component<Props> {
    render() {
        const { locked, onToggle } = this.props;

        return (
            <i
                className={classNames('fas', {'fa-lock': locked, 'fa-lock-open': !locked})}
                onClick={() => onToggle(!locked)}
            />
        );
    }
}
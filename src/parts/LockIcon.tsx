import * as React from 'react';
import fa from './components/FontAwesome';
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
                className={classNames({[fa.lock]: locked, [fa.unlock]: !locked})}
                onClick={() => onToggle(!locked)}
            />
        );
    }
}
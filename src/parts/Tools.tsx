import * as React from 'react';
import styles from './Tools.scss';
import classNames from 'classnames';
import fa from './components/FontAwesome';

type Props = {
    onPlusClick: () => void,
    onMinusClick: () => void,
    onResetClick: () => void,
    className?: string
};

export class Tools extends React.Component<Props> {
    render() {
        return (
            <div className={classNames(styles.container, this.props.className)}>
                <i
                    className={fa.plus}
                    onClick={this.props.onPlusClick}
                />
                <i
                    className={fa.clear}
                    onClick={this.props.onResetClick}
                />
                <i
                    className={fa.minus}
                    onClick={this.props.onMinusClick}
                />
            </div>
        );
    }
}
import * as React from 'react';
import styles from './Tools.scss';
import classNames from 'classnames';

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
                    className="fas fa-minus-circle"
                    onClick={this.props.onPlusClick}
                />
                <i
                    className="fas fa-times-circle"
                    onClick={this.props.onResetClick}
                />
                <i
                    className="fas fa-plus-circle"
                    onClick={this.props.onMinusClick}
                />
            </div>
        );
    }
}
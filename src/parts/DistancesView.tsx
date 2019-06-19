import * as React from 'react';
import classNames from 'classnames';
import { yardToGroupAdult, yardToGroupJunior, yardToMeter } from '../core/YardTools';
import styles from './DistancesView.scss';
import coreStyles from './Common.scss';
import { Tools } from './Tools';
import { LockIcon } from './LockIcon';
import { Entry } from '../core/types/All';

type Props = {
    data: Entry[],
    locked: boolean,
    onSetLock: (lock: boolean) => void
    onYardIncrease: (e: Entry, delta?: number) => void
    onValueIncrease: (e: Entry, delta?: number) => void
    onValueReset: (e: Entry) => void
};

class DistancesView extends React.PureComponent<Props> {
    render() {
        const { data, locked, onSetLock, onYardIncrease, onValueIncrease, onValueReset } = this.props;
        return (
            <table className={styles.container}>
                <thead>
                <tr>
                    <th>Yard</th>
                    <th>Meter</th>
                    <th colSpan={2}>Group</th>
                    <th>#</th>
                    <th className={styles.tools}>
                        <LockIcon locked={locked} onToggle={onSetLock} />
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(
                        (e, index) => (
                            <tr key={index}>
                                <td className={styles.yard}>
                                    <i
                                        className={classNames('fas fa-minus-circle', {[coreStyles.hidden]: locked})}
                                        onClick={() => onYardIncrease(e, -1)}
                                    />
                                    {e.yard}
                                    <i
                                        className={classNames('fas fa-plus-circle', {[coreStyles.hidden]: locked})}
                                        onClick={() => onYardIncrease(e, 1)}
                                    />
                                </td>
                                <td className={styles.meter}>{yardToMeter(e.yard)}</td>
                                <td className={styles.group}>{yardToGroupAdult(e.yard)}</td>
                                <td className={styles.group}>{yardToGroupJunior(e.yard)}</td>
                                <td className={styles.value}>{e.value}</td>
                                <td className={styles.tools}>
                                    <Tools
                                        className={classNames({[coreStyles.hidden]: locked})}
                                        onPlusClick={() => onValueIncrease(e, -0.5)}
                                        onResetClick={() => onValueReset(e)}
                                        onMinusClick={() => onValueIncrease(e, 0.5)}
                                    />
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        );
    }
}

export default DistancesView;

import * as React from 'react';
import classNames from 'classnames';
import { yardToGroupAdult, yardToGroupJunior, yardToMeter } from '../core/YardTools';
import styles from './DistancesView.scss';
import coreStyles from './Common.scss';
import { Tools } from './Tools';
import { LockIcon } from './LockIcon';
import { Marker } from '../core/types/All';

type Props = {
    data: Marker[],
    locked: boolean,
    onLockToggle: (lock: boolean) => void
    onYardIncrease: (e: Marker) => void
    onYardDecrease: (e: Marker) => void
    onValueIncrease: (e: Marker) => void
    onValueDecrease: (e: Marker) => void
    onValueReset: (e: Marker) => void
};

class DistancesView extends React.PureComponent<Props> {
    render() {
        const {
            data,
            locked,
            onLockToggle,
            onYardIncrease,
            onYardDecrease,
            onValueIncrease,
            onValueDecrease,
            onValueReset
        } = this.props;

        return (
            <table className={styles.container}>
                <thead>
                <tr>
                    <th>Yard</th>
                    <th>Meter</th>
                    <th colSpan={2}>Group</th>
                    <th>#</th>
                    <th className={styles.tools}>
                        <LockIcon locked={locked} onToggle={onLockToggle} />
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
                                        onClick={() => onYardDecrease(e)}
                                    />
                                    {e.yard}
                                    <i
                                        className={classNames('fas fa-plus-circle', {[coreStyles.hidden]: locked})}
                                        onClick={() => onYardIncrease(e)}
                                    />
                                </td>
                                <td className={styles.meter}>{yardToMeter(e.yard)}</td>
                                <td className={styles.group}>{yardToGroupAdult(e.yard)}</td>
                                <td className={styles.group}>{yardToGroupJunior(e.yard)}</td>
                                <td className={styles.value}>{e.value}</td>
                                <td className={styles.tools}>
                                    <Tools
                                        className={classNames({[coreStyles.hidden]: locked})}
                                        onPlusClick={() => onValueIncrease(e)}
                                        onResetClick={() => onValueReset(e)}
                                        onMinusClick={() => onValueDecrease(e)}
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

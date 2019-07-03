import * as React from 'react';
import classNames from 'classnames';
import coreStyles from './Common.scss';
import * as styles from './DistancesView.scss';
import { Tools } from './Tools';
import { LockIcon } from './LockIcon';
import { Entry } from '../core/types/All';
import { IFAAGroup, YardTools } from '../core/YardTools';
import TableReport, { Align } from './components/TableReport';

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
        const dataWithYardTools = data.map(d => ({source: d, tools: new YardTools(d.yard)}));

        return (
            <TableReport
                userCls={styles.container}
                cells={
                    [
                        {
                            title: 'Yard',
                            field: 'yard',
                            align: Align.center,
                            userCls: styles.yard,
                            render: (item) => (
                                <>
                                    <i
                                        className={classNames('fas fa-minus-circle', {[coreStyles.hidden]: locked})}
                                        onClick={() => onYardIncrease(item.source, -1)}
                                    />
                                    {item.source.yard}
                                    <i
                                        className={classNames('fas fa-plus-circle', {[coreStyles.hidden]: locked})}
                                        onClick={() => onYardIncrease(item.source, 1)}
                                    />
                                </>
                            )
                        },
                        {
                            title: 'Meter',
                            field: 'meter',
                            align: Align.center,
                            userCls: styles.meter,
                            render: (item) => item.tools.toMeter()
                        },
                        {
                            title: 'GA',
                            field: 'ga',
                            align: Align.center,
                            userCls: styles.group,
                            render: (item) => item.tools.toGroup(IFAAGroup.Adult)
                        },
                        {
                            title: 'GJ',
                            field: 'gj',
                            align: Align.center,
                            userCls: styles.group,
                            render: (item) => item.tools.toGroup(IFAAGroup.Junior),
                            hidden: true
                        },
                        {
                            title: '#',
                            field: 'value',
                            userCls: styles.value,
                            render: (item) => item.source.value,
                            align: Align.center
                        },
                        {
                            title: <LockIcon locked={locked} onToggle={onSetLock} />,
                            field: 'tools',
                            userCls: styles.tools,
                            align: Align.right,
                            render: (item) => (
                                <Tools
                                    className={classNames({[coreStyles.hidden]: locked})}
                                    onPlusClick={() => onValueIncrease(item.source, -0.5)}
                                    onResetClick={() => onValueReset(item.source)}
                                    onMinusClick={() => onValueIncrease(item.source, 0.5)}
                                />
                            )
                        }
                    ]
                }
                data={
                    dataWithYardTools
                }
            />
        );
    }
}

export default DistancesView;

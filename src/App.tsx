import * as React from 'react';
import styles from './App.css';

type Props = {

};

type Entry = {
    meter: number,
    yard: number,
    groupA?: number,
    groupJ?: number,
    value: number
};

type State = {
    data: Entry[],
    locked: boolean
};

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        function fill(yard: number, value: number = 0): Entry {
            return {
                yard,
                meter: Math.round(yard / 1.094),
                groupA: yard > 60 ? undefined : yard > 45 ? 1 : yard > 35 ? 2 : yard > 20 ? 3 : 4,
                groupJ: yard > 50 ? undefined : yard > 45 ? 1 : yard > 35 ? 2 : yard > 20 ? 3 : 4,
                value
            };
        }

        const data = localStorage.getItem('data');
        if (data) {
            this.state = JSON.parse(data);
        } else {
            const ranges = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
            this.state = {
                locked: true,
                data: ranges.map(fill)
            };
        }
    }

    doIncrease(e: Entry, delta: number = 1) {
        e.value = (e.value || 0) + delta;

        this.setState({
            data: [...this.state.data]
        });

        localStorage.setItem('data', JSON.stringify(this.state));
    }

    doYardIncrease(e: Entry, delta: number = 1) {
        const yard = e.yard + delta;
        Object.assign(e, {
            yard,
            meter: Math.round(yard / 1.094),
            groupA: yard > 60 ? undefined : yard > 45 ? 1 : yard > 35 ? 2 : yard > 20 ? 3 : 4,
            groupJ: yard > 50 ? undefined : yard > 45 ? 1 : yard > 35 ? 2 : yard > 20 ? 3 : 4
        });

        this.setState({
            data: [...this.state.data]
        });

        localStorage.setItem('data', JSON.stringify(this.state));
    }

    doSetLock(lock: boolean) {
        this.setState({locked: lock});

        localStorage.setItem('data', JSON.stringify({...this.state, locked: lock}));
    }

    render() {
        const { data, locked } = this.state;
        return (
            <table className={styles.container} cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Yard</th>
                        <th>Meter</th>
                        <th colSpan={2}>Group</th>
                        <th>#</th>
                        <th className={styles.tools}>
                            {locked && <i className="fas fa-lock" onClick={() => this.doSetLock(false)}/>}
                            {!locked && <i className="fas fa-lock-open" onClick={() => this.doSetLock(true)}/>}
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(
                        e => (
                            <tr key={e.yard}>
                                <td className={styles.yard + (!locked ? ' ' + styles.unlocked : '')}>
                                    {!locked &&
                                        <i
                                            className="fas fa-minus-circle"
                                            onClick={() => this.doYardIncrease(e, -1)}
                                        />
                                    }
                                    {e.yard}
                                    {!locked &&
                                        <i
                                            className="fas fa-plus-circle"
                                            onClick={() => this.doYardIncrease(e, 1)}
                                        />
                                    }
                                </td>
                                <td className={styles.meter}>{e.meter}</td>
                                <td className={styles.group}>{e.groupA}</td>
                                <td className={styles.group}>{e.groupJ}</td>
                                <td className={styles.value}>{e.value}</td>
                                <td className={styles.tools}>
                                    {!locked &&
                                        <div>
                                            <i
                                                className="fas fa-minus-circle"
                                                onClick={() => this.doIncrease(e, -0.5)}
                                            />
                                            <i
                                                className="fas fa-plus-circle"
                                                onClick={() => this.doIncrease(e, 0.5)}
                                            />
                                        </div>
                                    }
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

export default App;

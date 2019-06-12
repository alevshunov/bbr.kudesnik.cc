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
                meter: Math.round(yard * 0.9),
                groupA: yard > 60 ? undefined : yard > 45 ? 1 : yard > 35 ? 2 : yard > 20 ? 3 : 4,
                groupJ: yard > 50 ? undefined : yard > 45 ? 1 : yard > 35 ? 2 : yard > 20 ? 3 : 4,
                value
            };
        }

        const data = localStorage.getItem('data');
        if (data) {
            this.state = JSON.parse(data);
        } else {
            this.state = {
                locked: true,
                data: [
                    fill(10),
                    fill(15),
                    fill(20),
                    fill(25),
                    fill(30),
                    fill(35),
                    fill(40),
                    fill(45),
                    fill(50),
                    fill(55),
                    fill(60),
                    fill(65),
                    fill(70),
                    fill(75),
                    fill(80)
                ]
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
                        <th>Ярды</th>
                        <th>Метры</th>
                        <th colSpan={2}>Группы</th>
                        <th>#</th>
                        <th>
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
                                <td className={styles.yard}>{e.yard}</td>
                                <td className={styles.meter}>{e.meter}</td>
                                <td className={styles.group}>{e.groupA}</td>
                                <td className={styles.group}>{e.groupJ}</td>
                                <td className={styles.value}>{e.value}</td>
                                <td className={styles.tools}>
                                    {!locked &&
                                        <i
                                            className="fas fa-minus-circle"
                                            onClick={() => this.doIncrease(e, -0.5)}
                                        />
                                    }
                                    {!locked &&
                                        <i
                                            className="fas fa-plus-circle"
                                            onClick={() => this.doIncrease(e, 0.5)}
                                        />
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

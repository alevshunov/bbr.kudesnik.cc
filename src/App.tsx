import * as React from 'react';
import DistancesView from './parts/DistancesView';
import { Entry } from './core/types/All';

type Props = {

};

type State = {
    data: Entry[],
    locked: boolean
};

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const data = localStorage.getItem('data');
        if (data) {
            this.state = JSON.parse(data);
        } else {
            const ranges = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
            this.state = {
                locked: true,
                data: ranges.map(yard => ({ yard }))
            };
        }
    }

    doValueIncrease = (e: Entry, delta: number = 1) => {
        e.value = e.value === undefined ? 0 : e.value + delta;
        this.setState({ data: [...this.state.data] });
    }

    doValueReset = (e: Entry) => {
        e.value = undefined;
        this.setState({ data: [...this.state.data] });
    }

    doYardIncrease = (e: Entry, delta: number = 1) => {
        e.yard += delta;
        this.setState({ data: [...this.state.data] });
    }

    doSetLock = (locked: boolean) => {
        this.setState({ locked });
    }

    componentDidUpdate() {
        localStorage.setItem('data', JSON.stringify(this.state));
    }

    render() {
        const { data, locked } = this.state;
        return (
            <DistancesView
                data={data}
                locked={locked}
                onSetLock={this.doSetLock}
                onYardIncrease={this.doYardIncrease}
                onValueIncrease={this.doValueIncrease}
                onValueReset={this.doValueReset}
            />
        );
    }
}

export default App;

import * as React from 'react';
import DistancesView from './parts/DistancesView';
import { connect } from 'react-redux';
import { iRootState, Dispatch } from './models/Store';

const mapState = (state: iRootState) => ({
    data: state.markers.markers,
    locked: state.markers.locked
});

const mapDispatch = (dispatch: Dispatch) => ({
    doValueIncrease: dispatch.markers.doValueIncrease,
    doValueDecrease: dispatch.markers.doValueDecrease,
    doValueReset: dispatch.markers.doValueReset,
    doYardIncrease: dispatch.markers.doYardIncrease,
    doYardDecrease: dispatch.markers.doYardDecrease,
    doLockToggle: (s: boolean) => { (s ? dispatch.markers.doLock : dispatch.markers.doUnlock)(); }
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
type Props = connectedProps;

class App extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { locked, data } = this.props;
        return (
            <DistancesView
                data={data}
                locked={locked}
                onLockToggle={this.props.doLockToggle}
                onYardIncrease={this.props.doYardIncrease}
                onYardDecrease={this.props.doYardDecrease}
                onValueIncrease={this.props.doValueIncrease}
                onValueDecrease={this.props.doValueDecrease}
                onValueReset={this.props.doValueReset}
            />
        );
    }
}

export default connect(mapState, mapDispatch)(App);

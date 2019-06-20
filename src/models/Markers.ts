import { createModel } from '@rematch/core';
import { Marker } from '../core/types/All';

export type MarkersState = {
    markers: Marker[],
    locked: boolean
};

export type MarkersYardInfo = { yard: number };

const DELTA = 0.5;

export const Markers = createModel<MarkersState>({
    state: { markers: [], locked: true },
    reducers: {
        doYardIncrease: (state: MarkersState, { yard }: MarkersYardInfo): MarkersState => {
            return {
                ...state,
                markers: state.markers.map(e => e.yard === yard ? {...e, yard: e.yard + 1} : e)
            };
        },
        doYardDecrease: (state: MarkersState, { yard }: MarkersYardInfo): MarkersState => {
            return {
                ...state,
                markers: state.markers.map(e => e.yard === yard ? {...e, yard: e.yard - 1} : e)
            };
        },
        doValueIncrease: (state: MarkersState, { yard }: MarkersYardInfo): MarkersState => {
            return {
                ...state,
                markers: state.markers
                    .map(e => e.yard === yard ? {...e, value: e.value === undefined ? 0 : e.value + DELTA} : e)
            };
        },
        doValueDecrease: (state: MarkersState, { yard }: MarkersYardInfo): MarkersState => {
            return {
                ...state,
                markers: state.markers
                    .map(e => e.yard === yard ? {...e, value: e.value === undefined ? 0 : e.value - DELTA} : e)
            };
        },
        doValueReset: (state: MarkersState, { yard }: MarkersYardInfo): MarkersState => {
            return {
                ...state,
                markers: state.markers.map(e => e.yard === yard ? {...e, value: undefined} : e)
            };
        },
        doLock: (state: MarkersState): MarkersState => {
            return { ... state, locked: true };
        },
        doUnlock: (state: MarkersState): MarkersState => {
            return { ... state, locked: false };
        }
    },
    effects: {
    }
});
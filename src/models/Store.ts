import { init, RematchRootState } from '@rematch/core';
import models from './Models';

export const store = init({
    models: models
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type iRootState = RematchRootState<typeof models>;
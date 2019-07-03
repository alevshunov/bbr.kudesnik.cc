import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);
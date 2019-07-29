import React from 'react';
import { ThemeProvider }  from 'styled-components'
import { Provider } from 'react-redux';

import store from '../store/store';

import {theme} from '../styles/'
import SyncMachine from './SyncMachine'

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SyncMachine />
        </ThemeProvider>
    </Provider>
)

export default App;

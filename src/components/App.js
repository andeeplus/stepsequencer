import React from 'react';
import { ThemeProvider }  from 'styled-components'
import { Provider } from 'react-redux';

import store from '../store/store';

import {theme} from '../styles/'
import SyncMachine from './SyncMachine'
import { GlobalStyle } from '../styles/GloblaStyle';

const App = () => (
    <React.Fragment>
    <GlobalStyle />
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SyncMachine />
            </ThemeProvider>
        </Provider>
    </React.Fragment>
)

export default App;

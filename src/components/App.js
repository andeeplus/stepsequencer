import React, { useState } from 'react';
import { ThemeProvider }  from 'styled-components'
import { Provider } from 'react-redux';

import store from '../store/store';

import { styledTheme } from '../styles/'
import SyncMachine from './SyncMachine'
import { GlobalStyle } from '../styles/GloblaStyle';
import GlobalFont from '../styles/GlobalFont';

const App = () => {

    const [theme, setTheme] = useState('dark')
    //const toggleTheme = () => theme === 'clear' ? setTheme('dark') : setTheme('clear')

    return(
        <React.Fragment>
            <GlobalFont/>
            <GlobalStyle/>
                <Provider store={store}>
                    <ThemeProvider theme={styledTheme(theme)}>
                        <SyncMachine /*toggleTheme={toggleTheme}*//>
                    </ThemeProvider>
                </Provider>
        </React.Fragment>
    )
}

export default App;

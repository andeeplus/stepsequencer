import React, { useState } from 'react';
import { ThemeProvider }  from 'styled-components'
import { Provider } from 'react-redux';

import store from '../store/store';

import { styledTheme } from '../styles/'
import SyncMachine from './SyncMachine'
import { GlobalStyle } from '../styles/GloblaStyle';
import GlobalFont from '../styles/GlobalFont';

const WrapperApp = ({children}) => 
    <React.Fragment>
        <GlobalFont/>
        <GlobalStyle/>
            <Provider store={store}>
                {children}
            </Provider>
    </React.Fragment>


const App = () => {
    const [theme, setTheme] = useState('clear')
    const toggleTheme = () => theme === 'clear' ?setTheme('dark') : setTheme('clear')

    return(
        <WrapperApp>
            <ThemeProvider theme={styledTheme(theme)}>
                <SyncMachine toggleTheme={toggleTheme}/>
            </ThemeProvider>
        </WrapperApp>
    )
}


export default App;

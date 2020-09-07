import React from 'react';
import { ThemeProvider }  from 'styled-components'
import { Provider } from 'react-redux';

import store from '../store/store';
import styledTheme from '../styles/'
import SyncMachine from './SyncMachine'
import GlobalStyle from '../styles/GlobalStyle';
import GlobalFont from '../styles/GlobalFont';

const App = () => {

    return (
      <React.Fragment>
        <GlobalFont />
        <GlobalStyle />
        <Provider store={store}>
          <ThemeProvider theme={styledTheme}>
            <SyncMachine  />
          </ThemeProvider>
        </Provider>
      </React.Fragment>
    );
}

export default App;

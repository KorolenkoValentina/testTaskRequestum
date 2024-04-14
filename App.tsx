import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import Navigator from './src/navigations/Navigation'
import theme from './src/theme/theme'


const App: React.FC <{ navigation: any }> = ({ navigation })=> {
  return (
    <ThemeProvider theme={theme}>
      <Navigator navigation={navigation}/>
    </ThemeProvider>
  );
}
export default App;


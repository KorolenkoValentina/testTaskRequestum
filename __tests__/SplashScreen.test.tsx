
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native'; 
import  SplashScreen from '../src/screens/SplashScreen'
import theme from '../src/theme/theme';


describe('SplashScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };
 
  test('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}> 
        <SplashScreen navigation={mockNavigation} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('navigates to Login screen when Login button is pressed', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <SplashScreen navigation={mockNavigation} />
      </ThemeProvider>
    );
    const instance = component.root;

    const loginButton = instance.findByProps({ testID: 'loginButton' });
    loginButton.props.onPress();

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Log in');
  });
  test('navigates to Register screen when Register button is pressed', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <SplashScreen navigation={mockNavigation} />
      </ThemeProvider>
    );
    const instance = component.root;

    const registerButton = instance.findByProps({ testID: 'registerButton' });
    registerButton.props.onPress();

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Sign Up');
  });
  test('renders Logo component', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <SplashScreen navigation={mockNavigation} />
      </ThemeProvider>
    );
    const instance = component.root;

    const logo = instance.findByProps({ testID: 'logo' });

    expect(logo).toBeTruthy();
  });
});
import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import theme from '../src/theme/theme';
import SignUpScreen from '../src/screens/SignUpScreen';

const mockNavigation = {
    navigate: jest.fn(),
};

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('SignUpScreen component', () => {
    
    test('matches snapshot', () => {
        const tree = renderer.create(
          <ThemeProvider theme={theme}>
            <SignUpScreen navigation={mockNavigation} />
          </ThemeProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('calls handleSignUp function when sign up button is pressed', () => {
        const component = renderer.create(
          <ThemeProvider theme={theme}>
            <SignUpScreen navigation={mockNavigation} />
          </ThemeProvider>
        );
        const signUpButton =  component.root.findByProps({ testID: 'signUpButton' });
        act(() => {
            signUpButton.props.onPress();
        });
        
    });
    test('navigates to login screen when log in link is pressed', () => {
        const component = renderer.create(
          <ThemeProvider theme={theme}>
            <SignUpScreen navigation={mockNavigation} />
          </ThemeProvider>
        );
        const loginLink = component.root.findByProps({ testID: 'loginLink' });
        act(() => {
            loginLink.props.onPress();
        });
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Log in');
    });
    test('displays error message for invalid email format', () => {
        const component = renderer.create(
          <ThemeProvider theme={theme}>
            <SignUpScreen navigation={mockNavigation} />
          </ThemeProvider>
        );
        const emailInput = component.root.findByProps({ placeholder: 'Email' });
        act(() => {
            emailInput.props.onChangeText('invalid_email');
        });
        const signUpButton = component.root.findByProps({ testID: 'signUpButton' });
        act(() => {
            signUpButton.props.onPress();
        });
        expect(component.root.findByProps({ testID: 'emailError' })).toBeTruthy();
    });
    test('toggles password visibility when eye icon is pressed', () => {
        const component = renderer.create(
          <ThemeProvider theme={theme}>
            <SignUpScreen navigation={mockNavigation} />
          </ThemeProvider>
        );
        const eyeIcon = component.root.findByProps({ testID: 'eyeIcon' });
        act(() => {
            eyeIcon.props.onPress();
        });
        const passwordInput = component.root.findByProps({ placeholder: 'Password' });
        expect(passwordInput.props.secureTextEntry).toBe(false);
        act(() => {
            eyeIcon.props.onPress();
        });
        expect(passwordInput.props.secureTextEntry).toBe(true);
    });
    
})
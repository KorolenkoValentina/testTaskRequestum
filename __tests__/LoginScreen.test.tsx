import React from 'react';

import renderer, { act } from 'react-test-renderer';
import { Animated } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../src/theme/theme';
import { shakeButton } from '../src/utils/storage';
import LoginScreen from '../src/screens/LoginScreen';


jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockNavigation = {
    navigate: jest.fn(),
};

describe('LoginScreen component', () => {
    
    test('matches snapshot', () => {
        const tree = renderer.create(
          <ThemeProvider theme={theme}>
            <LoginScreen navigation={mockNavigation} />
          </ThemeProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('calls handleLogin function when login button is pressed', () => {
      const component = renderer.create(
        <ThemeProvider theme={theme}>
          <LoginScreen navigation={mockNavigation} />
        </ThemeProvider>
      );
      const loginButton = component.root.findByProps({ testID: 'loginButton' });
      act(() => {
        loginButton.props.onPress();
      });
      
    });
    test('navigates to sign-up screen when sign-up button is pressed', () => {
        const component = renderer.create(
          <ThemeProvider theme={theme}>
            <LoginScreen navigation={mockNavigation} />
          </ThemeProvider>
        );
        const signUpButton = component.root.findByProps({ testID: 'signUpButton' });
        act(() => {
          signUpButton.props.onPress();
        });
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Sign Up');
    });
    test('updates email and password fields correctly', () => {
        const component = renderer.create(
            <ThemeProvider theme={theme}>
              <LoginScreen navigation={mockNavigation} />
            </ThemeProvider>
        );
        const emailInput = component.root.findByProps({ testID: 'emailInput' });
        const passwordInput = component.root.findByProps({ testID: 'passwordInput' });
          
        act(() => {
            emailInput.props.onChangeText('test@example.com');
            passwordInput.props.onChangeText('password123');
        });
        
        expect(emailInput.props.value).toBe('test@example.com');
        expect(passwordInput.props.value).toBe('password123');
    });
    test('shakeButton animates correctly', () => {
        const shakeAnimation = new Animated.Value(0);

        shakeButton(shakeAnimation);
    
        setTimeout(() => {
            expect((shakeAnimation as any)._value).toBe(0);
        }, 200);
    });

})

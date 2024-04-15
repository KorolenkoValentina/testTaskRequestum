import React from 'react';
import axios from 'axios';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import theme from '../src/theme/theme';
import HomeScreen from '../src/screens/HomeScreen';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
  jest.mock('axios', () => ({
get: jest.fn(),
}));



describe('HomeScreen component', () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };
  
    test('matches snapshot', () => {
      const tree = renderer.create(
        <ThemeProvider theme={theme}>
          <HomeScreen navigation={mockNavigation} />
        </ThemeProvider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('navigates to Splash screen on log out', async () => {
      const component = renderer.create(
        <ThemeProvider theme={theme}>
          <HomeScreen navigation={mockNavigation} />
        </ThemeProvider>
      );
      const instance = component.root;
  
      const logoutButton = instance.findByProps({ testID: 'logoutButton' });
      await logoutButton.props.onPress(); 
  
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Splash');
  });

  test('fetches user data correctly', async () => {
    const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
    const mockUserData = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '123-456-7890',
    };
  
    mockedAxiosGet.mockResolvedValue({ data: mockUserData });
  
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <HomeScreen navigation={mockNavigation} />
      </ThemeProvider>
    );
  
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); 
    });
  
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
    expect(component.toJSON()).toMatchSnapshot();
  });


   
})
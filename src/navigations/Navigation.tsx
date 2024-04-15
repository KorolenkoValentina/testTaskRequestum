import React,{useEffect}  from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BackIcon from '../image/backIcon.svg'
import { LoginScreenWrapperProps , SignUpScreenWrapperProps, NavigationRoutes} from '../components/interfaces';
import { getSessionData } from '../utils/storage';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const LoginScreenWrapper: React.FC<LoginScreenWrapperProps> = ({ navigation, ...props }) => {
  return <LoginScreen navigation={navigation} {...props} />;
};
const SignUpScreenWrapper: React.FC<SignUpScreenWrapperProps> = ({ navigation, ...props }) => {
  return <SignUpScreen navigation={navigation} {...props} />;
};

const CustomBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 40 }}>
      <BackIcon />
    </TouchableOpacity>
  );
};
const Stack = createNativeStackNavigator();

const Navigator: React.FC<{ navigation: any }> = ({ navigation }) => {
  

  useEffect(() => {
    
    const checkSession = async () => {
      const sessionData = await getSessionData();
      if (sessionData && sessionData.isLoggedIn) {
        navigation.navigate(NavigationRoutes.HOME); 

      } else {
        navigation.navigate(NavigationRoutes.SPLASH);
      }
    };
    checkSession();
  }, []);

  

  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name={NavigationRoutes.SPLASH} component={SplashScreen} options={{ headerShown: false }} />

        <Stack.Screen 
        name={NavigationRoutes.LOG_IN}  component={LoginScreenWrapper}
        options={() => ({
          headerShown: true,
          headerLeft: () => <CustomBackButton />,
          title: '',
          headerTransparent: true,
          headerShadowVisible: false, 
        })}/> 

        <Stack.Screen 
         name={NavigationRoutes.SIGN_UP} component={SignUpScreenWrapper} 
        options={() => ({
          headerShown: true,
          headerLeft: () => <CustomBackButton />,
          title: '',
          headerTransparent: true,
          headerShadowVisible: false, 
        })}/> 

        <Stack.Screen 
        name={NavigationRoutes.HOME} component={HomeScreen} 
        options={() => ({
          headerShown: false,
         
        })}/> 


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
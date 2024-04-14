import React from 'react';

import {  TouchableOpacityProps } from 'react-native';


export interface UserData {
    email: string;
    password: string;
    name?: string;
    username?: string;
    phone?: string;
}

export interface ButtonProps extends TouchableOpacityProps {
    pink?: boolean;
}


export interface SplashScreenProps {
    navigation: any; 
}

export interface LoginScreenWrapperProps {
    navigation: any;
    route: any;
    theme: any;
}

export interface SignUpScreenWrapperProps {
    navigation: any;
    route: any;
    theme: any;
}
  


export enum NavigationRoutes {
    HOME = 'Home',
    SIGN_UP = 'Sign Up',
    LOG_IN = 'Log in',
    SPLASH = 'Splash',
}
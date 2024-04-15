
import React, { useState, useContext, useRef } from 'react';


import {  Animated, TouchableOpacity,  } from 'react-native';
import { saveUserData } from '../utils/storage'
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components/native';
import { EmailIcon, LockIcon, } from '../components/Icons';
import  AccountIcon from '../image/accountIcon.svg'
import  EyeIcon  from '../image/eyeIcon.svg'
import { UserData, NavigationRoutes } from '../components/interfaces';
import { validateEmail, validatePassword, shakeButton } from '../utils/storage'



const SignUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [shakeAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const theme = useContext(ThemeContext);
  const buttonRef = useRef<any>(null);
  

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      shakeButton(shakeAnimation);
    return;
      
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long\nand contain both letters and numbers.');
      shakeButton(shakeAnimation);
      return;
    }
  
    const userData: UserData = { email, password };
    await saveUserData(userData);
    
    navigation.navigate(NavigationRoutes.HOME);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError('');
  };
  
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError('');
  };



  const navigateToLogin = () => {
    navigation.navigate(NavigationRoutes.LOG_IN);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

    return (
      
      <Container>
        <BgImage source={require('../image/bg.png')} />

        <StyledAccountIcon />
        <Header>SIGN UP</Header>
        <Subtitle>Create your email and  password for your account</Subtitle>
        {emailError  && <ErrorText testID='emailError'>{emailError}</ErrorText>}
        <InputContainer focused={emailFocused} >
          <EmailIcon focused={emailFocused}/>

          <Input
            placeholder="Email"
            placeholderTextColor={theme.colors.lightGray}
            onChangeText={handleEmailChange}
            value={email}
            keyboardType="email-address"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </InputContainer>
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        <InputContainer focused={passwordFocused}>
          <LockIcon focused={passwordFocused}/>
          <Input
            placeholder="Password"
            placeholderTextColor={theme.colors.lightGray}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <EyeIconWrapper testID="eyeIcon" onPress={toggleShowPassword}>
            {showPassword ? <EyeIcon /> : <EyeIcon/>}
          </EyeIconWrapper>
        </InputContainer>
        <TouchableOpacity testID='signUpButton'
          onPress={handleSignUp}
          ref={buttonRef}
          style={{ transform: [{ translateX: shakeAnimation }] }}
        >
          <SignUpButton >
            <ButtonText>Sign Up</ButtonText>
          </SignUpButton>
        </TouchableOpacity>
        <SignupTextContainer>
          <SignupText>Already have an account?</SignupText>
          <TouchableOpacity testID='loginLink' onPress={navigateToLogin}>
            <StyledText>Log in</StyledText>
          </TouchableOpacity>
        </SignupTextContainer>
      </Container>
      
    );
  };

export default SignUpScreen;



const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  
  
`;
const BgImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const StyledAccountIcon = styled(AccountIcon)`
  margin-left:auto;
  margin-right:40px;
`;
const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 20px;
  
`;

const Subtitle = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 24px;
`;


const InputContainer  = styled.View<{ focused: boolean}>`
  flex-direction: row;
  align-items: center;
  width: 80%;
  
  border: 1px solid ${({ theme, focused }) => (focused ? theme.colors.pink : theme.colors.lightGray)};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 16px;
`;


const Input = styled.TextInput`
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  margin-left: 5px;
`;

const ErrorText = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.pink};
  margin-bottom: 5px;

`;

const EyeIconWrapper = styled.TouchableOpacity`
margin-left:auto;
`;

const SignUpButton = styled(Animated.View)`
  min-width: 80%;
  background-color: ${({ theme }) => theme.colors.pink};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 16px;
  shadow-color: ${({ theme }) => theme.colors.pink}; 
  shadow-offset: 0px 12px; 
  shadow-opacity: 0.58; 
  shadow-radius: 16px; 
  elevation: 5; /* Elevation для Android */;

`;
const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: 12px; 
`;



const SignupTextContainer = styled.View`
  flex-direction: row;
  position: relative;
  bottom: -37%; 

`;

const SignupText = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.white};
`;

const StyledText = styled.Text`
  font-size: 11px;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.pink};
`;

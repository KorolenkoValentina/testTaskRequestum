
import React, { useState, useContext, useRef  } from 'react';

import { Animated,TouchableOpacity, Alert } from 'react-native';
import { getUserData, saveSessionData, clearSessionData, getSessionData} from '../utils/storage'
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { EmailIcon, LockIcon, } from '../components/Icons';
import  AccountIcon from '../image/accountIcon.svg'
import  EyeIcon  from '../image/eyeIcon.svg'
import { NavigationRoutes } from '../components/interfaces';
import { validateEmail, validatePassword, shakeButton } from '../utils/storage'



const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
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
  

  const handleLogin = async () => {
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

    const sessionData = await getSessionData();

   
    if (sessionData) {
    
      navigation.navigate(NavigationRoutes.HOME);
      return;
    }

    const userData = await getUserData();
    if (userData && userData.email === email && userData.password === password) {
    await saveSessionData(userData);

    navigation.navigate(NavigationRoutes.HOME);
    } else {
      Alert.alert('User not found. Please sign up.');
  }
};

  const navigateToSignUp = () => {
    navigation.navigate(NavigationRoutes.SIGN_UP);
  };

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      
      <Container>
        <BgImage source={require('../image/bg.png')} />

        <StyledAccountIcon />
        <Header>LOGIN</Header>
        <Subtitle>Enter your login password from your account</Subtitle>
        {emailError && <ErrorText>{emailError}</ErrorText>}
        <InputContainer focused={emailFocused} >
          <EmailIcon focused={emailFocused}/>

          <Input
            
            placeholder="Email"
            placeholderTextColor={theme.colors.lightGray}
            onChangeText={(text: string) => setEmail(text)}
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
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <EyeIconWrapper onPress={toggleShowPassword}>
            {showPassword ? <EyeIcon/> : <EyeIcon/>}
          </EyeIconWrapper>
        </InputContainer>
        <ForgotPasswordContainer>
          <ForgotPasswordText>Forgot password?</ForgotPasswordText>
        </ForgotPasswordContainer>
        <TouchableOpacity
          onPress={handleLogin}
          ref={buttonRef}
          style={{ transform: [{ translateX: shakeAnimation }] }}>
          <LoginButton >
            <ButtonText>Login</ButtonText>
          </LoginButton>
        </TouchableOpacity>
        <SignupTextContainer>
          <SignupText>Don't have an account? </SignupText>
          <TouchableOpacity onPress={navigateToSignUp}>
            <StyledText>Sign up</StyledText>
          </TouchableOpacity>
        </SignupTextContainer>
      </Container>
      
    );
  };

export default LoginScreen;



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

const ErrorText = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.pink};
  margin-bottom: 5px;

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

const EyeIconWrapper = styled.TouchableOpacity`
  margin-left:auto;
`;


const ForgotPasswordContainer = styled.TouchableOpacity`
  margin-left:auto;
  margin-right:40px;
  
`;

const ForgotPasswordText = styled.Text`
  font-size: 11px;
  margin-bottom: 16px;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.pink};
  

`;

const LoginButton =  styled(Animated.View)`
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
  bottom: -30%;  

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


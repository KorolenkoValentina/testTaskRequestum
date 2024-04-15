import React from 'react';
import { TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import  Logo from '../image/logo.svg'
import { ButtonProps, NavigationRoutes, SplashScreenProps } from '../components/interfaces';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const BgImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.View`
  margin-top: 200px; 
`;
const ButtonContainer = styled.View`
  width: 80%;
  margin-bottom: 50px; 
`;

const Button = styled(({ pink, ...props }) => <TouchableOpacity {...props} />)<ButtonProps>`
  background-color: ${({ pink, theme }) => pink ? theme.colors.pink : theme.colors.dark};
  padding-vertical: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  shadow-color: ${({ theme, pink }) => (pink ? theme.colors.pink : theme.colors.dark)};
  shadow-offset: 0px 12px; 
  shadow-opacity: 0.58; 
  shadow-radius: 16px; 
  elevation: 5; /* Elevation для Android */;
`;


const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px; 
  text-align: center;
`;

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <BgImage source={require('../image/bg.png')} />
        
      <LogoContainer>
        <Logo testID='logo'/>
      </LogoContainer>
      <ButtonContainer>
        <Button pink testID='loginButton' onPress={() => navigation.navigate(NavigationRoutes.LOG_IN)}>
          <ButtonText>Login</ButtonText>
        </Button>
        <Button testID='registerButton' onPress={() => navigation.navigate(NavigationRoutes.SIGN_UP)}>
          <ButtonText>Register</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default SplashScreen;

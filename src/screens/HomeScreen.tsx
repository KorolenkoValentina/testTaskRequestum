
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Text } from 'react-native';
import { clearSessionData} from '../utils/storage'
import { UserData, NavigationRoutes } from '../components/interfaces';

import styled from 'styled-components/native';

import LetterR from '../image/letterR.svg'


const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userData = await getUserData();
        // if (!userData) {
          
        //   navigation.navigate(NavigationRoutes.SIGN_UP);
        //   return;
        // }
        
        const response = await axios.get<UserData>('https://jsonplaceholder.typicode.com/users/1');
        setUserData(response.data);
      } catch (error) {
        console.error('Data retrieval error:', error);
      }
    };
  
    fetchData();
  }, []);
 
  const handleLogOut = async () => {
    try {
      await clearSessionData()
   
      navigation.navigate(NavigationRoutes.SPLASH);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
    
  
    return (
      
      <Container>
        <BgImage source={require('../image/bg.png')} />

        <LetterR/>
        {userData ? (
        <ContentContainer>
          <Subtitle>You’re loggen in now </Subtitle>
          <Header>{userData.name}  username:{userData.username}</Header>
          <Subtitle>Email: {userData.email}</Subtitle>
          <Subtitle>Phone: {userData.phone}</Subtitle>

        </ContentContainer>
         ) : (
          <Text>Завантаження...</Text>
        )}
        <LogOutButton onPress={handleLogOut}>
          <ButtonText>Log Out</ButtonText>
        </LogOutButton>
       

             
      </Container>
      
    );
  };

export default HomeScreen;



const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  
  
`;
const BgImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.View`
  position: absolute;
  top: 50%;
  

`;

const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 24px;
  text-align: center;
`;

const LogOutButton = styled.TouchableOpacity`
  width: 80%;
  background-color: ${({ theme }) => theme.colors.pink};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 50px;
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

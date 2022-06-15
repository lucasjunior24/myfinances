import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { IUser } from '../../@types/interfaces/IUsers';

// import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';

export function Profile() {
  // const { user } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [driverLicense, setDriverLicense] = useState('user.driver_license');

  const [userLogadoLocal, setUserLogadoLocal] = useState<IUser>({} as IUser);

  const dataKey_userLogado = '@gofinances:user_logado';
  const dataKey_userLogadoComAvatar = '@gofinances:user_logadoComAvatar';
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(result.cancelled) return;
    if(result.uri) setAvatar(result.uri);

    console.log("Meu AVATAR: ", avatar);
    const response_userLogado = await AsyncStorage.getItem(dataKey_userLogado);
    const userLogadoEmArray = response_userLogado ? JSON.parse(response_userLogado) : {} as IUser;

    console.log("meus users em array: ", userLogadoEmArray);
    const primeiroElemntoDoArray: IUser = userLogadoEmArray[0][0];


    const newUser: IUser = {
      id: primeiroElemntoDoArray.id,
      name: primeiroElemntoDoArray.name,
      email: primeiroElemntoDoArray.email,
      cpf: primeiroElemntoDoArray.cpf,
      password: primeiroElemntoDoArray.password,
      date: primeiroElemntoDoArray.date,
      avatar: result.uri
    }
    console.log("Usuario EDITADO: ", newUser);

      const data = await AsyncStorage.getItem(dataKey_userLogado);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newUser
      ];

      await AsyncStorage.setItem(dataKey_userLogado, JSON.stringify(dataFormatted));
      setUserLogadoLocal(primeiroElemntoDoArray);

      AsyncStorage.removeItem(dataKey_userLogadoComAvatar);
      await AsyncStorage.setItem(dataKey_userLogadoComAvatar, JSON.stringify(dataFormatted));
      // setUserLogadoLocal(newUser);
      
      const primeiroElemntoDoArrayComAvatar: IUser = dataFormatted[0];
      console.log("Usuario com avarta local 2: ", primeiroElemntoDoArrayComAvatar);
  }

  async function getUserLogado() {
    console.log("Meu AVATAR: ", avatar);
    
    // const response_userLogado = await AsyncStorage.getItem(dataKey_userLogado);
    // const userLogadoEmArray = response_userLogado ? JSON.parse(response_userLogado) : {} as IUser;

    // console.log("meus users em array: ", userLogadoEmArray);
    // const primeiroElemntoDoArray: IUser = userLogadoEmArray[0][0];


    // const newUser: IUser = {
    //   id: primeiroElemntoDoArray.id,
    //   name: primeiroElemntoDoArray.name,
    //   email: primeiroElemntoDoArray.email,
    //   cpf: primeiroElemntoDoArray.cpf,
    //   password: primeiroElemntoDoArray.password,
    //   date: primeiroElemntoDoArray.date,
    //   avatar: avatar
    // }
    // console.log("Usuario EDITADO: ", newUser);

    // // AsyncStorage.removeItem(dataKey_userLogado);

    // AsyncStorage.removeItem(dataKey_userLogadoComAvatar);
    
    // const data = await AsyncStorage.getItem(dataKey_userLogadoComAvatar);
    // const currentData = data ? JSON.parse(data) : [];

    // const dataFormatted = [
    //   ...currentData,
    //   newUser
    // ];
  
    // await AsyncStorage.setItem(dataKey_userLogadoComAvatar, JSON.stringify(dataFormatted));
    // setUserLogadoLocal(newUser);
    
    // const primeiroElemntoDoArrayComAvatar: IUser = dataFormatted[0];
    // console.log("Usuario com avarta local 2: ", primeiroElemntoDoArrayComAvatar);
  }
  useEffect(() => {
    getUserLogado();

    // const dataKey = '@gofinances:transactions';
    // AsyncStorage.removeItem(dataKey);
  }, []);
  function handleSingOut() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <StatusBar
              barStyle='light-content'
              translucent
              backgroundColor='transparent'
            />
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSingOut} >
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit' ?
              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  // defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  // defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  autoCorrect={false}
                  keyboardType="numeric"
                  // defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
              :
              <Section>
                <PasswordInput
                  iconName='lock'
                  placeholder='Senha atual'
                />

                <PasswordInput
                  iconName='lock'
                  placeholder='Nova senha'
                />

                <PasswordInput
                  iconName='lock'
                  placeholder='Repetir nova senha'
                />
              </Section>
            }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}
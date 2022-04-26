import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';

import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

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

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleAvatarSelect() {
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 4],
    //   quality: 1,
    // });

    // if(result.cancelled) return;
    // if(result.uri) setAvatar(result.uri);
  }

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
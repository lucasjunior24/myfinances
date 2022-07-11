import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
// import api  from '../../../services/api';

import { RootStackParamList } from '../../../routes/RootStackParams';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
  FooterForm
} from './styles';
import { IUser } from '../../../@types/interfaces/IUsers';

interface Params {
  user: {
    name: string;
    email: string;
    cpf: string;
  }
}

interface FormData {
  password: string;
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dataKey = '@gofinances:user_local';

  type navigationTypes = NativeStackNavigationProp<RootStackParamList, 'SignUpSecondStep'>
  const navigation = useNavigation<navigationTypes>();


  const route = useRoute();
  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  const schema = Yup.object().shape({
    email: Yup.string(),
    name: Yup.string(),
    cpf: Yup.string(), 
    password: Yup.string(),
  });
  
  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleSignUpUser(form: FormData) {
    if(!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação dela');
    }
    if(password != passwordConfirm) {
      return Alert.alert('As senhas não são iguais');
    }

    const newUser: IUser = {
      id: String(uuid.v4()),
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      password,
      date: new Date()
    }
    console.log("Novo usuario: ", newUser);
    try {
      
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newUser
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      reset();

      // navigation.navigate('Listagem');
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta Criada',
        message: `Agora é só fazer login\ne aproveitar`
      });

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel cadastrar')
    }
  }
  
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>


          <FooterForm>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName='lock'
              placeholder='Repetir Senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button 
            title='Cadastrar'
            onPress={handleSubmit(handleSignUpUser)}
            />
            </FooterForm>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup';
import { NativeStackNavigationProp} from '@react-navigation/native-stack';

import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

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
// import { useAuth } from '../../../hooks/auth';

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');

  type navigationTypes = NativeStackNavigationProp<RootStackParamList, 'SignUpFirstStep'>
  const navigation = useNavigation<navigationTypes>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        cpf: Yup.string()
          .required('cpf é obrigatório'),
        email: Yup.string()
          .email('E-mail invalido')
          .required('E-mail é obrigatório'),
        name: Yup.string()
          .required('Nome é obrigatorio'),
      });

      const data : IUser = { name, email, cpf }
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
    }
  }
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
        <StatusBar
              barStyle='dark-content'
              // barStyle='light-content'
              translucent
              backgroundColor='transparent'
            />
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
              <FormTitle>1. Dados</FormTitle>
              <Input 
                iconName='user' 
                placeholder='Nome' 
                onChangeText={setName}
                value={name}
              />
              <Input 
                iconName='mail' 
                placeholder='E-mail' 
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
              />
              <Input 
                iconName='credit-card' 
                placeholder='CPF'
                keyboardType='numeric' 
                onChangeText={setCpf}
                value={cpf}
              />
            </Form>

            <Button 
              title='Proximo'
              onPress={handleNextStep}
            />
          </FooterForm>

        </Container>
      </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  );
}
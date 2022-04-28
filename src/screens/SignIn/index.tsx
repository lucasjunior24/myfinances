import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack';

import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import theme from '../../global/styles/theme';
import { RootStackParamList } from '../../routes/RootStackParams';

// import { useAuth } from '../../hooks/auth';

import { 
  Container,
  ContainerHeader,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
  FooterForm
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [listaDeUsers, setlistaDeUsers] = useState<any[]>([]);

  type navigationTypes = NativeStackNavigationProp<RootStackParamList, 'SignIn'>
  const navigation = useNavigation<navigationTypes>();
  // const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
        password: Yup.string()
        .required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password });

      signIn(email, password);

    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação', 
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        );
      }
    }
  }

  function signIn(email: string, password: string) {
    console.log("Users Cadastrados", listaDeUsers);
    const userLogado = listaDeUsers.filter(user => user.email === email && user.password === password);

    console.log("Meu user encontrado", userLogado);

    if(userLogado!) {
      navigation.navigate('AppRoutes');
    } else {
      Alert.alert(
        'Erro na autenticação', 
        'Ocorreu um erro ao fazer login, verifique as credenciais'
      );
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  useEffect(() => {
    async function loadData() {
      const dataKey = '@gofinances:user_local';
      const data = await AsyncStorage.getItem(dataKey);
      const listaDeUsers = JSON.parse(data!);

      setlistaDeUsers(listaDeUsers);
    }
    loadData()
  }, []) 
  
  return (
    <KeyboardAvoidingView behavior='position' enabled >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
         <ContainerHeader>
         <StatusBar 
            barStyle='dark-content'
            backgroundColor='transparent'
            // translucent
          />
          <Header>
              <Title>
                Controle suas {'\n'}
                finanças de forma {'\n'}
                muito simples
              </Title>
              <SubTitle>
                Faça seu login para começar{'\n'}
                Uma experiência incrível.
              </SubTitle>
            </Header>
         </ContainerHeader>       
          <FooterForm>
          <Form>
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
              />

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
              />
          </Form>

          <Footer>
            <Button 
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              loading={false}
              /> 

            <Button 
              title='Criar conta Gratuita'
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              /> 
          </Footer>
          </FooterForm>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
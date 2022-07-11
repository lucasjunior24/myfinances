import React from 'react';

import { useNavigation, useRoute } from "@react-navigation/native";
import { useWindowDimensions } from 'react-native';

import { NativeStackNavigationProp} from '@react-navigation/native-stack';

import { RootStackParamList } from '../../routes/RootStackParams';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

import { ConfirmButton } from '../../components/ConfirmButton';

export function Confirmation() {
  const route = useRoute();
  const { width } = useWindowDimensions();
  
  type navigationTypes = NativeStackNavigationProp<RootStackParamList, 'Confirmation'>
  const navigation = useNavigation<navigationTypes>();;

  const { title, message, nextScreenRoute } = route.params as Params;

  function handleConfirm() {
    navigation.navigate(nextScreenRoute)
  }

  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
        <ConfirmButton title='OK' onPress={handleConfirm} />
      </Content>

    </Container>
  );
}
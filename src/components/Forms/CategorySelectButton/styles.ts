import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.shape};  

  border-radius: 5px;
  padding: 18px 16px;
`;

export const Category = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.text};
`;

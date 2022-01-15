import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.shape };

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    
    background: ${({ theme }) => theme.colors.primary };
`;

export const Title = styled.Text`
    width: 100%;
    padding: 0 24px 0;
    
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary };

    font-size: ${RFValue(24)}px;
`;
export const Footer = styled.View`
    align-items: center;
    flex-direction: row;
`;

export const Amount = styled.Text`
    width: ${RFValue(55)}px;
    height: ${RFValue(55)}px;

    border-radius: 10px;
`;

export const LastTransaction = styled.Text`
    margin-left: 17px;
`;

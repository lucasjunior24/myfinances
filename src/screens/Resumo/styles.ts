import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};  
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background: ${({ theme }) => theme.colors.primary};

  justify-content:  flex-end;
  align-items: center;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { 
    flex: 1, 
    padding: 24 
  }
})``;
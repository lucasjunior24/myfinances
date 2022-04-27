import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color:${({ theme }) => theme.colors.secondary};
`;

export const ContentView = styled.ScrollView`

`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 54%;
  padding: 24px;
  `;

export const Title = styled.Text`
  align-items: center;
  margin-top: ${getStatusBarHeight() + 20}px;
  font-size: ${RFValue(34)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
`;

export const SubTitle = styled.Text`
 margin-top: ${getStatusBarHeight() + 30}px;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Form = styled.View`
  width: 100%;
  /* height: 50%; */
  margin: 54px 0%;
  margin-top: -20px;
`;

export const Footer = styled.View`
  width: 100%;
  /* margin-top: -20px; */
  padding-bottom: 10px;
`;

export const FooterForm = styled.View`
  width: 100%;
  /* height: 70%; */
  padding: 0 24px 14px;
  background-color:${({ theme }) => theme.colors.secondary}; 
`;

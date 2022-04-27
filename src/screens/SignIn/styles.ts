import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  
`;

export const ContentView = styled.ScrollView`
  /* height: 100%; */
`;

export const ContainerHeader = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 54%;
  /* padding-top: 12px;  */
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  width: 100%;

  padding: 0 24px;
`;


export const Title = styled.Text`
  align-items: center;
  justify-content: center;
  margin-top: ${getStatusBarHeight() + 10}px;
  font-size: ${RFValue(28)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
`;

export const SubTitle = styled.Text`
 margin-top: ${getStatusBarHeight() + 30}px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Form = styled.View`
  width: 100%;
  /* height: 50%; */
  margin-bottom: 12%;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`;

export const Footer = styled.View`
  width: 100%;
  /* margin-top: -20px; */
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  bottom: auto;
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
`;

export const FooterForm = styled.View`
  width: 100%;
  /* height: 44%; */
  align-items: flex-end;
  justify-content: center;
  padding: 0 24px 14px;
  /* background-color: ${({ theme }) => theme.colors.secondary}; */

`;

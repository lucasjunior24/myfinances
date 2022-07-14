import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 50%;
  /* padding-top: 12px;  */
  padding-bottom: 22px; 
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  width: 100%;

  padding: 0 24px 14px;
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

export const FooterForm = styled.View`
  width: 100%;
  /* height: 44%; */
  flex: 1;
  justify-content: space-between;
  padding: 0 24px 12px;
`;


export const Form = styled.View`
  width: 100%;
  /* height: 50%; */
  margin-bottom: 14%;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`;

export const Footer = styled.View`
  width: 100%;
  /* margin-top: -20px; */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  padding-bottom: 10px;
  bottom: auto;
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;


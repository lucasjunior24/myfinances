import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Header = styled.View`
  width: 100%;
  height: 227px;
  background-color: ${({ theme }) => theme.colors.primary};

  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    margin-top: ${getStatusBarHeight() + 12}px;
`;

export const HeaderTitle = styled.Text`
    font-size: ${RFValue(25)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.background_secondary};

    margin-top: 10px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;

  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 40px;
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondary};

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Content = styled.View`
  padding: 0 24px;

  margin-top: 100px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.secondary};

  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;
  
  ${({ active }) => active && css`
    border-bottom-width: 3px;
    border-bottom-color: ${({ theme }) => theme.colors.secondary};
  `};
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme, active }) => 
    active ? theme.fonts.bold : theme.fonts.medium};

  color: ${({ theme, active }) => 
   active ? theme.colors.header : theme.colors.text_detail};
`;

export const Section = styled.View``;
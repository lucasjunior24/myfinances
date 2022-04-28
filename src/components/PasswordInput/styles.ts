import styled, { css } from "styled-components/native";
import { TextInput } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;
export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;

  margin-right: 2px;

  background: ${({ theme }) => theme.colors.background_secondary};
  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.secondary};
  `};
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background: ${({ theme }) => theme.colors.background_secondary};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};

  padding: 0 23px;

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.secondary};
  `};
`;

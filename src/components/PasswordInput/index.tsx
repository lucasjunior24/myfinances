import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from "react-native-gesture-handler";

import { 
  Container, 
  IconContainer, 
  InputText 
} from './styles'; 

interface Props extends TextInputProps { 
  iconName: React.ComponentProps<typeof Feather>['name']; 
  value?: string; 
}

export function PasswordInput({
  iconName,
  value,
  ...rest
  }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const [isFocused, setFIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();
  
  function handleInputFocus() {
    setFIsFocused(true);
  }
  function handleInputBlur() {
    setFIsFocused(false);
    setIsFilled(!!value);
  }
  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText 
        {...rest} 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible} 
        isFocused={isFocused}
        autoCorrect={false}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}> 
        <IconContainer isFocused={isFocused}> 
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'} 
            size={24} 
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
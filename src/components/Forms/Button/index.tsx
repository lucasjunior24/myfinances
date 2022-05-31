import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { 
  Container,
  Title
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
}

export function Button({ 
  title,
  onPress,
  color,
   ...rest 
} : Props) {
  const theme = useTheme();
  return (
    <Container onPress={onPress} color={color ? color : theme.colors.header} {...rest} >
      <Title>
        {title}
      </Title>
    </Container>
  )
}

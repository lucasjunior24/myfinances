import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Title
} from './styles';

type Props = TouchableOpacityProps {
  title: string;
}

export function Button({...rest, title } : Props) {
  return (
    <Container {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}

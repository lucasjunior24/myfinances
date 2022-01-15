import React from 'react';
import { 
  Container, 
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction
} from './styles';

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entradas</Title>
        <Icon name='arrow-up-circle' />
      </Header>

      <Footer>
        <Amount>Entradas</Amount>
        <LastTransaction>Entradas</LastTransaction>
      </Footer>
    </Container>
  )
}

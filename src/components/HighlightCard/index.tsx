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

interface Props {
  title: string;
  amount: string;
  lastTransactioin: string;
}

export function HighlightCard( {
  title,
  amount,
  lastTransactioin
} : Props ) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Icon name='arrow-up-circle' />
      </Header>

      <Footer>
        <Amount>{amount}</Amount>
        <LastTransaction>{lastTransactioin}</LastTransaction>
      </Footer>
    </Container>
  )
}

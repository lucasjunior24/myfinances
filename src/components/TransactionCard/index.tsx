import React from 'react';
import { 
  Container, 
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles';

interface Props {
  type: 'up' | 'down' | 'total';
  title: string;
  amount: string;
  lastTransactioin: string;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function TransactionCard( ) {
  return (
    <Container>
        <Title>
          Desenvolvimento de site
        </Title>
        <Amount>
          R$ 12.000,00
        </Amount>

      <Footer>
        <Category>
          <Icon 
           />
          <CategoryName>
            Vendas
          </CategoryName>
        </Category>
        <Date>13/03/2021</Date>
      </Footer>
    </Container>
  )
}

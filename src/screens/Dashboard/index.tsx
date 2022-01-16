import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/53240060?v=4' }} />
            <User>
              <UserGreeting>Ola, </UserGreeting>
              <UserName>Lucas</UserName>
            </User>
          </UserInfo>

          <Icon name='power' />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard 
          type='up'
          title="Entradas" 
          amount='R$ 17.400.00' 
          lastTransactioin='Ultima entrada dia 14 de abril ' />
        <HighlightCard
          type='down'
          title="Entradas" 
          amount='R$ 17.400.00' 
          lastTransactioin='Ultima entrada dia 14 de abril ' />
        <HighlightCard 
          type='total'
          title="Entradas" 
          amount='R$ 17.400.00' 
          lastTransactioin='Ultima entrada dia 14 de abril ' />
      </HighlightCards>
    </Container>
  )
}
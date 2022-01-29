import React from 'react';

import { HistoryCard } from '../../components/HistoryCard';
import {
  Container,
  Header,
  Title
} from './styles';

export function Resumo() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categorio</Title>
      </Header>

      <HistoryCard title="Compras" amount="R$ 150,50" color="red" />
    </Container>
  )
}
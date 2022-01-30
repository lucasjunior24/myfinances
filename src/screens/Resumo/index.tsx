import React, { useEffect, useState } from 'react';

import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Header,
  Title,
  Content
} from './styles';
import { categories } from '../../Utils/categories';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resumo() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
      .filter((expensive: TransactionData ) => expensive.type === "negative");

    const totalByCategory:  CategoryData[] = [];

    categories.forEach(category => {
      let categorySun = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key) {
          categorySun += Number(expensive.amount);
        }
      });
      if(categorySun > 0) {
        const total = categorySun.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        })
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, [])
  return (
    <Container>
      <Header>
        <Title>Resumo por categorio</Title>
      </Header>

      <Content>
        {
          totalByCategories.map(item => (
            <HistoryCard 
              key={item.key}
              title={item.name} 
              amount={item.total} 
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  )
}
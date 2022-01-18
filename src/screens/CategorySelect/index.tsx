import React from 'react';

import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Forms/Button';

import { categories } from '../../Utils/categories'
import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Sepatator,
  Footer
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: string;
  setCategory: (category: Category) => void;
  cloneSelectCategory: () => void;
}

export function CategorySelect({ 
  category,
  setCategory,
  cloneSelectCategory
} : Props) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList 
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Sepatator/>}
      />

      <Footer>
        <Button title='Selecionar' />
      </Footer>
    </Container>
  )
}

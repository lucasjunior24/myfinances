import React, { useEffect, useState, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer
} from './styles';

import { RootStackParamList } from '../../routes/RootStackParams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IUser } from '../../@types/interfaces/IUsers';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  type navigationTypes = NativeStackNavigationProp<RootStackParamList, 'AppRoutes'>
  const navigation = useNavigation<navigationTypes>();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData); 
  const [userLogadoLocal, setUserLogadoLocal] = useState<IUser>({} as IUser);
  const [avatar, setAvatar] = useState<string>('');

  const dataKey_userLogado = '@gofinances:user_logado';
  const dataKey = '@gofinances:transactions';

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())));
  
      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions() {
    const response_userLogado = await AsyncStorage.getItem(dataKey_userLogado);
    const userLogadoEmArray = response_userLogado ? JSON.parse(response_userLogado) : {} as IUser;

    const primeiroElemntoDoArray: IUser = userLogadoEmArray[0][0];
    
    console.log("teste  : ", primeiroElemntoDoArray);

    if(primeiroElemntoDoArray.avatar === undefined) {
      const dataKey_userLogadoComAvatar = '@gofinances:user_logadoComAvatar';

      const data = await AsyncStorage.getItem(dataKey_userLogadoComAvatar);
      const userLogado2ComAvatar = data ? JSON.parse(data) : {} as IUser;
      const primeiroElemntoComAVATAR: IUser = userLogado2ComAvatar[0];
      console.log("primeiroElemntoComAVATAR : ", primeiroElemntoComAVATAR);
      console.log("meu avatar : ", primeiroElemntoComAVATAR.avatar);

      setUserLogadoLocal(primeiroElemntoComAVATAR);
      setAvatar(primeiroElemntoComAVATAR.avatar !== undefined ? primeiroElemntoComAVATAR.avatar : "https://avatars.githubusercontent.com/u/53240060?v=4");
    }

    // console.log("Dados do meu Usuario logado: ", primeiroElemntoDoArray);
    console.log("meu avatar : ", avatar);

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {
      if(item.type === 'positive') {
        entriesTotal += Number(item.amount);
      }

      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensives}`;
    
    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saida dia ${lastTransactionExpensives}` 
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    });
    
    setIsLoading(false);
  }
  async function signOut(){
    await AsyncStorage.removeItem(dataKey_userLogado);
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    loadTransactions();

    // const dataKey = '@gofinances:transactions';
    // AsyncStorage.removeItem(dataKey);
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      { 
      isLoading ? 
      <LoadContainer>
        <ActivityIndicator color='red' size='large' />  
      </LoadContainer> :
      <>
        <Header>
          <UserWrapper>
            <UserInfo>
              { avatar ? <Photo source={{ uri: avatar }} /> :  <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/53240060?v=4' }} />}
             
              <User>
                <UserGreeting>Ola, </UserGreeting>
                <UserName>{userLogadoLocal.name}</UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={signOut}>
              <Icon name='power' />
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighlightCards>
          <HighlightCard 
            type='up'
            title="Entradas" 
            amount={highlightData.entries.amount}
            lastTransactioin={highlightData.entries.lastTransaction} />
          <HighlightCard
            type='down'
            title="Saida" 
            amount={highlightData.expensives.amount}
            lastTransactioin={highlightData.expensives.lastTransaction} />
          <HighlightCard 
            type='total'
            title="Total" 
            amount={highlightData.total.amount}
            lastTransactioin={highlightData.total.lastTransaction} />
        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>

          <TransactionList
              data={transactions}
              keyExtractor={(item: DataListProps) => String(item.id)}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
      </>
    }
    </Container>
  )
}
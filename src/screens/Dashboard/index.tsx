import React, { useEffect, useState, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';
import { ActivityIndicator, StatusBar } from 'react-native';
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

import { Button } from '../../components/Forms/Button';



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

  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData); 
  const [userLogadoLocal, setUserLogadoLocal] = useState<IUser>({} as IUser);
  const [avatar, setAvatar] = useState<string>('');

  const dataKey_userLogado = '@gofinances:user_logado';
  const dataKey = '@gofinances:transactions';
  const dataKey_avatar = '@gofinances:avatar_local';

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())));
      return Number.isNaN(lastTransaction.getDate()) ?  `vazio` : `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions() {
    const response_userLogado = await AsyncStorage.getItem(dataKey_userLogado);
    const userLogadoEmArray = response_userLogado ? JSON.parse(response_userLogado) : {} as IUser;

    const primeiroElemntoDoArray: IUser = userLogadoEmArray[0][0];

    setUserLogadoLocal(primeiroElemntoDoArray);

    const response_avatarLocal = await AsyncStorage.getItem(dataKey_avatar);
    const avatarLocal = response_avatarLocal ? JSON.parse(response_avatarLocal) : String;
    console.log("Avatar local : ", avatarLocal);

    if(avatarLocal !== null) {
      console.log("meu avatar local: ", avatarLocal);
      setAvatar(avatarLocal);
    }

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {
      if(item.type === 'positive'){
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
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
        lastTransaction: lastTransactionEntries !== 'vazio' ? `Última entrada dia ${lastTransactionEntries}` : `Nenhuma entrada disponivel`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensives !== 'vazio' ? `Última saida dia ${lastTransactionExpensives}` : `Nenhuma saida disponivel`
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

  function MeuPerfil(){
    navigation.navigate('Profile');
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
       <StatusBar
              barStyle='light-content'
              translucent
              backgroundColor='transparent'
            />
      { 
      isLoading ? 
      <LoadContainer>
        <ActivityIndicator color='red' size='large' />  
      </LoadContainer> :
      <>
        <Header>
          <UserWrapper>
            <UserInfo>
              { avatar ? <Photo source={{ uri: avatar }} /> :  <Photo source={require('../../assets/userNaoAtivo.png')} />}
             
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
            lastTransaction={highlightData.entries.lastTransaction} />
          <HighlightCard
            type='down'
            title="Saida" 
            amount={highlightData.expensives.amount}
            lastTransaction={highlightData.expensives.lastTransaction} />
          <HighlightCard 
            type='total'
            title="Total" 
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction} />
        </HighlightCards>


        <Transactions>
        <Button title='Editar Perfil' onPress={MeuPerfil} color={theme.colors.secondary} />

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
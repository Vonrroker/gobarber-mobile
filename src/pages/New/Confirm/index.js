import React, { useMemo } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import api from '~/services/api';

const { baseURL } = api.defaults;

// eslint-disable-next-line react/prop-types
export default function Confirm({ navigation }) {
  // eslint-disable-next-line react/prop-types
  const provider = navigation.getParam('provider');

  // eslint-disable-next-line react/prop-types
  const time = navigation.getParam('time');

  const dateFormated = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    // eslint-disable-next-line react/prop-types
    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? `${baseURL}/files/${provider.avatar.path}`
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>

        <Time>{dateFormated}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

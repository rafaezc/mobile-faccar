import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function Protocolos({navigation, route}) {
  
  const {user_id} = route.params;
  const [user, setUser] = useState('');
  const [protocolos, setProtocols] = useState('');
  var array_protocolos = [];

  useEffect(() => {
    AsyncStorage.getItem('@user').then(user => {
      let mounted = true;
      if (!user) {
        navigation.navigate('Login');
        return function cleanup() {
          mounted = false;
        }
      } else {
        setUser(JSON.parse(user));
      }
    });
    if (!protocolos) {
      getProtocols();
    }
  });

  async function getProtocols() {
    const protocolos = await api.post('/protocolo/aluno', {
      user: user_id,
    });
    if (protocolos.status === 200) {
      setProtocols(protocolos.data);
    } else {
      setProtocols(protocolos.data);
      alert(protocolos.data.message); 
    }

  }

  dataFormat();

  function dataFormat() {
    for (let i = 0; i< protocolos.length; i++) {
      array_protocolos.push(protocolos[i].type + ' \n' + 'Status: ' + protocolos[i].status + ' \n\n');
    }
  }

  function goBack() {
    navigation.navigate('Index');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Protocolos
        </Text>
      </View>
      <View>
        <Text style={styles.grades}> 
          {array_protocolos}
        </Text>
      </View>
      <View style={styles.form}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.textBackButton}>
              Voltar
          </Text>
        </TouchableOpacity>
      </View>  
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    marginTop: 60,
    marginBottom: 10,
    fontSize: 30,
    flexDirection: 'row' 
  }, 
  grades: {
    fontSize: 20,
    color: '#000',
    paddingLeft: 35,
    paddingRight: 35 
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginTop: 0
  },
  backButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#05509b',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15
  },
  textBackButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#05509b'
  }
});
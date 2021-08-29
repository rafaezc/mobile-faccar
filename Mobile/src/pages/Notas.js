import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function Notas({navigation, route}) {
  
  const {user_id, subject_id} = route.params;
  const [user, setUser] = useState('');
  const [notas, setNotas] = useState('');
  var array_notas = [];

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
    if (!notas) {
      getGrades();
    }
  });

  async function getGrades() {
    const notas = await api.post('/nota/aluno', {
      user: user_id,
      subject: subject_id
    });
    if (notas.status === 200) {
      setNotas(notas.data);
    } else {
      setNotas(notas.data);
      alert(notas.data.message); 
    }

  }

  dataFormat();

  function dataFormat() {
    for (let i = 0; i< notas.length; i++) {
      array_notas.push(notas[i].period + ': ' + notas[i].result + ' \n');
    }
  }

  function goBack() {
    navigation.navigate('Index');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Notas
        </Text>
      </View>
      <View>
        <Text style={styles.grades}> 
          {array_notas}
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
    color: '#000'
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
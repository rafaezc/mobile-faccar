import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function Faltas({navigation, route}) {
  
  const {user_id, subject_id} = route.params;
  const [user, setUser] = useState('');
  const [faltas, setFaltas] = useState('');
  var array_faltas = [];

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
    if (!faltas) {
      getMisses();
    }
  });

  async function getMisses() {
    const faltas = await api.post('/falta/aluno', {
      user: user_id,
      subject: subject_id
    });
    console.log(faltas.data);
    if (faltas.status === 200) {
      setFaltas(faltas.data);
    } else {
      let errorMessage = response.data; 
      console.log(errorMessage);
    }

  }

  dataFormat();

  function dataFormat() {
    for (let i = 0; i< faltas.length; i++) {
      let x;
      if (faltas[i].quantity < 10) {
        x = 0;
      } else {
        x = '';
      }
      array_faltas.push(faltas[i].period + ': ' + x + faltas[i].quantity + ' \n');
    }
  }

  function goBack() {
    navigation.navigate('Index');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Faltas
        </Text>
      </View>
      <View>
        <Text style={styles.grades}> 
          {array_faltas}
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
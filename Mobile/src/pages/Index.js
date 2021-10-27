import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import avatar from '../../assets/logoFaccar.png';
import api from '../services/api';
import ListItem from '../components/ListItem';

export default function Index({navigation}) {
  
  const [user, setUser] = useState('');
  const [materias, setMaterias] = useState('');

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
    if (!materias) {
      getSubjects();
    }
  });

  async function getSubjects() {
    const materias = await api.get('/materia');
    if (materias.status === 200) {
      setMaterias(materias.data);
    } else {
      setMaterias(materias.data);
      alert(materias.data.message); 
    }
  }

  function logOff() {
    AsyncStorage.removeItem('@user');
    navigation.navigate('Login');
  }

  function editUser() {
    navigation.navigate('Usuario');
  }

  function watchProtocol() {
    navigation.navigate('Protocolos', { user_id: user._id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image style={styles.avatar} source={avatar}></Image>
        </View>
        <View>
          <Text style={styles.name}>
            {user.name}
          </Text>
          <Text style={styles.text}>
            {user.ra}
          </Text>
          <Text style={styles.text}>
            {user.email}
          </Text>
        </View>
          <View style={styles.logoutArea}>
            <Icon onPress={logOff} iconStyle={styles.logout} name="logout" />
            <Icon onPress={editUser} iconStyle={styles.config} name="cog" type="font-awesome" />
          </View>
      </View>
      <View style={styles.form}>
        <TouchableOpacity onPress={watchProtocol} style={styles.protocolButton}>
          <Text style={styles.protocolTextButton}>
              Protocolos
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList 
          data={materias}
          keyExtractor={item => item._id} 
          renderItem={({item}) => (
            <ListItem
              data={item}
              handlerLeft={() => {navigation.navigate('Notas', { user_id: user._id, subject_id: item._id })}}
              handlerRight={() => {navigation.navigate('Faltas', { user_id: user._id, subject_id: item._id })}}
            />
          )}
          ItemSeparatorComponent={() => <Separator/>}
        />
      </View>
    </View>
  );
}

const Separator = () => <View style={{flex: 1, height: 2, backgroundColor:'#ddd', }}></View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    width: '100%',
    marginTop: 40,
    marginBottom: 10,
    paddingVertical: 10,
    flexDirection: 'row'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10
  },
  name: {
    width: 250,
    fontSize: 30
  },
  text: {
    width: 250,
    color: '#000',
    fontSize: 14
  },
  logoutArea: {
    width: 80,
    height: 60
  },
  logout: {
    marginTop: 10,
    paddingBottom: 1,
    fontSize: 37
  },
  config: {
    paddingTop: 1,
    fontSize: 37
  }, form: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginTop: 0
  }, protocolButton: {
    backgroundColor: '#05509b',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#05509b',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 40
  }, protocolTextButton: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
});
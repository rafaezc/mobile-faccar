import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import avatar from '../../assets/logoFaccar.png';
import api from '../services/api';
import ListItem from '../components/ListItem';

export default function Index({navigation}) {
  
  const [user, setUser] = useState('');
  const [materias, setMaterias] = useState('');

  useEffect(() => {
    if (!materias) {
      getSubjects();
    }
    AsyncStorage.getItem('@user').then(user => {
      if (!user) {
        navigation.navigate('Login');
      } else {
        setUser(JSON.parse(user));
      }
    });
  });

  async function getSubjects() {
    const materias = await api.get('/materia');
    console.log(materias.data);
    if (materias.status === 200) {
      setMaterias(materias.data);
    } else {
      let errorMessage = response.data; //--Voltar aqui mais tarde--//
      console.log(errorMessage);
    }
  }

  function logOff() {
    AsyncStorage.removeItem('@user');
    navigation.navigate('Login');
  }

  function editUser() {
    navigation.navigate('Usuario');
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
        <View>
          <FlatList 
            data={materias}
            keyExtractor={item => item._id} 
            renderItem={({item}) => (
              <ListItem
                data={item}
                handlerLeft={() => {navigation.navigate('Notas')}}
                handlerRight={() => {navigation.navigate('Faltas')}}
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
    marginTop: 30,
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
    fontSize: 30,
    flexDirection: 'row' 
  },
  text: {
    color: '#000',
    fontSize: 14
  },
  logoutArea: {
    width: 100,
    height: 60,
    marginTop: 10
  },
  logout: {
    paddingBottom: 1,
    fontSize: 37
  },
  config: {
    paddingTop: 1,
    fontSize: 37
  }
});
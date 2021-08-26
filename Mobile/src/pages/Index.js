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
    AsyncStorage.getItem('@user').then(user => {
      if (!user) {
        navigation.navigate('Login');
      } else {
        setUser(JSON.parse(user));
      }
    if (!materias) {
      getSubjects();
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
          <Text>
            {user.ra}
          </Text>
          <Text>
            {user.email}
          </Text>
        </View>
          <View styles={styles.logoutArea}>
            <Icon onPress={logOff} style={styles.logout} name="logout" />
          </View>
          <View styles={styles.configArea}>
            <Icon onPress={editUser} style={styles.config} name="cog" type="font-awesome"/>
          </View>
        <View>
          <FlatList 
            data={materias}
            keyExtractor={item => item._id} 
            renderItem={({item}) => (
              <ListItem
                data={item}
              />
            )}
            ItemSeparatorComponent={() => <Separator/>}
          />
        </View>
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
    borderRadius: 75,
    marginHorizontal: 10
  },
  name: {
    fontSize: 30,
    flexDirection: 'row' 
  },
  text: {
    color: '#000',
    fontSize: 32
  },
  logoutArea: {
    width: 80,
    height: 80,
    marginVertical: '5%'
  },
  logout: {
    marginVertical: 20,
    textAlign: 'center'
  },
  configArea: {
    height: 50,
    paddingVertical: 10
  },
  config: {
    marginVertical: 10
  }
});
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatar from '../../assets/logoFaccar.png';

export default function Usuario({navigation}) {

    const [user, setUser] = useState('');
    const [nome, setNome] = useState('');
    const [ra, setRa] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('@user').then(user => {
          if (!user) {
            navigation.navigate('Login');
          } else {
            setUser(JSON.parse(user));
          }
        });
    });

    function goBack() {
        navigation.navigate('Index');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image style={styles.avatar} source={avatar}></Image>
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input} 
                    placeholder="Nome" 
                    placeholderTextColor="#888"
                    autoCapitalize="words" 
                    value={nome} 
                    onChangeText={setNome} />

                <TextInput style={styles.input} 
                    placeholder="E-mail" 
                    placeholderTextColor="#888" 
                    textContentType="emailAddress"
                    maxLength={14}
                    value={email} 
                    onChangeText={setEmail} />

                <TextInput style={styles.input} 
                    placeholder="RA" 
                    placeholderTextColor="#888"
                    keyboardType="numeric" 
                    maxLength={10} 
                    value={ra}
                    onChangeText={setRa} />

                <TextInput style={styles.input} 
                    placeholder="Senha" 
                    placeholderTextColor="#888" 
                    secureTextEntry={true} 
                    maxLength={14}
                    value={pwd} 
                    onChangeText={setPwd} />
                <TouchableOpacity style={styles.button}> {/*onPress={editInfo}*/}
                    <Text style={styles.textButton}>
                        Enviar
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={goBack}style={styles.text}>
                <Text>
                    Voltar
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 50
    },
    avatar: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginVertical: 30
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        marginTop: 0
    },
    input: {
        height: 45,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#05509b',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 15
    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    }
});
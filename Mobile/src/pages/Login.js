import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import logoFaccar from '../../assets/logoFaccar.png';

export default function Login({navigation}) { 
    
    const [ra, setRa] = useState('');
    const [pwd, setPwd] = useState('');

    async function formSubmit() {
        await api.post('/user/validation', {
            ra,
            pwd
        }).then(response => {
            if (response.status === 200) {
                AsyncStorage.setItem('@user', JSON.stringify(response.data));
                navigation.navigate('Index');
            } else {
                alert(response.data.message); 
            }
            
        }).catch(error => console.log(error));

    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logoFaccar}></Image> 
            <View style={styles.form}>
                <Text style={styles.label}>
                    Acesso Restrito
                </Text>
                <TextInput style={styles.input} 
                    placeholder="Informe seu RA" 
                    placeholderTextColor="#888"
                    keyboardType="numeric" 
                    maxLength={10} 
                    value={ra}
                    onChangeText={setRa} />

                <TextInput style={styles.input} 
                    placeholder="Informe sua Senha" 
                    placeholderTextColor="#888" 
                    secureTextEntry={true} 
                    maxLength={14}
                    value={pwd} 
                    onChangeText={setPwd} />
                    
                <TouchableOpacity onPress={formSubmit} style={styles.button}>
                    <Text style={styles.textButton}>
                        Logar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 120,
        marginTop: 20
    },
    input: {
        height: 45,
        fontSize: 18,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        borderRadius: 10
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 5,
        color: '#555'
    },
    button: {
        backgroundColor: '#05509b',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    }
});
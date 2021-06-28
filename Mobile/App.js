import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes'
import { StyleSheet, Text, View } from 'react-native';
import api from './src/services/api';

export default function App() {
  return <Routes />; 
}


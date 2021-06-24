import React from 'react';
import { View, Text, StatusBar, StyleSheet} from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Index</Text>
      <StatusBar style="auto" />
    </View>
  );
}
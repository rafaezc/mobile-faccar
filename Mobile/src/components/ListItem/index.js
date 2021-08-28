import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'

export default function ListItem({data, handlerRight, handlerLeft}) {

  function LeftAction() {
    return (
      <View style={styles.leftAction}>
        <Text style={styles.textLeftAction}>
          Notas
        </Text>
      </View>
    )
  }

  function RightAction() {
    return (
      <View style={styles.rightAction}>
        <Text style={styles.textRightAction}>
          Faltas
        </Text>
      </View>
    )
  }

  return (
    <Swipeable
      renderLeftActions={LeftAction}
      renderRightActions={RightAction}
      onSwipeableLeftOpen={handlerLeft}
      onSwipeableRightOpen={handlerRight}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{data.name}</Text>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  }, 
  text: {
    fontSize: 14,
    color: '#222'
  }, 
  leftAction: {
    backgroundColor: '#0ae11e',
    flex: 1
  },
  textLeftAction: {
    padding: 20,
    color: '#fff',
    fontSize: 16
  },
  rightAction: {
    backgroundColor: '#a80202',
    flex: 1,
    flexDirection: 'row-reverse'
  },
  textRightAction: {
    padding: 20,
    color: '#fff',
    fontSize: 16
  }
});
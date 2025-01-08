import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import '@/globals.css'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Redirect href={'login'}/>
    </View>
  )
}

export default HomeScreen
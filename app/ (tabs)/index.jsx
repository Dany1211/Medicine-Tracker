import { View, Text, Button } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import '@/globals.css'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/FirebaseConfig'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen
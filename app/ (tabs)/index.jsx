import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { Redirect } from 'expo-router'
import '@/globals.css'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/FirebaseConfig'
import { useRouter } from 'expo-router'

const HomeScreen = () => {
  const router=useRouter();

  return (
    <View>
      <Text>HoScreen</Text>
      <Button title='Log Out' onPress={()=>signOut(auth)}></Button>

    </View>
  )
}

export default HomeScreen
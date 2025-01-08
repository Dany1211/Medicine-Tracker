import { View, Text, Image } from 'react-native'
import React from 'react'
import '@/globals.css'

const LoginScreen = () => {
  return (
    <View>
      <View>
        <Image source={require('@/assets/images/login.png')}>
              
        </Image>
      </View>
    </View>
  )
}

export default LoginScreen
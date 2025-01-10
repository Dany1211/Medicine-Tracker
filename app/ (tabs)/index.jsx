import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { Redirect } from 'expo-router'
import '@/globals.css'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/FirebaseConfig'
import { useRouter } from 'expo-router'
import Header from '@/components/Header'
import EmptyState from '@/components/EmptyState'

const HomeScreen = () => {
  const router=useRouter();

  return (
    <View className='p-[25px] bg-white h-[100%]'>
      <Header/>
      <EmptyState/>

    </View>
  )
}

export default HomeScreen
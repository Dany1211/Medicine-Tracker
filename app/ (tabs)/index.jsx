import { View, Text, Button,ScrollView, ScrollViewComponent } from 'react-native'
import React, { useState, } from 'react'
import { Redirect } from 'expo-router'
import '@/globals.css'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/FirebaseConfig'
import { useRouter } from 'expo-router'
import Header from '@/components/Header'
import EmptyState from '@/components/EmptyState'
import MedicationList from '@/components/MedicationList'


const HomeScreen = () => {
  const router=useRouter();



  return (
   <ScrollView className='bg-white flex-1'>
    <View className='p-[25px] bg-white h-[100%]'>
   <Header/>
   {/* <EmptyState/> */}
   <MedicationList/>

 </View>
 </ScrollView>
    
  )
}

export default HomeScreen
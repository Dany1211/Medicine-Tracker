import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import '@/globals.css'
import ConstantString from '@/constant/ConstantString'
import { useRouter } from 'expo-router'

const EmptyState = () => {
    const router=useRouter();
  return (
    <View className='flex mt-24 items-center'>
      <Image className='h-32 w-32 ml-4' source={require('../assets/images/medicine.png')}></Image>
      <Text className='text-[38px] font-bold mt-8'>{ConstantString.NoMedication}</Text>
      <Text className='text-[18px] text-center text-gray-500 mt-2'>{ConstantString.MedicationSubText}</Text>
      <TouchableOpacity className="w-[100%]" onPress={()=>router.push('/add-new-medication')}>
            <Text className="p-[15px]  bg-blue-500 rounded-[50px] text-center mt-10 text-[18px] text-white font-medium">{ConstantString.AddNewMediciationBtn}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default EmptyState
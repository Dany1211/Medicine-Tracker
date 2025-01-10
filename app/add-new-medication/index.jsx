import { View, Text } from 'react-native'
import React from 'react'
import AddMedicineHeader from '@/components/AddMedicineHeader'
import AddMedicationForm from '@/components/AddMedicationForm'

const AddNewMediciation = () => {
  return (
    <View className='bg-white h-[100%]'>
      <AddMedicineHeader/>
      <AddMedicationForm/>
    </View>
  )
}

export default AddNewMediciation
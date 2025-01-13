import { View, Text, Image, TouchableOpacity ,Alert} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import MedicationListCardItem from "@/components/MedicationListCardItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { arrayUnion, doc, updateDoc,getDoc,setDoc } from "firebase/firestore";
import moment from "moment";
import { db } from "@/config/FirebaseConfig";

const MedicationActionModal = () => {
  const medicine = useLocalSearchParams();
  console.log(medicine);

  const UpdateActionStatus = async (status) => {
    try {
      const docRef = doc(db, 'medications', medicine?.id);
  
      
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        await setDoc(docRef, { action: [] }); 
      }
  
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format('LT'),
          date: medicine?.selectedDate,
        }),
      });
  
      Alert.alert(
        status,
        'Medicine status saved!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/ (tabs)'),
          },
        ]
      );
    } catch (e) {
      console.error("Error updating action status:", e);
    }
  };
  

  return (
    <View className="bg-white flex-1 p-6 items-center justify-center">
      <Image
        className="size-28"
        source={require("assets/images/notification.gif")}
      ></Image>
      <Text className="text-[18px]">{medicine?.selectedDate}</Text>
      <Text className="text-[30px] font-bold text-blue-500">
        {medicine?.remainder}
      </Text>
      <Text className="text-[18px">It's time to take</Text>

      <MedicationListCardItem medicine={medicine} />

      <View className="flex flex-row mt-5 items-center gap-6">
        <TouchableOpacity onPress={()=>UpdateActionStatus('Taken')} className="bg-green-500 rounded-[15px] py-3 px-4 flex-row items-center gap-1">
          <Ionicons name="checkmark" size={24} color="white" />
          <Text className="text-white text-[20px]">Taken</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>UpdateActionStatus('Missed')} className="flex-row items-center bg-red-500 rounded-[15px] px-4 py-3 gap-1">
          <Ionicons name="close" size={24} color="white" />
          <Text className="text-white text-[20px]">Missed</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
      className="absolute bottom-5"
      onPress={()=>router.back()}
      >
        <Ionicons name="close-circle" size={44} color={'#D1D5DB'} />
      </TouchableOpacity>
    </View>
  );
};

export default MedicationActionModal;

import { View, Text, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const MedicationListCardItem = ({ medicine }) => {
  return (
    <View className="mt-3 p-3 rounded-[15px] border-gray-100 border-[2px] flex-row justify-between items-center w-full">
      <View className="flex-row gap-3 items-center">
        <View className="bg-white p-2 rounded-[15px]">
          <Image
            className="h-[50px] w-[50px]"
            source={{ uri: medicine.type.icon }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text className="text-[22px] font-bold text-[#00008B]">
            {medicine?.name}
          </Text>
          <Text className="text-[16px] font-medium text-[#0000CD]">
            {medicine?.when}
          </Text>
          <Text className="text-[#6A5ACD] font-medium">
            {medicine?.dose} {medicine?.type.name}
          </Text>
        </View>

      </View>
      <View className="p-3 flex items-center justify-center  bg-white rounded-[15px]">
      <Ionicons
            name="timer-outline"
            size={24}
            color="#0000CD"
            className="pr-[10px] "
          />
        <Text className="text-[#0000CD] font-bold">
            {medicine?.remainder}
        </Text>
      </View>
    </View>


   
  
  

  );
};

export default MedicationListCardItem;

import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const MedicationListCardItem = ({ medicine, selectedDate = '' }) => {
  console.log("Medicine Object:", medicine); // Debugging the medicine structure

  const [status, setStatus] = useState();

  const CheckStatus = () => {
    // Check if action exists and is an array
    const data = Array.isArray(medicine?.action)
      ? medicine.action.find((item) => item.date == selectedDate)
      : undefined;

    console.log("Status Data:", data); // Debugging the result
    setStatus(data);
  };

  useEffect(() => {
    CheckStatus();
  }, [medicine]);

  return (
    <View className="mt-3 p-3 rounded-[15px] border-gray-100 border-[2px] flex-row justify-between items-center w-full">
      <View className="flex-row gap-3 items-center">
        <View className="bg-white p-2 rounded-[15px]">
          <Image
            className="h-[50px] w-[50px]"
            source={{ uri: medicine?.type?.icon }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text className="text-[22px] font-bold text-[#00008B]">
            {medicine?.name || "No Name"}
          </Text>
          <Text className="text-[16px] font-medium text-[#0000CD]">
            {medicine?.when || "No Timing"}
          </Text>
          <Text className="text-[#6A5ACD] font-medium">
            {medicine?.dose} {medicine?.type?.name || "No Type"}
          </Text>
        </View>
      </View>
      <View className="p-3 flex items-center justify-center bg-white rounded-[15px]">
        <Ionicons
          name="timer-outline"
          size={24}
          color="#0000CD"
          className="pr-[10px]"
        />
        <Text className="text-[#0000CD] font-bold">
          {medicine?.remainder || "No Remainder"}
        </Text>
      </View>

      {status?.date && (
        <View className="absolute top-1 left-1">
          {status?.status === "Taken" ? (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#22C55E"
              className="pr-[10px]"
            />
          ) : (
            status?.status === "Missed" && (
              <Ionicons
                name="close-circle"
                size={24}
                color="#EF4444"
                className="pr-[10px]"
              />
            )
          )}
        </View>
      )}
    </View>
  );
};

export default MedicationListCardItem;

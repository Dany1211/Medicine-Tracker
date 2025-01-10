import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

const AddMedicineHeader = () => {
  const router = useRouter();
  return (
    <View>
      <Image
        className="h-[280px] w-[100%]"
        source={require("assets/images/consult.png")}
      ></Image>
      <TouchableOpacity className="absolute left-5 mt-3" onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AddMedicineHeader;

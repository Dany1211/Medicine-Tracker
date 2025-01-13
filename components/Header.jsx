import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@/service/Storage";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    GetUserDetail();
  }, []);
  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    console.log(userInfo);
    setUser(userInfo);
  };

  return (
    <View>
      <View className=" flex-row items-center gap-3 justify-between">
        <View className=" flex-row items-center gap-3 ">
          <Image
            className="w-[45] h-[45]"
            source={require("assets/images/smiley.png")}
          ></Image>
          <Text className="text-[30px] font-bold">
            Hello {user?.displayName} 👋
          </Text>
        </View>

        <TouchableOpacity onPress={()=>router.push('/add-new-medication')}>
          <Ionicons  name="medkit-outline" size={30} color={'#3B82F6'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

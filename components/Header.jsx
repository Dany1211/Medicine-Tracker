import { View, Text, Image, Button } from "react-native";
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
    <View className="">
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

        <View>
          <Ionicons  name="settings-outline" size={30} color={'#8f8f8f'} />
        </View>
      </View>
    </View>
  );
};

export default Header;

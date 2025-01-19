import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@/service/Storage";
import { router } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';

const Profile = () => {
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
    <View className="p-[25px] bg-white h-[100%]">
         <View>
      <View className=" flex-row items-center gap-3 justify-between">
        <View className=" flex-row items-center gap-3 ">
        
          <Text className="text-[30px] font-bold">
            Hello {user?.displayName} 👋
          </Text>
        </View>
      </View>
    </View>
    
    <TouchableOpacity onPress={()=>router.push('/login')}>
             
            <Text className=" p-[15px] bg-blue-500 rounded-[50px] text-center mt-10 text-[18px] text-white font-medium">Log Out <Entypo name="log-out" size={24} color="white" /></Text>
        </TouchableOpacity>
    </View>
  
     
   
  );
};

export default Profile;

import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import "@/globals.css";
import { push } from "expo-router/build/global-state/routing";
import { useRouter } from "expo-router";

const LoginScreen = () => {

const router=useRouter();


  return (
    <View className="bg-white flex-1">
      <View className="items-center mt-20">
        <Image
          source={require("@/assets/images/logoSplash.png")}
          className="w-[350px] h-[350px] rounded-lg "
        ></Image>
      </View>
      <View className="p-8 bg-blue-500 h-[100%] mt-[80px] rounded-t-[20px]">
        <Text className=" text-white font-bold text-[30px] text-center">Stay on Track,Stay Healthy!</Text>
        <Text className="text-white text-center text-[18px] mt-[20px]">Track your Meds, take control of your health, stay consistent, stay confident. </Text>

        <TouchableOpacity onPress={()=>router.push('/login/signIn')}>
            <Text className="p-[15px] bg-white rounded-[50px] text-center mt-10 text-[18px] text-blue-500 font-medium">Continue</Text>
        </TouchableOpacity>
        <Text className="text-white mt-2">By clicking continue button, you will agree to our terms and conditions.</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
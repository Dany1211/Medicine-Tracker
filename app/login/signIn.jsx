import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import "@/globals.css";
import { router, useRouter } from "expo-router";

const SignIn = () => {
  const router=useRouter();
  return (
    <View className="p-[30px] bg-white flex-1 justify-center">
      <Text className="text-[30px] font-bold">Let's Sign You In</Text>
      <Text className="text-[24px] font-bold mt-4 text-gray-400">
        Welcome Back
      </Text>
      <Text className="text-[24px] font-bold mt-1 text-gray-400">
        You've been missed!
      </Text>

      <View className="mt-6">
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          className="text-[17px] p-3 rounded-xl border-black border-[1px] mt-3 bg-[#F5F5F5] "
        ></TextInput>
        <Text className="mt-6">Password</Text>
        <TextInput
          returnKeyType="done"
          secureTextEntry={true}
          placeholder="Password"
          className="text-[17px] p-3 rounded-xl border-black border-[1px] mt-3 bg-[#F5F5F5] "
        ></TextInput>
      </View>
      <TouchableOpacity className="p-3 bg-blue-500 rounded-xl mt-10">
        <Text className="text-white text-[18px] text-center font-semibold">
          Log In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/login/signUp')} className="p-3 bg-white rounded-xl mt-3">
        <Text className="text-blue-500 text-[18px] text-center font-semibold">
          Create an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

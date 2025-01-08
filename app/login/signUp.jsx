import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import "@/globals.css";
import { router, useRouter } from "expo-router";

const SignUp = () => { 
  const router=useRouter();
  return (
    <View className="p-[30px] bg-white flex-1 justify-center">
      <Text className="text-[30px] font-bold">Create new account</Text>

      <View className="mt-6">
        <Text>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          className="text-[17px] p-3 rounded-xl border-black border-[1px] mt-3 bg-[#F5F5F5] "
        ></TextInput>
        <Text className="mt-6">Email</Text>
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
          Create an account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/login/signIn')} className="p-3 bg-white rounded-xl mt-3">
        <Text className="text-blue-500 text-[18px] text-center font-semibold">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp
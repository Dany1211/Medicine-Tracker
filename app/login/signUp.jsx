import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import React, { useState } from "react";
import "@/globals.css";
import { router, useRouter } from "expo-router";
import {auth} from '@/config/FirebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";



const SignUp = () => { 
  const router=useRouter();
  const [email,setEmail] = useState();
  const [password,setPassword ] = useState();
  
  const onCreateAccount = ()=>{

  if(!email||!password){
    ToastAndroid.show('Please fill all the details',ToastAndroid.BOTTOM)
    Alert.alert('Please fill all the details')
  }

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    router.push("/ (tabs)")

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode );
    if(errorCode=='auth/email-already-in-use'){
      ToastAndroid.show('Email already exists',ToastAndroid.BOTTOM)
      Alert.alert('Email already exists')
      return ;
    }
    // ..
  });
  }


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
        onChangeText={(value)=>setEmail(value)}
          placeholder="Email"
          className="text-[17px] p-3 rounded-xl border-black border-[1px] mt-3 bg-[#F5F5F5] "
        ></TextInput>
        <Text className="mt-6">Password</Text>
        <TextInput
        onChangeText={(value)=>setPassword(value)}
          returnKeyType="done"
          secureTextEntry={true}
          placeholder="Password"
          className="text-[17px] p-3 rounded-xl border-black border-[1px] mt-3 bg-[#F5F5F5] "
        ></TextInput>
      </View>
      <TouchableOpacity onPress={onCreateAccount} className="p-3 bg-blue-500 rounded-xl mt-10">
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
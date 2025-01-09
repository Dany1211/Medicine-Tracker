import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignInClick = () => {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.replace('/ (tabs)')
      })
      .catch((error) => {
        console.log("Firebase Auth Error:", error);

        Alert.alert("Invalid email or password");
      });
  };

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
          onChangeText={(value) => setEmail(value)}
          placeholder="Email"
          value={email}
          className="text-[17px] p-3 rounded-xl border-black border-[1px] mt-3 bg-[#F5F5F5]"
        />
        <Text className="mt-6">Password</Text>
        <TextInput
          onChangeText={(value) => setPassword(value)}
          returnKeyType="done"
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          className="text-[17px] p-3 rounded-xl border-black border-[1px] mt-3 bg-[#F5F5F5]"
        />
      </View>
      <TouchableOpacity
        onPress={onSignInClick}
        className="p-3 bg-blue-500 rounded-xl mt-10"
      >
        <Text className="text-white text-[18px] text-center font-semibold">
          Log In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/login/signUp")}
        className="p-3 bg-white rounded-xl mt-3"
      >
        <Text className="text-blue-500 text-[18px] text-center font-semibold">
          Create an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
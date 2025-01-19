import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import { useRouter } from "expo-router";
import { getLocalStorage } from "@/service/Storage";


const TabLayout = () => {
  const router=useRouter();
  useEffect(()=>{
    GetUserDetail()
  },[])
  const GetUserDetail=async ()=>{
    const userInfo =await getLocalStorage('userDetail')
    if(!userInfo){
      router.push('/login')
    }
  }

  
 


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

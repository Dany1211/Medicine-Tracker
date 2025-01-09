import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import { useRouter } from "expo-router";

const TabLayout = () => {
  const router=useRouter();
  const [authenticated,setAuthenticated]=useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid)
      setAuthenticated(true)
      // ...
    } else {
      
      setAuthenticated(false)
      // User is signed out
      // ...
    }
  });

  useEffect(()=>{
      if(authenticated==false){
        router.push('/login')
      }
  },[authenticated])


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
        name="AddNew"
        options={{
          tabBarLabel:'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" size={30} color={color} />
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

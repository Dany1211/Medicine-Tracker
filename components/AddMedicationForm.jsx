import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TypeList, WhenToTake } from "@/constant/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, formatDateForText, formatTime, getDatesRange } from "@/service/ConvertDateTime";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { getLocalStorage } from "@/service/Storage";
import { useRouter } from 'expo-router';

const AddMedicationForm = () => {
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelect = (item) => {
    setSelectedType(item.name);
    onHandleInputChange("type", item);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const saveMedication = async () => {
    const user = await getLocalStorage("userDetail");

    if (
      !(
        formData?.name &&
        formData?.type &&
        formData?.dose &&
        formData?.startDate &&
        formData?.endDate &&
        formData?.remainder
      )
    ) {
      Alert.alert("Please enter all fields");
      return;

    }
    const dates=getDatesRange(formData?.startDate,formData?.endDate);
    console.log(dates)

    try {
      await addDoc(collection(db, "medications"), {
        ...formData,
        userEmail: user?.email,
        createdAt: new Date(),
        dates:dates
      });
      Alert.alert("Medication added successfully", "", [
        {
          text: "OK",
          onPress: () => {
            router.push('/ (tabs)');
          },
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert('Failed to add medication');
    }
  };
  return (
    <View className="p-6">
      <Text className="font-bold text-[25px]">Add New Medication</Text>
      <View className="flex-row items-center rounded-xl pl-3 py-1 border-[#E5E7EB] border-[1px] mt-3 gap-1">
        <Ionicons
          name="medkit-outline"
          size={24}
          color="#3B82F6"
          className="border-r-[1px] pr-[10px] border-[#E5E7EB]"
        />
        <TextInput
          onChangeText={(value) => onHandleInputChange("name", value)}
          placeholder="Medicine Name"
          className="flex-1 px-2 py-3 rounded text-[16px]"
        />
      </View>

      {/* List for medicine types */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={TypeList}
        horizontal
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            className={`flex-row items-center rounded-xl p-[12px] mx-2 border-[#E5E7EB] border-[1px] mt-4 
                            ${
                              selectedType === item.name
                                ? "bg-blue-500"
                                : "bg-white"
                            }`}
          >
            <Image
              source={{ uri: item.icon }}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <Text
              className={`text-[14px] ${
                selectedType === item.name ? "text-white" : "text-black"
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Dose input */}
      <View className="flex-row items-center rounded-xl pl-3 py-1 border-[#E5E7EB] border-[1px] mt-4 gap-1">
        <Ionicons
          name="eyedrop-outline"
          size={24}
          color="#3B82F6"
          className="border-r-[1px] pr-[10px] border-[#E5E7EB]"
        />
        <TextInput
          onChangeText={(value) => onHandleInputChange("dose", value)}
          placeholder="Dose Ex. 1, 2 drops, 10ml"
          className="flex-1 px-2 py-3 rounded text-[16px]"
        />
      </View>

      {/* When to take dropdown */}
      <View className="flex-row items-center rounded-xl pl-3 py-1 border-[#E5E7EB] border-[1px] mt-4 gap-1">
        <Ionicons
          name="time-outline"
          size={24}
          color="#3B82F6"
          className="border-r-[1px] pr-[10px] border-[#E5E7EB]"
        />
        <Picker
          style={{ width: "90%" }}
          selectedValue={formData?.when}
          onValueChange={(itemValue) => {
            onHandleInputChange("when", itemValue);
          }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Date picker for start and end dates */}
      <View className="flex flex-row justify-between gap-5">
        <TouchableOpacity
          className="flex-1 flex-row items-center rounded-xl pl-3 py-1 border-[#E5E7EB] border-[1px] mt-4 gap-1"
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color="#3B82F6"
            className="border-r-[1px] pr-[10px] border-[#E5E7EB]"
          />
          <Text className="flex-1 px-2 py-3 text-[16px]">
            {formatDateForText(formData?.startDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>

        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            value={new Date(formData?.startDate) ?? new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "startDate",
                formatDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
          />
        )}

        <TouchableOpacity
          className="flex-row flex-1 items-center rounded-xl pl-3 py-1 border-[#E5E7EB] border-[1px] mt-4 gap-1"
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color="#3B82F6"
            className="border-r-[1px] pr-[10px] border-[#E5E7EB]"
          />
          <Text className="flex-1 px-2 py-3 text-[16px]">
            {formatDateForText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>

        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            value={new Date(formData?.endDate) ?? new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "endDate",
                formatDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
          />
        )}
      </View>

      {/* remainder input section  */}
      <View className="flex flex-row justify-between gap-5">
        <TouchableOpacity
          className="flex-1 flex-row items-center rounded-xl pl-3 py-1 border-[#E5E7EB] border-[1px] mt-4 gap-1"
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            name="timer-outline"
            size={24}
            color="#3B82F6"
            className="border-r-[1px] pr-[10px] border-[#E5E7EB]"
          />
          <Text className="flex-1 px-2 py-3 text-[16px]">
            {formData?.remainder??'set reminder'}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <RNDateTimePicker
            mode="time"
            value={
              formData?.remainder?? new Date()
            }
            onChange={(event) => {
              if (event.type === "set") {
                onHandleInputChange("remainder", formatTime(event.nativeEvent.timestamp));
              }
              setShowTimePicker(false);
            }}
          />
        )}
      </View>

      <TouchableOpacity onPress={() => saveMedication()} className="w-[100%]">
        <Text className="p-[15px]  bg-blue-500 rounded-[50px] text-center mt-7 text-[18px] text-white font-medium">
          Add Medication
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMedicationForm;

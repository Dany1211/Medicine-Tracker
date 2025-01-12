import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getDateRangeTODisplay } from "@/service/ConvertDateTime";
import moment from "moment";
import { getLocalStorage } from "@/service/Storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import MedicationListCardItem from "./MedicationListCardItem";

const MedicationList = () => {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/YYYY")
  );

  useEffect(() => {
    getDateRangeList();
  }, []);

  const getDateRangeList = () => {
    const dateRange = getDateRangeTODisplay();
    setDateRange(dateRange);
    if (dateRange.length > 0) {
      const firstDate = dateRange[0].formatedDate;
      setSelectedDate(firstDate);
      GetMedicationList(firstDate);
    }
  };

  const handleSelect = (item) => {
    setSelectedDate(item.formatedDate);
    GetMedicationList(item.formatedDate);
  };

  const GetMedicationList = async (selectedDate) => {
    const user = await getLocalStorage("userDetail");

    console.log("User Email:", user?.email);

    try {
      const q = query(
        collection(db, "medications"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );

      console.log("Query:", q);

      const querySnapshot = await getDocs(q);
      const medications = [];

      if (querySnapshot.empty) {
        console.log("No matching documents found.");
      } else {
        querySnapshot.forEach((doc) => {
          console.log("docId:", doc.id, "==>", doc.data());
          medications.push({ id: doc.id, ...doc.data() });
        });
      }

      console.log("Fetched Medications:", medications);

      setMedList(medications);
    } catch (e) {
      console.error("Error fetching medications:", e);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = item.formatedDate === selectedDate;
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        className={`p-[15px] rounded-[15px] mr-3 mt-4 ${
          isSelected ? "bg-blue-500" : "bg-gray-100"
        }`}
      >
        <Text
          className={`text-center text-[20px] ${
            isSelected ? "text-white" : "text-black"
          }`}
        >
          {item.day}
        </Text>
        <Text
          className={`text-center text-[26px] font-bold ${
            isSelected ? "text-white" : "text-black"
          }`}
        >
          {item.date}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mt-6">
      <Image
        className="w-full h-52 rounded-[15px]"
        source={require("../assets/images/medication.jpeg")}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={dateRange}
        renderItem={renderItem}
        keyExtractor={(item) => item.formatedDate}
      />

      {/* Display fetched medications */}

      <FlatList
        className="mt-2"
        data={medList}
        renderItem={({ item, index }) => (
          <MedicationListCardItem medicine={item} />
        )}
      ></FlatList>
    </View>
  );
};

export default MedicationList;

import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyProgramWeekSingle from "./MyProgramWeekSingle";

const Tab = createMaterialTopTabNavigator();

const MyProgramWeek = ({ navigation }) => {
 
  return (
    <Tab.Navigator
      initialRouteName="Week1"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "500",
          marginTop: 40,
          textTransform: "capitalize",
        },
        tabBarStyle: { backgroundColor: "#f8ebff" },
        tabBarIndicatorStyle: {
          backgroundColor: "#000",
          height: 2,
          borderRadius: 100,
        },
      }}
    >
      <Tab.Screen
        name="Week1"
        //initialParams={{ initialParams: recordingData.slice(0, 7) }}
        component={MyProgramWeekSingle}
        options={{ tabBarLabel: "Week 1" }}
      />
    </Tab.Navigator>
  );
};

export default MyProgramWeek;

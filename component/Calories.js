import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../styleSheet/mainStyle";
import { ActivityIndicator, List } from "react-native-paper";
import { CaloriesData, CalOverViewData } from "./DataApi/Data";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { baseUrl } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Calories = ({ navigation }) => {
  const [calories, setCalories] = useState();
  const [Loading, setLoading] = useState(true);
  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const WorkOutFun = async () => {
      if (userToken) {
        try {
          const CalRes = await axios.get(baseUrl + "calories-page", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllCaloriesData = CalRes.data.data;
          console.log("All Calories Data", AllCaloriesData);
          setCalories(AllCaloriesData);
          setLoading(false);
        } catch (error) {
          console.log("Calories Details Error", error);
          setLoading(true);
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    WorkOutFun();
    asynget11();
  }, [userToken]);

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <StatusBar />
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignContent: "center",
          }}
        >
          <View style={{ flex: 8 }}>
            <Text
              style={{
                textTransform: "capitalize",
                height: 45,
                fontSize: 18,
                marginTop: 14,
                paddingLeft: 20,
                color: "#000",
              }}
            >
              Calories
            </Text>
          </View>
          <View style={{ flex: 2, alignSelf: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <MaterialCommunityIcons
                name="home"
                size={24}
                style={{ color: "#000" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Header */}
      {Loading ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="small" style={{ marginTop: "20%" }} />
          <Text style={{ marginTop: 10 }}>Please Wait...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={{ margin: 10 }}>
            <View>
              <Text style={{ padding: 10, fontSize: 18, fontWeight: "500" }}>
                Overview
              </Text>
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 6 }}>
                    <Text style={styles.OverTitle}>Net Calories</Text>
                    <Text style={styles.OverDisc}>
                      {calories?.calories} Calories
                    </Text>
                  </View>
                  <View style={{ flex: 6 }}>
                    <Text style={styles.OverTitle}>Target Calories</Text>
                    <Text style={styles.OverDisc}>2228/Day</Text>
                  </View>
                </View>
                <View style={{ flex: 6 }}>
                  <Text style={styles.OverTitle}>AIM</Text>
                  <Text style={styles.OverDisc}>Mild Weight Loss</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                borderRadius: 10,
                paddingBottom: 8,
              }}
            >
              <Text style={{ fontSize: 20, color: "#000", fontWeight: "bold" }}>
                Journals
              </Text>
            </View>

            {/* Start Card */}
            <View style={styles.CaloriCard}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, flex: 11 }}>
                  Breakfast
                </Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    navigation.navigate("CaloriesSearch", {
                      type: "Breakfast",
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 30,
                      height: 30,
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={"#000"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                {calories.plates
                  .filter((item) => item.type === "Breakfast")
                  .map((item) => item.diets)[0]
                  .map((item) => item.title).length === 0 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      padding: 15,
                      paddingLeft: 50,
                      paddingRight: 50,
                      fontSize: 16,
                      color: "#555",
                    }}
                  >
                    Add items in your Lunch journal to see them here.
                  </Text>
                ) : (
                  calories.plates
                    .filter((item) => item.type === "Breakfast")
                    .map((item) => item.diets)[0]
                    .map((item) => (
                      <View style={{ marginRight: 2 }}>
                        <Text
                          style={{
                            textAlign: "center",
                            padding: 15,
                            paddingLeft: 50,
                            paddingRight: 50,
                            fontSize: 16,
                            color: "#555",
                          }}
                        >
                          {item.title},
                        </Text>
                      </View>
                    ))
                )}
              </View>
            </View>
            {/* End Card */}
            {/* Start Card */}
            <View style={styles.CaloriCard}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, flex: 11 }}>
                  Elevenses
                </Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    navigation.navigate("CaloriesSearch", {
                      type: "Elevenses",
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 30,
                      height: 30,
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={"#000"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    padding: 15,
                    paddingLeft: 50,
                    paddingRight: 50,
                    fontSize: 16,
                    color: "#555",
                  }}
                >
                  Add items in your Lunch journal to see them here.
                </Text>
              </View>
            </View>
            {/* End Card */}
            {/* Start Card */}
            <View style={styles.CaloriCard}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, flex: 11 }}>
                  Lunch
                </Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    navigation.navigate("CaloriesSearch", { type: "Lunch" });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 30,
                      height: 30,
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={"#000"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    padding: 15,
                    paddingLeft: 50,
                    paddingRight: 50,
                    fontSize: 16,
                    color: "#555",
                  }}
                >
                  Add items in your Lunch journal to see them here.
                </Text>
              </View>
            </View>
            {/* End Card */}
            {/* Start Card */}
            <View style={styles.CaloriCard}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, flex: 11 }}>
                  Supper
                </Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    navigation.navigate("CaloriesSearch", { type: "Supper" });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 30,
                      height: 30,
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={"#000"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    padding: 15,
                    paddingLeft: 50,
                    paddingRight: 50,
                    fontSize: 16,
                    color: "#555",
                  }}
                >
                  Add items in your Lunch journal to see them here.
                </Text>
              </View>
            </View>
            {/* End Card */}
            {/* Start Card */}
            <View style={styles.CaloriCard}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, flex: 11 }}>
                  Dinner
                </Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    navigation.navigate("CaloriesSearch", { type: "Dinner" });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 30,
                      height: 30,
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={"#000"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    padding: 15,
                    paddingLeft: 50,
                    paddingRight: 50,
                    fontSize: 16,
                    color: "#555",
                  }}
                >
                  Add items in your Lunch journal to see them here.
                </Text>
              </View>
            </View>
            {/* End Card */}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Calories;

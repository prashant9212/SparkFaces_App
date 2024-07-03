import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styleSheet/mainStyle";

const MyProgramWeekSingle = ({ navigation }) => {
  return (
    <View style={styles.containerHome}>
      <View>
        <TouchableOpacity
          onPress={() => {
            //console.log(recording.id);
            navigation.navigate("MyProgramsDetailsVideo");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 90,
              marginLeft: 8,
              marginRight: 8,
              marginTop: 8,
              padding: 5,
              backgroundColor: "#fff",
              borderRadius: 10,
              elevation: 1,
              shadowColor: "#000",
            }}
          >
            <View style={{ flex: 7, padding: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  paddingBottom: 5,
                }}
              > Day 1</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 5 }}
                source={require("../assets/liveVideo.jpg")}
              ></Image>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            //console.log(recording.id);
            navigation.navigate("MyProgramWeek");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 90,
              marginLeft: 8,
              marginRight: 8,
              marginTop: 8,
              padding: 5,
              backgroundColor: "#fff",
              borderRadius: 10,
              elevation: 1,
              shadowColor: "#000",
            }}
          >
            <View style={{ flex: 7, padding: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  paddingBottom: 5,
                }}
              > Day 1</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 5 }}
                source={require("../assets/liveVideo.jpg")}
              ></Image>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            //console.log(recording.id);
            navigation.navigate("MyProgramWeek");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 90,
              marginLeft: 8,
              marginRight: 8,
              marginTop: 8,
              padding: 5,
              backgroundColor: "#fff",
              borderRadius: 10,
              elevation: 1,
              shadowColor: "#000",
            }}
          >
            <View style={{ flex: 7, padding: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  paddingBottom: 5,
                }}
              > Day 1</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 5 }}
                source={require("../assets/liveVideo.jpg")}
              ></Image>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyProgramWeekSingle;

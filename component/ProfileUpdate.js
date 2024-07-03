import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from "react-native";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProfileData } from "./DataApi/Data";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { TextInput } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ProfileUpdate = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState();
  const [Loading, setLoading] = React.useState(true);
  useEffect(() => {
    const asynget = async () => {
      const user = await AsyncStorage.getItem("user");
      setUserProfile(JSON.parse(user));
      setLoading(false)
      console.log(user);
    }
    asynget();
  }, [])
  return (
    <View style={styles.containerProfile}>
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}>
              <MaterialCommunityIcons name="menu-left" size={44} style={{ color: '#000' }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 11 }}>
            <Text style={{ textTransform: 'capitalize', height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              Update Profile
            </Text>
          </View>

        </View>
      </View>
      {/* Header */}

      {Loading ?
        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator size="small" style={{ marginTop: '20%', }} />
          <Text style={{ marginTop: 10, }}>Please Wait...</Text>
        </View>
        :
        <View>
          <View style={{ flexDirection: "row", marginTop: 5, }}>
            <View style={{ padding: 5, backgroundColor: '#eee', width: 100, height: 100, borderRadius: 50, margin: 8, marginLeft: '35%' }}>
              <Image source={{ uri: `${userProfile?.profile_image}` }} style={{ width: 90, height: 90, borderRadius: 50, }}></Image>
            </View>
          </View>

          <ScrollView>
            <View style={{ margin: 15 }}>
              <TextInput
                placeholder={userProfile?.first_name}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                placeholder={userProfile?.last_name}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                placeholder={userProfile?.email}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                placeholder={userProfile?.phone_number}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProfileUpdate");
                }}>
                <Text style={styles.ProfileUpBtn}>Update</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      }
    </View>
  );
};

export default ProfileUpdate;

import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from "react";
import { AllMyPrograms, OurBlogs, myPrograms } from './DataApi/Data'
import styles from '../styleSheet/mainStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import { baseUrl } from "../config/config";

const MyPrograms = ({ navigation }) => {
    const [myPrograms, setMyPrograms] = useState();
    useEffect(() => {
        axios.get(baseUrl + 'exercise-list').then((res) => {
            setMyPrograms(res.data.data);
            //console.log(res.data.data)
        });
    }, []);
  return (
    <View style={styles.containerHome}>
      <StatusBar />
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 8 }}>
            <Text style={{ height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              My Programs
            </Text>
          </View>
        </View>
      </View>
      {/* Header */}

      <ScrollView>
        <View style={{ width: '96%', marginStart: '2%', marginTop: '2%', borderRadius: 20, paddingBottom: 0, padding: 0, }}>
          {myPrograms?.map((data, number) => {
            return (
              <View key={number.toString()} style={{ marginBottom: 10, padding: 8, elevation: 1, shadowColor: "#000", backgroundColor: '#fff', width: '100%', borderRadius: 10 }}>
                <Image  style={styles.BlogImg} source={{ uri: `${data.exercise_image}` }}></Image>
                <Text style={{ padding: 10, fontSize: 18, fontWeight: '500' }}>{data.title}</Text>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, }}>
                  <View style={{ flex: 5, paddingLeft: 15, }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{data.type}</Text>
                    <Text style={{ fontSize: 14, color: '#777', paddingTop: 3, }}>Duration: {data.duration}</Text>
                  </View>
                  <View style={{ flex: 3, marginBottom: 7, marginTop: 7, alignSelf: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("MyProgramsDetails", { id: data.id });
                      }}>
                      <View>
                        <Text style={{ padding: 8, paddingLeft: 12, paddingRight: 12, color: '#000', borderRadius: 20, fontSize: 12, borderColor: '#ccc', borderWidth: 1, fontWeight: '500', backgroundColor: '#eee' }}>Play Video</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )
          })}
        </View>
      </ScrollView>

    </View>
  )
}

export default MyPrograms
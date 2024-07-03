import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, CheckBox, Checkbox, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../config/config";
import { CommonActions, useRoute } from "@react-navigation/native";
import { toast } from "./common/toast";

const CaloriesSearch = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);
  const [Loading, setLoading] = React.useState(true);
  const [caloriesData, setCaloriesData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [userToken, setMainToken] = useState();
  const [concernedData, setConcernedData] = useState([]);
  const [searchq, setSearchq] = useState("");
  useEffect(() => {
    const DietFoodFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + "diet-list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllCaloriesData = response.data.data;
          setRenderData(AllCaloriesData);
          setCaloriesData(AllCaloriesData);
        } catch (error) {
          console.log("Calories Data", error);
          if (error.response.data.status === 401)
            AsyncStorage.clear().finally(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              );
            });
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    asynget11();
    DietFoodFun();
  }, [userToken]);

  useEffect(() => {
    const getCalories = async () => {
      try {
        const CalRes = await axios.get(baseUrl + "calories-page", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const AllCaloriesData2 = CalRes.data.data;
        if (AllCaloriesData2.plates) {
          try {
            const concernedData = AllCaloriesData2.plates
              .filter((item) => item.type === route.params?.type)[0]
              .diets.map((item) => item.id);
            setCheckedItems(concernedData);
          } catch (error) {
            setCheckedItems([]);
          }
        }
      } catch (error) {
        if (err.response.status === 401)
          AsyncStorage.clear().finally(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          });
      }
    };
    getCalories().finally(() => {
      setLoading(false);
    });
  });

  useEffect(() => {
    if (searchq) {
      console.log(userToken);
      axios
        .get(baseUrl + "diet-list?title=" + searchq, {
          headers: {
            "Content-Type": "application/json",
            Authorizartion: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          setRenderData(res.data.data);
        });
    } else {
      setRenderData(caloriesData);
    }
  }, [searchq]);

  const route = useRoute();

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
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
              {route?.params?.type}
            </Text>
          </View>
          <View style={{ flex: 2, alignSelf: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <MaterialCommunityIcons name="home" size={24} style={{ color: "#000" }} />
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
        <View>
          <View style={{ width: 360, margin: "3%", borderRadius: 5 }}>
            <Text>
              <TextInput
                value={searchq}
                onChangeText={setSearchq}
                style={{
                  width: 360,
                  backgroundColor: "#fff",
                  borderColor: "#eee",
                }}
                placeholder="Enter Food Name"
              />
            </Text>
          </View>
          <View>
            <View style={{ margin: 10 }}>
              {/* Card Start */}
              {renderData?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginBottom: 10,
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          backgroundColor: "#eee",
                          width: "100%",
                          padding: 8,
                          fontSize: 15,
                          textTransform: "capitalize",
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 5,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View style={{ flex: 1, marginTop: 20, marginLeft: 5 }}>
                        <Checkbox
                          status={checkedItems.includes(item.id) ? "checked" : "unchecked"}
                          onPress={() => {
                            if (checkedItems.includes(item.id)) {
                              const update = checkedItems.filter((subject) => subject !== item.id);
                              setCheckedItems(update);
                            } else {
                              setCheckedItems([...checkedItems, item.id]);
                            }
                          }}
                        />
                      </View>
                      <View style={{ flex: 2.5 }}>
                        <Image source={{ uri: item.diet_image }} style={styles.AddCalImg}></Image>
                      </View>
                      <View style={{ flex: 4 }}>
                        <Text style={styles.addCalTitle}>Calories</Text>
                        <Text style={styles.addCalDis}>{item.calories} cals/cup</Text>
                        <Text style={styles.addCalTitle}>Carbohydrates</Text>
                        <Text style={styles.addCalDis}>{item.carbs} gm</Text>
                      </View>
                      <View style={{ flex: 3 }}>
                        <Text style={styles.addCalTitle}>Fat</Text>
                        <Text style={styles.addCalDis}>{item.fat} gm</Text>
                        <Text style={styles.addCalTitle}>Proten</Text>
                        <Text style={styles.addCalDis}>{item.protein} gm</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
              <View>
                <TouchableOpacity
                  onPress={async () => {
                    if (checkedItems.length === 0) {
                      toast("Please select one food");
                      return;
                    }
                    try {
                      const userId = await AsyncStorage.getItem("user");
                      console.log("Sending:", {
                        type: route?.params?.type,
                        user_id: JSON.parse(userId).id.toString(),
                        diet_id: checkedItems,
                        token: JSON.parse(userId).api_token,
                      });
                      axios
                        .post(
                          baseUrl + "create-plate",
                          {
                            type: route?.params?.type,
                            user_id: JSON.parse(userId).id.toString(),
                            diet_id: checkedItems,
                          },
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${JSON.parse(userId).api_token}`,
                            },
                          }
                        )
                        .then((res) => {
                          if (res.data.status) navigation.navigate("CaloriesSearch");
                          else console.log("Failed send", res.data);
                        })
                        .catch((err) => {
                          console.log(err, err.response.data);
                        });
                    } catch (error) {
                      navigation.goBack();
                    }
                  }}
                >
                  <Text style={styles.ProfileUpBtn}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CaloriesSearch;

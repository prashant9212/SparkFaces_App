import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Orientation from "react-native-orientation-locker";
import { ActivityIndicator } from "react-native-paper";
import Video from "react-native-video";
import { baseUrl } from "../config/config";

const MyProgramsDetailsVideo = (props) => {
    const [singleProgramVideo, setSingleProgramVideo] = useState();
    const [userToken, setMainToken] = useState();
    useEffect(() => {
        const ProgramFun = async () => {
            if (userToken) {
                try {
                    const response = await axios.get(baseUrl + 'single_programmvideo?id=31', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`,
                        },
                    });
                    const SingleProgramVideo = response.data.data.programm_video;
                    console.log("Sinlge Video Data", SingleProgramVideo);
                    setSingleProgramVideo(SingleProgramVideo);
                } catch (error) {
                    console.log("Program Error", error);
                }
            }
        };
        const asynget11 = async () => {
            const MainToken = await AsyncStorage.getItem("token");
            setMainToken(JSON.parse(MainToken));
        }
        ProgramFun();
        asynget11();
    }, [userToken]);

    return (
        <SafeAreaView style={styles.container}>
            <Video
                source={{ uri: singleProgramVideo }} // Can be a URL or a local file.
                style={styles.video}
                controls={true} // Display native playback controls.
                resizeMode="cover" // Set to contain for better fitting.
                onBuffer={onBuffer} // Callback when remote video is buffering.
                onError={onError} // Callback when video cannot be loaded.
            // onFullscreenPlayerDidDismiss={() => {
            //     console.log("Full Screen");
            //     if (Platform.OS === "android") {
            //         Orientation.unlockAllOrientations();
            //     }
            // }}
            />
        </SafeAreaView>
    );
};

const onBuffer = (buffer) => {
    console.log("Buffering", buffer);
};

const onError = (error) => {
    console.log("Error", error);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // padding: 10,
        borderRadius: 8,
        // alignItems: "center",
        backgroundColor: "white",
    },
    video: {
        width: "100%",
        height: "100%",
        margin: 0,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
});

export default MyProgramsDetailsVideo;

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, ImageBackground, Text, View, Pressable } from "react-native";
import SiderBar from "../../components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileScreen = () => {

  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(true)

  const [getValue, setGetValue] = useState([])

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(JSON.parse(value))
    );
  };

  useEffect(() => {
    const interval = setInterval(() => getValueFunction('data'), 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  return (
    <ImageBackground source={require('../../../assets/bg.png')} style={styles.bg}>
      <SiderBar title={'Profile'} />
      <View style={styles.container}>
        <View style={styles.containerProfile}>
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>User name:</Text>
            <Text style={styles.txt}>{getValue?.user_name}</Text>
          </View>
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>Full name</Text>
            <Text style={styles.txt}>{getValue?.full_name}</Text>
          </View>
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>Status:</Text>
            <Text style={styles.txt}>{getValue?.vip === "1" ? "VIP" : "FREE"}</Text>
          </View>
        </View>

        <Pressable
          style={{
            backgroundColor: '#FFCD4B',
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 6
          }}
          onPress={() => (removeItemValue("username"), navigation.navigate("Home"))}>
          <Text style={[styles.txt, { color: "#fff" }]}>ACCOUNT RENEWAL</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: '#ea3943',
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 6
          }}
          onPress={() => (removeItemValue("username"), navigation.navigate("Home"))}>
          <Text style={[styles.txt, { color: "#fff" }]}>LOGOUT</Text>
        </Pressable>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: "column",

  },
  container: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
    marginTop: 20
  },
  containerProfile: {
    width: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 14,
    gap: 20,
  },
  containerTxt: {
    width: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000'
  }

});

export default ProfileScreen;

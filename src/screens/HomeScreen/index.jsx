import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import SiderBar from "../../components/Sidebar";
import SelectGlobal from "../../components/SelectGlobal";
import DialogAdd from "../../components/DialogAdd";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = () => {
  const [getValue, setGetValue] = useState(null)

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(JSON.parse(value))
    );
  };

  useEffect(() => {
    getValueFunction('data');
    setTimeout(() => getValueFunction('data'), 3000)
  }, []);

  return (
    <ImageBackground source={require('../../../assets/bg.png')} style={styles.bg}>
      <SiderBar title={'Home'} />
      <SelectGlobal vip={getValue?.vip} />
      {getValue?.vip > 0 && <DialogAdd />}
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
  }

});

export default HomeScreen;

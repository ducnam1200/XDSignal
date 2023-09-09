import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, ImageBackground, Text } from "react-native";
import SiderBar from "../../components/Sidebar";
import { useNavigation } from "@react-navigation/native";


const ProfileScreen = () => {

  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(true)
  
  // useEffect(() => {
  //   isOpen ? navigation.navigate("LoginScreen") : null;
  // })

  return (
    <ImageBackground source={require('../../../assets/bg.png')} style={styles.bg}>
      <SiderBar title={'Profile'} />
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: "column"
  }

});

export default ProfileScreen;

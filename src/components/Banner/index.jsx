import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import styles from "./styles";

const Banner = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/bnHome.png')} imageStyle={{ borderRadius: 6 }} style={styles.banner}>
        <View style={styles.containerLeft}>
          <Text style={styles.titleBanner}>Complete your first transaction in just a few easy steps</Text>
          <Text style={[styles.titleBanner, { fontSize: 16, textTransform: "none" }]}>
            Register / Login
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Banner;

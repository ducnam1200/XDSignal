import React, { Suspense } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import PortfolioAssetsList from "./components/PortfolioAssetsList";
import SiderBar from "../../components/Sidebar";

const PortfolioScreen = () => {
  return (
    <ImageBackground source={require('../../../assets/bg.png')} style={styles.bg}>
      <SiderBar title={'Portfolio'} />
      <View>
        <Suspense
          fallback={<Text style={{ color: "white" }}>Loading Please Wait!</Text>}
        >
          <PortfolioAssetsList />
        </Suspense>
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
  }
})

export default PortfolioScreen;

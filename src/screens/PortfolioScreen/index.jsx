import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import WebView from "react-native-webview";
import SiderBar from "../../components/Sidebar";
import { ImageBackground } from "react-native";
import SiderBarBack from "../../components/Sidebarback";
import { StyleSheet } from "react-native";


const PortfolioScreen = () => {

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width">
      <title>TradingView Chart</title>
      <script src="https://s3.tradingview.com/tv.js"></script>
      <style>
      .tv-header__title {
          font-size: 120px !important;
      }
      #tv_chart_container {
          width: 100%;
          height: 110%;
          position: absolute;
          top: 0;
          left: 0;
          font-size: 45px !important;
        }
      .tv-header__top-line {
          height: 250px !important;
      }
    </style>
    </head>
    <body>
      <div id="tv_chart_container">
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async>
          {
            "width": "100%",
            "height": "100%",
            "colorTheme": "light",
            "isTransparent": false,
            "locale": "en",
            "importanceFilter": "-1,0,1"
          }
        </script>
      </div>
    </body>
  </html> `;

  return (
    <ImageBackground source={require('../../../assets/bg.png')} style={styles.bg}>
      <SiderBar title={'Calendar'} />
      <WebView source={{ html: htmlContent }} />
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

export default PortfolioScreen;



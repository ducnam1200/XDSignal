import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import WebView from "react-native-webview";
import SiderBar from "../../components/Sidebar";
import { ImageBackground } from "react-native";
import SiderBarBack from "../../components/Sidebarback";


const TechnicalAnalysisScreen = () => {
  const route = useRoute();
  const {
    params: { coinId, name, logo },
  } = route;

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
      
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
      {
        "interval": "1m",
        "width": "100%",
        "isTransparent": true,
        "height": "100%",
        "symbol": "${coinId}",
        "showIntervalTabs": true,
        "locale": "en",
        "colorTheme": "light",
      }
      </script>
      </div>
    </body>
  </html> `;


  return (
    <>
      <SiderBarBack title={name} logo={logo} />
      <WebView source={{ html: htmlContent }} />
    </>

  );
};

export default TechnicalAnalysisScreen;



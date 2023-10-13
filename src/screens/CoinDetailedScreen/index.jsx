import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import WebView from "react-native-webview";
import SiderBar from "../../components/Sidebar";
import { ImageBackground } from "react-native";
import SiderBarBack from "../../components/Sidebarback";


const CoinDetailedScreen = () => {
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
          height: 100%;
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
      <div id="tv_chart_container"></div>
      <script>
        const tvChart = new TradingView.widget({
          symbol: '${coinId}',
          interval: 'D',
          "timezone": "Etc/UTC",
          theme: 'light',
          width: '100%',
          height: '100%',
          style: '1',
          theme: 'light',
          save_image: false,
          locale: 'en',
          hide_side_toolbar: false,
          toolbar_bg: '#f1f3f6',
          container_id: 'tv_chart_container'
        });
        tvChart.onChartReady(function() {
          tvChart.addCustomCSSFile('./tradingView.css')
        })
        document.querySelector('.tv-header__link').remove();
      </script>
    </body>
  </html> `;


  return (
    <>
      <SiderBarBack title={name} logo={logo}/>
      <WebView source={{ html: htmlContent }} />

    </>

  );
};

export default CoinDetailedScreen;



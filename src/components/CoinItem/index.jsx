import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal'
import { Image } from "react-native";

const CoinItem = ({ marketCoin, priceAction }) => {
  const {
    name_forex,
    vip,
    status,
    action,
    open_time,
    open_price,
    take_profit_1,
    take_profit_2,
    take_profit_3,
    stop_loss,
    profit_and_loss,
    trade_result,
    last_update_time,
    comment
  } = marketCoin;

  const navigation = useNavigation();

  const percentageColor =
    action === "0" ? "#ea3943" : "#16c784"

  const percentageTech =
    action === "0" ? "Sell" : "Buy"

  const percentageIcon =
    action === "1" ? <Entypo name="chevron-small-up" size={24} color="#16c784" /> : <Entypo name="chevron-small-down" size={24} color="#ea3943" />;


  const percentageMarket =
    status === "1" ? "#C5C5C5" : "#16c784";

  const percentageStatus =
    status === "1" ? "Expired" : "Active";

  const percentageStatusColor =
    trade_result === "Stop loss" ? "#ea3943" : "#16c784" || "#C5C5C5";

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(3)}T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(3)}B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(3)}M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(3)}K`;
    }
    return marketCap;
  };

  return (
    <>
      <Pressable
        style={styles.coinContainer}
        onPress={() => navigation.navigate('CoinDetail', {
          name_forex: name_forex,
          status: status,
          action: action,
          open_time: open_time,
          open_price: open_price,
          take_profit_1: take_profit_1,
          take_profit_2: take_profit_2,
          take_profit_3: take_profit_3,
          stop_loss: stop_loss,
          profit_and_loss: profit_and_loss,
          trade_result: trade_result,
          last_update_time: last_update_time,
          comment: comment,
          priceAction: priceAction
        })}
      >

        <View style={{ display: 'flex', flexDirection: 'column', width: "30%", alignItems: 'flex-start', }}>
          <Text style={[styles.title, { fontSize: 20, color: '#2962ff' }]}>{name_forex}</Text>
          <Text style={[styles.title, { fontSize: 10, color: '#fff' }]}>{open_time}</Text>
        </View>

        <View style={{ width: "10%", alignItems: 'center', }}>
          <Text style={[styles.title, { fontSize: 18, color: "#fff" }]}>{vip === 1 ? "VIP" : vip === 2 ? "Person" : ""}</Text>
        </View>

        <View style={{ width: "30%", alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={[styles.title, { fontSize: 18, color: percentageMarket }]}>{percentageStatus}</Text>
            {status === "0" ? <Image style={styles.action} source={require('../../../assets/gif/loading.gif')} /> : null}
          </View>
          <Text style={[styles.title, { fontSize: 18, color: percentageStatusColor }]}>{trade_result === "Waiting" ? (priceAction > take_profit_1 ? "TP-1" : trade_result) : trade_result === "TP-1" ? (priceAction > take_profit_2 ? "TP-2" : "TP-1") : trade_result === "TP-2" ? (priceAction > take_profit_3 ? "TP-3" : "TP-2") : trade_result}</Text>
        </View>

        <View style={{ width: "30%", alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', display: 'flex' }}>
          {percentageIcon}
          <Text style={[styles.title, { fontSize: 18, color: percentageColor, marginLeft: 2 }]}>
            {percentageTech}
          </Text>
        </View>
      </Pressable>
    </>


  );
};

export default CoinItem;

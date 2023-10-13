import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal'
import { Image } from "react-native";
import SiderBarBack from "../Sidebarback";

const CoinDetail = () => {
  const route = useRoute();
  const {
    params: {
      name_forex,
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
      comment,
      priceAction },
  } = route;
  const navigation = useNavigation();

  const percentageColor =
    action === "0" ? "red" : "#16c784"

  const percentageTech =
    action === "0" ? "Sell" : "Buy"

  const percentageStatus =
    status === "1" ? "Expired" : "Active";

  const coinId = name_forex.replace(' ', '')

  return (
    <>
      <SiderBarBack title={name_forex} />
      <View
        style={styles.coinContainer}
      >
        <View style={styles.containerBtn}>
          <Pressable
            style={styles.btnLeft}
            onPress={() => (
              navigation.navigate("CoinDetailedScreen", { coinId: coinId, name: name_forex })
            )}
          >
            <Text style={[styles.txt, { color: '#000' }]}>Show Chart</Text>
          </Pressable>
          <Pressable
            style={styles.btnRight}
            onPress={() => (
              navigation.navigate("TechnicalAnalysisScreen", { coinId: coinId, name: name_forex })
            )}
          >
            <Text style={[styles.txt, { color: '#000' }]}>Show</Text>
            <Text style={[styles.txt, { color: '#000' }]}>Technical Analysis</Text>
          </Pressable>

        </View>
        <View style={styles.containerBody}>
          <View style={[styles.containerTop, {
            backgroundColor: percentageColor
          }]}>
            <Text style={styles.title}>{name_forex}</Text>
          </View>
          <View style={styles.containerHeader}>
            <View style={styles.description}>
              <Text style={styles.txt}>Action</Text>
              <Text style={styles.txt}>{percentageTech}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.txt}>Status</Text>
              <Text style={styles.txt}>{percentageStatus}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.txt}>Opening Time</Text>
              <Text style={styles.txt}>{open_time}</Text>
            </View>
          </View>
          <View style={styles.containerHeader}>
            <View style={styles.description}>
              <Text style={styles.txt}>Open Price</Text>
              <Text style={styles.txt}>{open_price}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.txt}>Take Profit 1</Text>
              <Text style={styles.txt}>{take_profit_1}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.txt}>Take Profit 2</Text>
              <Text style={styles.txt}>{take_profit_2}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.txt}>Take Profit 3</Text>
              <Text style={styles.txt}>{take_profit_3}</Text>
            </View>
          </View>
          <View style={styles.containerHeader}>
            <View style={styles.description}>
              <Text style={styles.txt}>Stop Loss</Text>
              <Text style={styles.txt}>{stop_loss}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.txt}>Profit/Loss</Text>
              <Text style={styles.txt}>{profit_and_loss > 0 ? '+' + profit_and_loss : profit_and_loss}{profit_and_loss != "Waiting" && " Pips"}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.txt}>Trade result</Text>
              <Text style={styles.txt}>{trade_result}</Text>
            </View>
          </View>
          <View style={styles.containerHeader}>
            <View style={styles.description}>
              <Text style={styles.txt}>Last update time</Text>
              <Text style={styles.txt}>{last_update_time}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.txt}>Comment</Text>
              <Text style={[styles.txt, { width: "50%", textAlign: 'right' }]} numberOfLines={2}>{comment}</Text>
            </View>
          </View>
        </View>
      </View>
    </>


  );
};

export default CoinDetail;

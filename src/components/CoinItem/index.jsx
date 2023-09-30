import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal'

const CoinItem = ({ marketCoin }) => {
  const {
    s, d
  } = marketCoin;

  const navigation = useNavigation();

  const percentageColor =
    d[3] < 0 ? "#ea3943" : "#16c784" || 'white';

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

  const [visibleModal, setVisibleModal] = useState('')

  return (
    <>
      <Pressable
        style={styles.coinContainer}
        onPress={() => setVisibleModal(1)}
      >

        <View style={{ display: 'flex', flexDirection: 'row', width: "15%", alignItems: 'center' }}>
          {d[0] != '' ?
            <View style={{ marginRight: 4, marginTop: 2 }}>
              <SvgUri
                width="18"
                height="18"
                uri={`https://s3-symbol-logo.tradingview.com/${d[0]}.svg`}
              />
            </View>
            :
            <View style={{ marginRight: 4, marginTop: 2 }}>
              <View style={styles.containerSvg}>
                <Text style={[styles.title, { color: "#C5C5C5", fontSize: 12 }]}>{d[1][0]}</Text>
              </View>
            </View>}
          <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.title, { fontSize: 14, color: '#2962ff', width: "60%" }]}>{d[1]}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: "15%", alignItems: 'center' }}>
          <Text style={[styles.title, { fontSize: 10 }]}>{d[2]}</Text>
          <Text style={[styles.title, { color: "#C5C5C5", fontSize: 8, marginLeft: 2 }]}>{d[21]}</Text>
        </View>
        <View style={{ width: "10%", alignItems: 'center' }}>
          <Text style={[styles.title, { fontSize: 10, color: percentageColor }]}>{d[3]?.toFixed(2)}%</Text>
        </View>
        <View style={{ width: "15%", alignItems: 'center' }}>
          <Text style={[styles.title, { fontSize: 10 }]}>{normalizeMarketCap(d[6])}</Text>
        </View>
        <View style={{ width: "15%", alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={[styles.title, { fontSize: 10 }]}>{normalizeMarketCap(d[8])}</Text>
            <Text style={[styles.title, { color: "#C5C5C5", fontSize: 8, marginLeft: 2 }]}>{d[22]}</Text>
          </View>
        </View>
        <View style={{ width: "15%", alignItems: 'center' }}>
          {d[9] != null
            ? <Text style={[styles.title, { fontSize: 10 }]}>{d[9].toFixed(2)}</Text>
            : <Entypo name="minus" size={12} color="#fff" />
          }
        </View>
        <View style={{ width: "15%", alignItems: 'center' }}>
          {d[10] != null
            ?
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={[styles.title, { fontSize: 10 }]}>{d[10].toFixed(2)}</Text>
              <Text style={[styles.title, { color: "#C5C5C5", fontSize: 8, marginLeft: 2 }]}>{d[22]}</Text>
            </View>
            : <Entypo name="minus" size={12} color="#fff" />
          }
        </View>
      </Pressable>
      <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>
        <View style={styles.selectInfo}>
          <Pressable
            style={[styles.btnClose, { marginVertical: 10 }]}
            onPress={() => setVisibleModal('')}
          >
            <AntDesign name="closecircle" size={20} color="black" />
          </Pressable>
          <Pressable
            style={[styles.btnChart, { marginBottom: 10 }]}
            onPress={() => (
              navigation.navigate("CoinDetailedScreen", { coinId: s, name: d[1], logo: d[0] }), setVisibleModal('')
            )}
          >
            <Text style={styles.txt}>Show Chart</Text>
          </Pressable>

          <Pressable
            style={styles.btnChart}
            onPress={() => (
              navigation.navigate("TechnicalAnalysisScreen", { coinId: s, name: d[1], logo: d[0] }), setVisibleModal('')
            )}
          >
            <Text style={styles.txt}>Show Technical Analysis</Text>
          </Pressable>
        </View>
      </Modal>
    </>


  );
};

export default CoinItem;

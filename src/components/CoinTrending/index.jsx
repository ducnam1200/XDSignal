import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { Foundation } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const CoinTrending = ({ marketCoin }) => {
  const {
    id,
    name,
    market_cap_rank,
    symbol,
    price_btc,
    thumb,
  } = marketCoin;

  const navigation = useNavigation();

  const normalizeMarketCap = (marketCap) => {
    if (marketCap < 10) {
      return `${(marketCap).toFixed(5)} BTC`;
    }
    return marketCap;
  };

  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetailedScreen", { coinId: id })}
    >

      <Image
        source={{ uri: thumb }}
        style={{
          height: 30,
          width: 30,
          marginRight: 10,
          alignSelf: "center",
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.text}>{symbol.toUpperCase()}</Text>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{normalizeMarketCap(price_btc)}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.rank}>{market_cap_rank}</Text>
        </View>
      </View>
    </Pressable>

  );
};

export default CoinTrending;

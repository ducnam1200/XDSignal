import React from "react";
import { View, Text, Image } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchlist } from "../../../../Contexts/WatchlistContext";

const CoinDetailedHeader = (props) => {
  const { coinId, image, symbol, marketCapRank } = props;
  const navigation = useNavigation();
  const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } = useWatchlist();

  const checkIfCoinIsWatchlisted = () =>
    watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);

  const handleWatchlistCoin = () => {
    if (checkIfCoinIsWatchlisted()) {
      return removeWatchlistCoinId(coinId)
    }
    return storeWatchlistCoinId(coinId)
  };

  return (
    <View style={styles.headerContainer}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
      </View>
      <AntDesign
        name={checkIfCoinIsWatchlisted() ? "star" : "staro"}
        size={25}
        color={checkIfCoinIsWatchlisted() ? "#FFBF00" : "white"}
        onPress={handleWatchlistCoin}
      />
    </View>
  );
};

export default CoinDetailedHeader;

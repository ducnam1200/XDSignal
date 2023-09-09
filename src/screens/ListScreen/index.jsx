import React, { useEffect, useState } from "react";
import { FlatList, View, RefreshControl, Text, StyleSheet, ImageBackground } from "react-native";
import SiderBar from "../../components/Sidebar";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";


const ListScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const getHeader = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>List Item</Text>
      </View>
    );
  };

  return (
    <ImageBackground source={require('../../../assets/bg.png')} style={styles.bg}>
      <SiderBar title={'List Item'} />
      <FlatList
        key={coins.id}
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
      // ListHeaderComponent={getHeader}
      />
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
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'DroidSans'
  }

});

export default ListScreen;

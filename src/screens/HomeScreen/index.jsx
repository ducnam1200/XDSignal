import React, { useEffect, useState } from "react";
import { FlatList, View, Text, RefreshControl, StyleSheet, ImageBackground } from "react-native";
import { getGainersData, getTrendingData } from "../../services/requests";
import SiderBar from "../../components/Sidebar";
import Banner from "../../components/Banner";
import Service from "../../components/Service";
import CoinTrending from "../../components/CoinTrending";
import NewStory from "../../components/NewStory";
import WebView from "react-native-webview";


const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getTrendingData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const getHeader = () => {
    return (
      <View>
        <Banner />
        <Service />
        {coins != null ?
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Trending</Text>
            <View style={styles.btnTime}>
              <Text style={[styles.title, { fontSize: 12 }]}>24 hour</Text>
            </View>
          </View>
          : null}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Stories</Text>
        </View>
        <NewStory />
      </View>
    );
  };

  return (
    <ImageBackground source={require('../../../assets/bg.png')} style={styles.bg}>
      <SiderBar title={'Home'} />
      <FlatList
        style={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
        data={coins}
        renderItem={({ item }) => <CoinTrending marketCoin={item} />}
        ListHeaderComponent={getHeader}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={fetchCoins}
          />
        }
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
  },
  btnTime: {
    padding: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 8,
    borderColor: '#BFBFBF',
    borderWidth: 1
  }

});

export default HomeScreen;

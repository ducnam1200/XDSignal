/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, FlatList, RefreshControl, Pressable } from 'react-native';
const { width } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import { getDataForexs, getDataPrice } from '../../services/requests';
import CoinItem from '../CoinItem';
import Banner from '../Banner';
import SiderBar from "../../components/Sidebar";
import AsyncStorage from '@react-native-async-storage/async-storage';


const dataFilter = [
  {
    title: 'Action',
  },
  {
    title: '1d',
  },
  {
    title: '7d',
  },
  {
    title: '1m',
  },
  {
    title: '2m',
  },
  {
    title: '3m',
  },
  {
    title: '1y',
  }
]

const aaa = {
  "EUR/USD": {
    "price": "1.06250"
  },
  "EUR/JPY": {
    "price": "158.41300"
  }
}

export default function SelectGlobal(props) {
  const {
    vip
  } = props;

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState(3);
  const [priceName, setPriceName] = useState(null);
  const [priceValue, setPriceValue] = useState(null);

  // date now
  var d = new Date();
  // 1d
  d.setDate(d.getDate() - 1)
  const oneDay = d.toLocaleDateString()
  // // 7d
  d.setDate(d.getDate() - 7)
  const sevenDay = d.toLocaleDateString()
  // // 1m
  d.setDate(d.getDate() - 30)
  const oneMonth = d.toLocaleDateString()
  // // 2m
  d.setDate(d.getDate() - 60)
  const twoMonth = d.toLocaleDateString()
  // // 3m
  d.setDate(d.getDate() - 90)
  const threeMonth = d.toLocaleDateString()
  // // 1y
  d.setDate(d.getDate() - 360)
  const oneYear = d.toLocaleDateString()

  const fetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getDataForexs(btn === 1 ? oneDay : btn === 2 ? sevenDay : btn === 3 ? oneMonth : btn === 4 ? twoMonth : btn === 5 ? threeMonth : btn === 6 ? oneYear : oneMonth, btn === 0 ? 1 : 2);
    setCoins(coinsData);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getDataForexs(btn === 1 ? oneDay : btn === 2 ? sevenDay : btn === 3 ? oneMonth : btn === 4 ? twoMonth : btn === 5 ? threeMonth : btn === 6 ? oneYear : oneMonth, btn === 0 ? 1 : 2);
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [btn]);

  const fetchPrice = async () => {
    let symbol = coins.map(item => item.status === "0" ? item.name_forex[0] + item.name_forex[1] + item.name_forex[2] + "/" + item.name_forex[4] + item.name_forex[5] + item.name_forex[6] : null);
    const coinsData = await getDataPrice(symbol);
    setPriceName(coinsData);
    const valuesArray = await Object.values(priceName)
      .map(arr =>
        arr.price
      )
    setPriceValue(valuesArray)
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchPrice();
    }, 30000);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);



  const getHeader = () => {
    return (
      <>
        <Banner />
        {vip > 0 &&
          <View style={styles.containerFilter}>
            {dataFilter.map((item, index) =>
              <Pressable
                onPress={() => setBtn(index)}
              >
                <Text style={[styles.txt, {
                  backgroundColor: index === btn ? '#2962ff' : '#000'
                }]}>{item.title}</Text>
              </Pressable>

            )}
          </View>
        }
      </>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={coins?.id}
        data={coins}
        nestedScrollEnabled={true}
        renderItem={({ item }) =>
          <CoinItem marketCoin={item} priceAction={priceValue} />
        }
        onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
        ListHeaderComponent={getHeader}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerFilter: {
    width: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  txt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  }
});
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
const { width } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postDataGlobal } from '../../services/requests';
import CoinItem from '../CoinItem';


const dataTable = [
  {
    title: 'TICKER',
    w: "15%"
  },
  {
    title: 'PRICE',
    w: "15%"
  },
  {
    title: 'CHG%',
    w: "10%"
  },
  {
    title: 'VOL',
    w: "15%"
  },
  {
    title: 'MKT CAP',
    w: "15%"
  },
  {
    title: 'P/E',
    w: "15%"
  },
  {
    title: 'EPS',
    w: "15%"
  }
]

export default function SelectGlobal() {

  const countriesWithFlags = [
    { title: 'vietnam', image: require('../../../assets/logo/vietnam.png') },
    { title: 'america', image: require('../../../assets/logo/america.png') },
    { title: 'australia', image: require('../../../assets/logo/australia.png') },
    { title: 'austria', image: require('../../../assets/logo/austria.png') },
    { title: 'canada', image: require('../../../assets/logo/canada.png') },
    { title: 'chile', image: require('../../../assets/logo/chile.png') },
    { title: 'china', image: require('../../../assets/logo/china.png') }
  ];

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getValue, setGetValue] = useState('');

  const fetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await postDataGlobal(getValue === '' ? 'vietnam' : getValue);
    setCoins(coinsData);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await postDataGlobal(getValue === '' ? 'vietnam' : getValue);
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [getValue]);

  const data = coins?.data

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={countriesWithFlags}
        defaultValueByIndex={1}
        defaultValue={{
          title: 'vietnam',
          image: require('../../../assets/logo/vietnam.png'),
        }}
        onSelect={(selectedItem, index) => {
          setGetValue(selectedItem?.title)
        }}
        buttonStyle={styles.dropdown3BtnStyle}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={styles.dropdown3BtnChildStyle}>
              {selectedItem ? (
                <Image source={selectedItem.image} style={styles.dropdown3BtnImage} />
              ) : (
                <Ionicons name="md-earth-sharp" color={'#fff'} size={20} />
              )}
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff', paddingHorizontal: 4 }}>{selectedItem?.title.toUpperCase()}</Text>
              <FontAwesome name="chevron-down" color={'#fff'} size={10} />
            </View>
          );
        }}
        dropdownStyle={styles.dropdown3DropdownStyle}
        rowStyle={styles.dropdown3RowStyle}
        selectedRowStyle={styles.dropdown1SelectedRowStyle}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View style={styles.dropdown3RowChildStyle}>
              <Image source={item.image} style={styles.dropdownRowImage} />
              <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
            </View>
          );
        }}
        search
        searchInputStyle={styles.dropdown3searchInputStyleStyle}
        searchPlaceHolder={'Search here'}
        searchPlaceHolderColor={'#F8F8F8'}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={'search'} color={'#FFF'} size={18} />;
        }}
      />
      <View style={styles.coinContainer}>
        <View style={styles.containerTable}>
          {dataTable.map((item, index) =>
            <Text style={[styles.titleTable, { width: item.w, textAlign: 'center' }]} key={index}>
              {item.title}
            </Text>
          )}
        </View>
      </View>
      <FlatList
        key={coins?.id}
        data={data}
        nestedScrollEnabled={true}  
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins?.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
      // ListHeaderComponent={getHeader}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: '100%',
    height: '100%',
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute'
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
  },
  containerTable: {
    display: 'flex',
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 4,

  },
  titleTable: {
    fontSize: 12,
    color: '#C5C5C5',
    fontWeight: '600'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
  viewContainer: { flex: 1, width, backgroundColor: '#FFF' },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '60%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2SelectedRowStyle: { backgroundColor: 'rgba(255,255,255,0.2)' },
  dropdown2searchInputStyleStyle: {
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },

  dropdown3BtnStyle: {
    width: '60%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    paddingHorizontal: 0,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown3BtnImage: { width: 25, height: 25, resizeMode: 'cover', borderRadius: 100 },
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dropdown3DropdownStyle: { backgroundColor: 'slategray' },
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 25, height: 25, resizeMode: 'cover' },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 12,
  },
  dropdown3searchInputStyleStyle: {
    backgroundColor: 'slategray',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
});
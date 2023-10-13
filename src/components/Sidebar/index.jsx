import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SiderBar = (props) => {
  const {
    title, name
  } = props;

  const navigation = useNavigation();
  const [getValue, setGetValue] = useState(null)

  const getValueFunction = (key) => {
    AsyncStorage.getItem(key).then(
      (value) =>
        setGetValue(value)
    );
  };

  useEffect(() => {
    getValueFunction('username');
    setTimeout(() => getValueFunction('username'), 3000)
  }, []);

  return (
    <View style={styles.container}>
      {getValue != null ?
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 10, color: '#fff' }}>Welcome</Text>
          <Text style={{ fontSize: 14, color: '#fff', fontWeight: "700", textTransform: 'uppercase' }}>{getValue}</Text>
        </View>
        : <Feather name="user" color={'#fff'} size={24} style={{ width: 50 }} onPress={() => navigation.navigate('LoginScreen')} />
      }
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconRight}>
        <Ionicons name="notifications-outline" color={'#fff'} size={24} />
        <Feather name="settings" color={'#fff'} size={24} />
      </View>
    </View>
  );
};

export default SiderBar;

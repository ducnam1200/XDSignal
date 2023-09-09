import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const SiderBar = (props) => {
  const {
    title
  } = props;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Feather name="user" color={'#fff'} size={24} style={{ width: 50 }} onPress={() => navigation.navigate('LoginScreen')} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconRight}>
        <Ionicons name="notifications-outline" color={'#fff'} size={24} />
        <Feather name="settings" color={'#fff'} size={24} />
      </View>
    </View>
  );
};

export default SiderBar;

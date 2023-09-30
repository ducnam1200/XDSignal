import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";

const SiderBarBack = (props) => {
  const {
    title, logo
  } = props;

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AntDesign name="left" color={'#fff'} size={24} style={{ width: 50 }} onPress={() => navigation.goBack()} />
      <View style={styles.containerCoin}>
        {logo != '' ?
          <View style={{ marginRight: 4, marginTop: 6 }}>
            <SvgUri
              width="20"
              height="20"
              uri={`https://s3-symbol-logo.tradingview.com/${logo}.svg`}
            />
          </View>
          :
          <View style={{ marginRight: 4, marginTop: 2 }}>
            <View style={styles.containerSvg}>
              <Text style={[styles.title, { color: "#C5C5C5", fontSize: 12 }]}>{logo[0]}</Text>
            </View>
          </View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.iconRight}>
        <Ionicons name="notifications-outline" color={'#fff'} size={24} />
        <Feather name="settings" color={'#fff'} size={24} />
      </View>
    </View>
  );
};

export default SiderBarBack;

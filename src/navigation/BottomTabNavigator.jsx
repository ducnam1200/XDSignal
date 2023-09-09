import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import WatchlistScreen from "../screens/WatchlistScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import { Entypo, FontAwesome, Foundation, MaterialIcons, Feather } from "@expo/vector-icons";
import ListScreen from "../screens/ListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#787878',
        tabBarStyle: {
          height: 68,
          paddingHorizontal: 37,
          paddingTop: 12,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          backgroundColor: 'rgba(58,58,71,1)',
          borderTopWidth: 0,
        },
      }}

    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={20} color={focused ? '#fff' : '#787878'} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Foundation name="graph-pie" size={25} color={focused ? '#fff' : '#787878'} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Item"
        component={ListScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name="local-fire-department" size={25} color={focused ? '#fff' : '#787878'} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="star" size={20} color={focused ? '#fff' : '#787878'} />
          ),
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Feather name="user" color={focused ? '#fff' : '#787878'} size={20} />,
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={() => navigation.navigate("LoginScreen")} />
          ),
        }}
        name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

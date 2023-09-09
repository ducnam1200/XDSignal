import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Button, Image } from "react-native";
import styles from "./styles";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


const LoginScreen = () => {

  const navigation = useNavigation();
  const sheetRef = useRef(null)
  const [isOpen, setIsOpen] = useState(true)

  const snapPoint = ["90%"]

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.1)" }} keyboardVerticalOffset={80} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <BottomSheet
        ref={sheetRef}
        backgroundStyle={{ backgroundColor: '#12121C' }}
        snapPoints={snapPoint}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ display: 'none' }}
        onClose={() => navigation.navigate('Home')}>
        <BottomSheetView>
          <View style={styles.containerSheet}>
            <Pressable style={styles.sheetHeader} onPress={() => navigation.navigate('Home')}>
              <Ionicons name="ios-close-circle-outline" size={24} color="#fff" />
            </Pressable>
          </View>
          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 16 }}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.txtInput}>
              Email / Phone number
            </Text>
            <TextInput
              placeholder={'xxx@gmail.com / 098765xxx'}
              style={styles.input}
              placeholderTextColor={'rgba(191,191,191,0.5)'}
            />
            <Pressable style={styles.button}>
              <Text style={styles.text}>Continue</Text>
            </Pressable>
            <View style={styles.or}>
              <View style={{ backgroundColor: '#3A3A47', width: '45%', height: 1 }}></View>
              <Text style={[styles.text, { color: '#3A3A47' }]}>OR</Text>
              <View style={{ backgroundColor: '#3A3A47', width: '45%', height: 1 }}></View>
            </View>

            <View style={[styles.input, { justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }]}>
              <Image source={require('../../../assets/gg.png')} style={{ width: 30, height: 30 }} />
              <View style={{ width: '90%', alignItems: 'center' }}>
                <Text style={styles.text}>Continue with Google</Text>
              </View>
            </View>

            <View style={[styles.input, { justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }]}>
              <Image source={require('../../../assets/fb.png')} style={{ width: 30, height: 30 }} />
              <View style={{ width: '90%', alignItems: 'center' }}>
                <Text style={styles.text}>Continue with Facebook</Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

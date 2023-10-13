import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Pressable, View, Button, Text, TextInput, ScrollView } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import Checkbox from 'expo-checkbox';
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from "react-native";
import Moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";

const dataStatus = [
  {
    name: 'Action'
  },
  {
    name: 'Expired'
  }
]

const dataAction = [
  {
    name: 'Buy'
  },
  {
    name: 'Sell'
  }
]

const DialogAdd = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false)
  const [showPickerEnd, setShowPickerEnd] = useState(false)
  const [openTime, setOpenTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [valueName, setValueName] = useState("")
  const [valueStatus, setValueStatus] = useState("")
  const [valueAction, setValueAction] = useState("")
  const [valuePrice, setValuePrice] = useState("")
  const [valueStoploss, setValueStoploss] = useState("")
  const [valueTP1, setValueTP1] = useState("")
  const [valueTP2, setValueTP2] = useState("")
  const [valueTP3, setValueTP3] = useState("")
  const [valueComment, setValueComment] = useState("")

  const [openDialog, setOpenDialog] = useState(false)
  const [isChecked, setChecked] = useState(false);

  const onChangeName = (val) => {
    setValueName(val)
  }

  const onChangePrice = (val) => {
    setValuePrice(val)
  }

  const onChangeStoploss = (val) => {
    setValueStoploss(val)
  }

  const onChangeTP1 = (val) => {
    setValueTP1(val)
  }

  const onChangeTP2 = (val) => {
    setValueTP2(val)
  }
  const onChangeTP3 = (val) => {
    setValueTP3(val)
  }

  const onChangeComment = (val) => {
    setValueComment(val)
  }

  const onChangeOpenTime = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setShowPicker(false);
      setDate(currentDate);

      if (Platform.OS === "android") {
        setShowPicker(false);
        setOpenTime(Moment(currentDate).format('YYYY-MM-DD HH:mm:ss'))
      }
    } else {
      setShowPicker(false);
    }
  }

  const onChangeEndTime = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setShowPickerEnd(false);
      setDateEnd(currentDate);

      if (Platform.OS === "android") {
        setShowPickerEnd(false);
        setEndTime(Moment(currentDate).format('YYYY-MM-DD HH:mm:ss'))
      }
    } else {
      setShowPickerEnd(false);
    }
  }

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

  const addItem = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name_forex", valueName);
    formData.append("vip", getValue === 'admin' ? (isChecked ? "1" : "0") : "2");
    formData.append("status", valueStatus === "Expired" ? "1" : "0");
    formData.append("action", valueAction === "Buy" ? "1" : "0");
    formData.append("open_time", openTime);
    formData.append("open_price", valuePrice);
    formData.append("take_profit_1", valueTP1);
    formData.append("take_profit_2", valueTP2);
    formData.append("take_profit_3", valueTP3);
    formData.append("stop_loss", valueStoploss);
    formData.append("profit_and_loss", "Waiting");
    formData.append("trade_result", "Waiting");
    formData.append("last_update_time", endTime);
    formData.append("comment", "-");

    fetch("https://musicappandroid1200.000webhostapp.com/login/insertForex.php", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(json => {
        json.status === true ?
          (setLoading(false), alert(json.message), setOpenDialog(false))
          : (setLoading(false), setError(json.message))
      })
      .catch(error => {
        setLoading(false);
        setError(error.message)
      });

  };

  return (
    <>
      <View style={styles.viewBtn}>
        <Pressable style={styles.btn} onPress={() => setOpenDialog(true)}>
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      <Dialog
        title="ADD ITEM FOREX"
        animationType="fade"

        onTouchOutside={() => setOpenDialog(false)}
        visible={openDialog}
      >
        <ScrollView >
          <View style={styles.containerScroll}>
            <View style={styles.contanerCheck}>
              <View style={[styles.containerInput, { width: getValue === 'admin' ? "70%" : "100%" }]}>
                <Text style={styles.txtInput}>
                  Name forex
                </Text>
                <TextInput
                  placeholder={'USD JYP'}
                  onChangeText={val => onChangeName(val)}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              {getValue === 'admin' &&
                <View style={[styles.containerInput, { width: "30%", alignItems: 'flex-end' }]}>
                  <Text style={styles.txtInput}>
                    User vip
                  </Text>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                  />
                </View>
              }
            </View>

            <View style={styles.contanerCheck}>
              <View style={styles.contanerSelect}>
                <Text style={styles.txtInput}>
                  Status
                </Text>
                <SelectDropdown
                  data={dataStatus}
                  onSelect={(selectedItem, index) => {
                    setValueStatus(selectedItem.name);
                  }}
                  defaultButtonText={'Select status'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.contanerSelect}>
                <Text style={styles.txtInput}>
                  Action
                </Text>
                <SelectDropdown
                  data={dataAction}
                  onSelect={(selectedItem, index) => {
                    setValueAction(selectedItem.name);
                  }}
                  defaultButtonText={'Select status'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />
              </View>
            </View>
            <View style={styles.contanerCheck}>
              {showPicker && (
                <DateTimePicker
                  mode="datetime"
                  value={date}
                  onChange={onChangeOpenTime}
                />
              )}
              <View style={[styles.containerInput, { width: "48.5%" }]}>
                <Text style={styles.txtInput}>
                  Open time
                </Text>
                {!showPicker && (
                  <Pressable
                    style={{ width: "100%" }}
                    onPress={() => setShowPicker(true)}>
                    <TextInput
                      placeholder={"Sat Aug 21 2004"}
                      style={styles.input}
                      placeholderTextColor={'rgba(191,191,191,0.5)'}
                      editable={false}
                      value={openTime > Moment(new Date()).format('YYYY-MM-DD HH:mm:ss') ? null : openTime}
                    />
                  </Pressable>
                )}
              </View>
              <View style={styles.divider} />
              {showPickerEnd && (
                <DateTimePicker
                  mode="datetime"
                  value={dateEnd}
                  onChange={onChangeEndTime}
                />
              )}
              <View style={[styles.containerInput, { width: "48.5%" }]}>
                <Text style={styles.txtInput}>
                  End time
                </Text>
                {!showPickerEnd && (
                  <Pressable
                    style={{ width: "100%" }}
                    onPress={() => setShowPickerEnd(true)}>
                    <TextInput
                      placeholder={"Sat Aug 21 2004"}
                      style={styles.input}
                      placeholderTextColor={'rgba(191,191,191,0.5)'}
                      editable={false}
                      value={endTime}
                    />
                  </Pressable>
                )}
              </View>
            </View>
            {openTime > Moment(new Date()).format('DD-MM-YYYY') &&
              <Text style={{ width: '100%', fontSize: 10, color: '#ea3943', fontWeight: "500", textAlign: 'left' }}>Open time cannot be greater than the current date</Text>
            }
            <View style={styles.contanerCheck}>
              <View style={[styles.containerInput, { width: "48.5%" }]}>
                <Text style={styles.txtInput}>
                  Open price
                </Text>
                <TextInput
                  keyboardType='numeric'
                  placeholder={'123'}
                  onChangeText={value => onChangePrice(value.replace(/[^0-9]/g, ''))}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={styles.divider} />
              <View style={[styles.containerInput, { width: "48.5%" }]}>
                <Text style={styles.txtInput}>
                  Stop loss
                </Text>
                <TextInput
                  keyboardType='numeric'
                  placeholder={'123'}
                  onChangeText={value => onChangeStoploss(value.replace(/[^0-9]/g, ''))}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
            </View>

            <View style={styles.contanerCheck}>
              <View style={[styles.containerInput, { width: 98 / 3 + "%" }]}>
                <Text style={styles.txtInput}>
                  Take profit 1
                </Text>
                <TextInput
                  keyboardType='numeric'
                  placeholder={'123'}
                  onChangeText={value => onChangeTP1(value.replace(/[^0-9]/g, ''))}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={[styles.containerInput, { width: 98 / 3 + "%" }]}>
                <Text style={styles.txtInput}>
                  Take profit 2
                </Text>
                <TextInput
                  keyboardType='numeric'
                  placeholder={'123'}
                  onChangeText={value => onChangeTP2(value.replace(/[^0-9]/g, ''))}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
              <View style={[styles.containerInput, { width: 98 / 3 + "%" }]}>
                <Text style={styles.txtInput}>
                  Take profit 3
                </Text>
                <TextInput
                  keyboardType='numeric'
                  placeholder={'123'}
                  onChangeText={value => onChangeTP3(value.replace(/[^0-9]/g, ''))}
                  style={styles.input}
                  placeholderTextColor={'rgba(191,191,191,0.5)'}
                />
              </View>
            </View>

            <View style={styles.contanerCheck}>

              <View style={styles.containerInput}>
                <Text style={styles.txtInput}>
                  Comment
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.input}
                  placeholder="Enter comments ..."
                  onChangeText={(text) => onChangeComment({ text })}
                />
              </View>
            </View>

            {error && <Text style={{ width: '100%', fontSize: 14, color: '#ea3943', fontWeight: "500", textAlign: 'left' }}>{error}</Text>}

            <View style={[styles.contanerCheck, { marginTop: 10, justifyContent: "center", gap: 60 }]}>
              <Pressable
                onPress={() => setOpenDialog(false)}>
                <View style={[styles.btnDialog, { backgroundColor: '#ea3943' }]}>
                  <Text style={styles.txtBtn}>CLOSE</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={addItem}>
                <View style={[styles.btnDialog, { backgroundColor: '#16c784' }]}>
                  <Text style={styles.txtBtn}>ADD</Text>
                </View>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </Dialog>
    </>
  );
};

export default DialogAdd;

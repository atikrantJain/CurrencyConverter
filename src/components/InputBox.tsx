import React, {useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';

const InputBox = ({
  label,
  onChangeAmount,
  amount,
  currency = 'usd',
  currencyListData = [],
  showCurrencyList = false,
  setShowCurrencytList,
  onPressCurrency,
  disableInput,
  placeholderText = '',
}) => {
  const [searchedText, setSearchedCurrency] = useState('');

  const searchedCurrencyList = (text: string) => {
    const data = [...currencyListData];
    const updatedList = data.filter(
      (i: string) => i.toLowerCase() === text.toLowerCase(),
    );
    console.log(updatedList, 'updatedList');
    return updatedList;
  };

  return (
    <View
      style={{
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 100,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View style={{flex: 0.7}}>
          <Text>{label}</Text>
          <TextInput
            value={amount}
            onChangeText={e => onChangeAmount && onChangeAmount(e)}
            style={{flex: 1}}
            placeholder={placeholderText}
            keyboardType="number-pad"
            editable={disableInput}
          />
        </View>

        <View
          style={{
            flex: 0.3,
            alignItems: 'flex-end',
          }}>
          <Text>Currency Type</Text>
          <TouchableOpacity
            onPress={() => {
              setShowCurrencytList(!showCurrencyList);
            }}
            style={{
              backgroundColor: '#DFE4E7',
              borderRadius: 10,
              width: 100,
              alignSelf: 'center',
              marginTop: 10,
              padding: 10,
            }}>
            <Text>{currency}</Text>
          </TouchableOpacity>
        </View>
        {showCurrencyList && (
          <>
            <View
              style={{
                width: 150,
                maxHeight: 250,
                backgroundColor: 'white',
                position: 'absolute',
                right: 0,
                top: 70,
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                borderRadius: 8,
                zIndex: 10,
              }}>
              {/* <TextInput
                value={searchedText}
                placeholder="search currency"
                onChangeText={e => {
                  setSearchedCurrency(e);
                }}
                style={{
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  paddingHorizontal: 5,
                  margin: 10,
                }}
              /> */}
              <FlatList
                data={currencyListData}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => onPressCurrency(item)}
                      key={index}
                      style={{
                        flex: 1,
                        padding: 8,
                        alignSelf: 'center',
                        marginBottom: 5,
                      }}>
                      <Text style={{color: 'black', fontSize: 20}}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default InputBox;

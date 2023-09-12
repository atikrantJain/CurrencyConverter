import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useCurrencyInfo from '../../Hooks/GetCurrencyData';
import InputBox from '../../components/InputBox';

const Home = () => {
  const [showCurrencyList, setIsCurrencyList] = useState(false);
  const [showToCurrencyList, setIsToCurrencyList] = useState(false);
  const [to, setTo] = useState('inr');
  const [from, setFrom] = useState('usd');
  const [amount, setAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const currencyListData = useCurrencyInfo('usd');
  const currencyData = Object.keys(currencyListData);

  const convertAmount = () => {
    const data = Number(amount * currencyListData[to]);
    setToAmount(data);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setToAmount(amount);
    setAmount(toAmount);
  };

  const resetFields = () => {
    setFrom('usd');
    setTo('inr');
    setToAmount(0);
    setAmount(0);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          flexGrow: 1,
        }}
        style={{
          flex: 1,
          backgroundColor: '#82A3B0',
        }}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            flex: 1,
            backgroundColor: '#82A3B0',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              zIndex: 100,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <InputBox
              label={'From'}
              setShowCurrencytList={() => setIsCurrencyList(!showCurrencyList)}
              showCurrencyList={showCurrencyList}
              currencyListData={currencyData}
              onPressCurrency={e => {
                setFrom(e);
                setIsCurrencyList(false);
              }}
              currency={from}
              onChangeAmount={e => {
                setAmount(e);
              }}
              amount={String(amount)}
              placeholderText="Enter Amount"
              disableInput={true}
            />
          </View>
          <TouchableOpacity
            onPress={swap}
            style={{
              width: '30%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4F709C',
              borderRadius: 10,
              position: 'absolute',
              top: '37%',
              bottom: '-80%',
              zIndex: 100,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Swap</Text>
          </TouchableOpacity>
          <View
            style={{
              zIndex: 10,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <InputBox
              label={'To'}
              setShowCurrencytList={() =>
                setIsToCurrencyList(!showToCurrencyList)
              }
              showCurrencyList={showToCurrencyList}
              currencyListData={currencyData}
              onPressCurrency={e => {
                setTo(e);
                setIsToCurrencyList(false);
              }}
              currency={to}
              amount={String(toAmount)}
              disableInput={false}
            />
          </View>

          <TouchableOpacity
            onPress={convertAmount}
            style={{
              width: '90%',
              height: 'auto',
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4F709C',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>{`Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={resetFields}
            style={{
              width: '90%',
              height: 'auto',
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4F709C',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

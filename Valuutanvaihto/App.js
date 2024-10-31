import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  // Haetaan valuuttakurssit API:sta
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.apilayer.com/exchangerates_data/latest', {
          method: 'GET',
          headers: {
            'apikey': '84S5EuK1ogfiIaRhgoV8vTfwB4GJOFMy'
          }
        });

        const data = await response.json();
        const rates = data.rates;
        setCurrencies(Object.keys(rates));
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };
    
    fetchCurrencies();
  }, []);

  // Muuntolaskenta
  const convertCurrency = async () => {
    try {
      const response = await fetch('https://api.apilayer.com/exchangerates_data/latest', {
        method: 'GET',
        headers: {
          'apikey': '84S5EuK1ogfiIaRhgoV8vTfwB4GJOFMy'
        }
      });

      const data = await response.json();
      const rates = data.rates;
      const euroRate = rates['EUR'];  // Eurokurssi
      const selectedRate = rates[selectedCurrency];  // Valitun valuutan kurssi

      // Muunnos euroiksi
      const conversionResult = (amount / selectedRate) * euroRate;
      setConvertedAmount(conversionResult.toFixed(2));
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <Picker
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        style={styles.picker}
      >
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Button title="Convert" onPress={convertCurrency} />

      {convertedAmount && (
        <Text style={styles.result}>Converted Amount: €{convertedAmount}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  result: {
    fontSize: 20,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default App;
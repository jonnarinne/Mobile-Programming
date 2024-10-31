import { StyleSheet, TextInput, Button, View, FlatList, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics'; 

// Firebase-konfiguraatio
const firebaseConfig = {
  apiKey: "AIzaSyCux6rNCQvR1zxe1gvdBcs2XzrIEgp2vmA",
  authDomain: "ostoslista-e7ddc.firebaseapp.com",
  projectId: "ostoslista-e7ddc",
  storageBucket: "ostoslista-e7ddc.appspot.com",
  messagingSenderId: "73343886023",
  appId: "1:73343886023:web:dd8c81617884bd4ac514e2",
  measurementId: "G-EH0ZXPHCGM",
  databaseURL: "https://ostoslista-e7ddc-default-rtdb.firebaseio.com//", 
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app); 

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [products, setProducts] = useState([]);

  // Haetaan tuotteet Firebase Realtime Database -tietokannasta
  useEffect(() => {
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedProducts = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProducts(loadedProducts);
      } else {
        setProducts([]);
      }
    });
  }, []);

  // Tallennetaan uusi tuote Firebaseen
  const handleSave = () => {
    const productsRef = ref(database, 'products');
    push(productsRef, { title: product, amount: amount });
    setProduct('');
    setAmount('');
  };

  // Poistetaan tuote Firebase-tietokannasta
  const handleDelete = (id) => {
    const productRef = ref(database, `products/${id}`);
    remove(productRef);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Product title'
        onChangeText={text => setProduct(text)}
        value={product}
      />
      <TextInput
        style={styles.input}
        placeholder='Amount'
        onChangeText={text => setAmount(text)}
        value={amount}
      />
      <Button onPress={handleSave} title="Save" />

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.title} ({item.amount})</Text>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  boughtText: {
    color: '#0000ff',
  },
});


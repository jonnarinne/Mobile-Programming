import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, List, Appbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaProvider

export default function App() {
  const [item, setItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (item.trim()) {
      setShoppingList([...shoppingList, { id: Math.random().toString(), value: item }]);
      setItem('');
    }
  };

  const clearList = () => {
    setShoppingList([]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="Shopping List" />
          </Appbar.Header>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Add an item"
              value={item}
              onChangeText={setItem}
              style={styles.input}
            />
            <Button mode="contained" onPress={addItem} style={styles.button}>
              Add
            </Button>
            <Button mode="outlined" onPress={clearList} style={styles.button}>
              Clear
            </Button>
          </View>

          <FlatList
            data={shoppingList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <List.Item
                title={item.value}
                left={() => <List.Icon icon="cart-outline" />}
                style={styles.listItem}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f6f6',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    marginLeft: 5,
  },
  listItem: {
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
});

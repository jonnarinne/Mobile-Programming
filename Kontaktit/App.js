import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, PermissionsAndroid } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  // Funktio, jolla haetaan kontaktit laitteesta
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const filteredContacts = data.map(contact => ({
          id: contact.id,
          name: contact.name,
          phoneNumber: contact.phoneNumbers?.[0]?.number || 'Ei puhelinnumeroa',
        }));

        setContacts(filteredContacts);
      }
    } else {
      alert('Lupaa kontakteihin ei myönnetty');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Contacts" onPress={getContacts} />
      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactNumber}>{item.phoneNumber}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Ei kontakteja saatavilla</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 14,
    color: '#555',
  },
});

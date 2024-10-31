import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        Alert.alert('Ei löytynyt reseptejä!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Haku epäonnistui', 'Tarkista verkkoyhteys tai raaka-aine.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Syötä raaka-aine"
          value={ingredient}
          onChangeText={setIngredient}
        />
        <Button title="Hae reseptit" onPress={fetchRecipes} />
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.recipeContainer}>
            <Text>{item.strMeal}</Text>
            <Image source={{ uri: item.strMealThumb }} style={styles.thumbnail} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, // Koko kontti vie koko näytön korkeuden
    padding: 20,
  },
  searchSection: {
    marginTop: 100, // Siirtää hakukenttää ja painiketta alaspäin 100 yksikköä
    marginBottom: 20, // Lisää hieman väliä hakukentän ja listan väliin
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  recipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
});

export default App;
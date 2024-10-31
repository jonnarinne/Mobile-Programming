import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function Calculator({ navigation, history, setHistory }) {
  const [luku1, setLuku1] = useState('');
  const [luku2, setLuku2] = useState('');
  const [tulos, setTulos] = useState('');

  const laskeSumma = () => {
    const summa = parseFloat(luku1) + parseFloat(luku2);
    setTulos(summa.toString());

    setHistory([...history, `${luku1} + ${luku2} = ${summa}`]);

    setLuku1('');
    setLuku2('');
  };

  const laskeErotus = () => {
    const erotus = parseFloat(luku1) - parseFloat(luku2);
    setTulos(erotus.toString());

    setHistory([...history, `${luku1} - ${luku2} = ${erotus}`]);

    setLuku1('');
    setLuku2('');
  };

  return (

    <View style={styles.container}>
      <View style={styles.calculatorContainer}>
        <TextInput
          style={styles.input}
          value={luku1}
          onChangeText={(text) => setLuku1(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={luku2}
          onChangeText={(text) => setLuku2(text)}
          keyboardType="numeric"
        />
        <Text style={styles.tulos}>Tulos: {tulos}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Button title="+" onPress={laskeSumma} />
        <Button title="-" onPress={laskeErotus} />
        <Button title="History" onPress={() => navigation.navigate('History')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Keskittää komponentit pystysuunnassa
    paddingVertical: 40,       // Lisää ylä- ja alatyhjyyttä
  },
  calculatorContainer: {
    alignItems: 'center',      // Keskittää syötekentät ja tuloksen vaakasuunnassa
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',       // Asettaa painikkeet riviin
    justifyContent: 'space-around', // Jakaa ne tasaisesti
    width: '80%',               // Määrittää rivin leveyden suhteessa näyttöön
    marginVertical: 20,         // Lisää väliä muihin komponentteihin
  },
  result: {
    fontSize: 24,
    marginVertical: 20,
  },
});
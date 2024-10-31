import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [correctNumber, setCorrectNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    if (gameOver) return;

    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber)) {
      Alert.alert("Please enter a number between 1-100.");
      return;
    }

    setGuessCount(guessCount + 1);

    if (guessNumber === correctNumber) {
      setFeedback(`You guessed the number in ${guessCount + 1} guesses.`);
      setGameOver(true);
    } else if (guessNumber < correctNumber) {
      setFeedback("Too low!");
    } else {
      setFeedback("Too high!");
    }
  };

  const handleReset = () => {
    setCorrectNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setFeedback('');
    setGuessCount(0);
    setGameOver(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Guess the Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
        editable={!gameOver}
      />
      <TouchableOpacity style={styles.button} onPress={handleGuess} disabled={gameOver}>
        <Text style={styles.buttonText}>Make Guess</Text>
      </TouchableOpacity>
      {feedback !== '' && <Text style={styles.feedback}>{feedback}</Text>}
      {gameOver && (
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default App;
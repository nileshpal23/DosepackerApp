import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScannerButton from './ScannerButton';

export default function Home({ navigation }) {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const cards = [
    { id: '1', title: 'Replenish Canister', screen: 'List of Canisters', icon: 'user' },
    { id: '2', title: 'Canister Transfer', screen: 'SettingsScreen', icon: 'settings' },
    { id: '3', title: 'Drug List', screen: 'AboutScreen', icon: 'info' },
  ];

  return (
    <View style={styles.container}>
        <ScannerButton></ScannerButton>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Home Page</Text>
      </View>
      {cards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={styles.card}
          onPress={() => navigateToScreen(card.screen)}
        >
          <Text style={styles.cardTitle}>{card.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#007bff',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

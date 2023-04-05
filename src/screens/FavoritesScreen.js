import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function FavoritesScreen({ route }) {
  const { favorites } = route.params;
  const males = favorites.filter(
    (character) => character.gender === "male"
  ).length;
  const females = favorites.filter(
    (character) => character.gender === "female"
  ).length;
  const etc = favorites.filter(
    (character) => character.gender === "n/a"
  ).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        Males: {males}, Females: {females}, Etc.: {etc}
      </Text>
      {favorites.map((character) => (
        <View style={styles.card} key={character.name}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.gender}>Gender: {character.gender}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#E1ECF4",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E4E4E",
    marginBottom: 8,
  },
  gender: {
    fontSize: 16,
    color: "#4E4E4E",
  },
});

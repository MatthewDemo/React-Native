import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

function DetailsScreen({ route }) {
  const { character } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Name:</Text>
        <Text style={styles.value}>{character.name}</Text>
      </Animated.View>
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Height:</Text>
        <Text style={styles.value}>{character.height}</Text>
      </Animated.View>
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Mass:</Text>
        <Text style={styles.value}>{character.mass}</Text>
      </Animated.View>
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Hair color:</Text>
        <Text style={styles.value}>{character.hair_color}</Text>
      </Animated.View>
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Skin color:</Text>
        <Text style={styles.value}>{character.skin_color}</Text>
      </Animated.View>
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Eye color:</Text>
        <Text style={styles.value}>{character.eye_color}</Text>
      </Animated.View>
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Birth year:</Text>
        <Text style={styles.value}>{character.birth_year}</Text>
      </Animated.View>
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Gender:</Text>
        <Text style={styles.value}>{character.gender}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  item: {
    flexDirection: "row",
    marginBottom: 8,
    backgroundColor: "#E1ECF4",
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    fontSize: 16,
  },
});

export default DetailsScreen;

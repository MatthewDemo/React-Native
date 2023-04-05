import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import HeartIcon from "../../components/HeartIcon";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  const toggleFavorite = (character) => {
    const isFavorite = favorites.some((fav) => fav.name === character.name);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.name !== character.name));
    } else {
      setFavorites([...favorites, character]);
    }
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetFavorites = () => {
    setFavorites([]);
  };

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people")
      .then((response) => {
        setCharacters(response.data.results);
        setNextUrl(response.data.next);
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchMoreCharacters = () => {
    if (nextUrl) {
      axios
        .get(nextUrl)
        .then((response) => {
          setCharacters([...characters, ...response.data.results]);
          setNextUrl(response.data.next);
        })
        .catch((error) => console.log(error));
    }
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.name === item.name);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Details", { character: item })}
      >
        <View style={styles.cardLeft}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.cardRight}
          onPress={() => toggleFavorite(item)}
        >
          <HeartIcon color={isFavorite ? "red" : "gray"} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={resetFavorites}>
          <Text style={styles.resetButton}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoritesCounter}
          onPress={() =>
            navigation.navigate("Favorites", { favorites: favorites })
          }
        >
          <Animated.View
            style={[
              styles.favoritesCount,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Text>Favorites: {favorites.length}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity
        style={styles.showMoreButton}
        onPress={fetchMoreCharacters}
      >
        <Text style={styles.showMoreText}>Show more</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  resetButton: {
    color: "#4E4E4E",
    fontSize: 16,
    fontWeight: "bold",
  },
  favoritesCounter: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
  },
  favoritesCount: {
    color: "#4E4E4E",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#E1ECF4",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E4E4E",
  },
  showMoreButton: {
    backgroundColor: "#4E4E4E",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginBottom: 20,
  },
  showMoreText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

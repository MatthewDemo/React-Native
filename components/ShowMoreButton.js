import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import axios from "axios";

const ShowMoreButton = ({ characters, setCharacters, nextUrl, setNextUrl }) => {
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

  return (
    <TouchableOpacity
      style={styles.showMoreButton}
      onPress={fetchMoreCharacters}
    >
      <Text style={styles.showMoreText}>Show more</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default ShowMoreButton;

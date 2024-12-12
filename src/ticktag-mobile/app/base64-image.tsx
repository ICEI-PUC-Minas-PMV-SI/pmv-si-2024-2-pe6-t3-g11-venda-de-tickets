import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface Base64ImageProps {
  base64String: string | null;
}

const Base64Image: React.FC<Base64ImageProps> = ({ base64String }) => {
  return (
    <View style={styles.container}>
      {base64String ? (
        <Image
          source={{ uri: `data:image/png;base64,${base64String}` }}
          style={styles.image}
        />
      ) : (
        <Text>Imagem não disponível.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default Base64Image;
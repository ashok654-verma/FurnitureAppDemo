import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 20, color: '#888', marginVertical: 8 },
  desc: { fontSize: 16, color: '#555', marginBottom: 20 },
});

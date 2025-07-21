import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>{item.price}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  name: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  price: {
    color: '#777',
    marginTop: 4,
  },
});

export default ProductCard;

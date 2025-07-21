import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price;
    }, 0).toFixed(2);
  };

  const handleRemove = (item) => {
    Alert.alert('Remove Item', `Remove ${item.name} from cart?`, [
      { text: 'Cancel' },
      { text: 'Remove', onPress: () => removeFromCart(item) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => handleRemove(item)} style={styles.removeBtn}>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={{marginStart :12, width:'100%'}}>
            <Text style={{marginStart : 12, fontSize :20, fontWeight :'500', marginVertical :16}}>Cart Screen</Text>
        </View>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            contentContainerStyle={{ paddingBottom: 120 }}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    marginTop :30
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  removeBtn: {
    padding: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 18,
    color: '#000',
  },
  checkoutBtn: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
});

export default CartScreen;

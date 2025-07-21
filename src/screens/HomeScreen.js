import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import furnitureData from '../data/furnitureData';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const categories = ['All', 'Sofa', 'Table', 'Chair'];

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { addToCart, cartItems } = useContext(CartContext);
    const navigation = useNavigation();
    const filteredData =
        selectedCategory === 'All'
            ? furnitureData
            : furnitureData.filter(item => item.category === selectedCategory);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
                <Text style={styles.addText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>Dashboard</Text>
            </View>
            <View style={styles.container}>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}>
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat && styles.selectedCategory,
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === cat && styles.selectedText,
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>


                <FlatList
                    data={filteredData}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            </View>
        </SafeAreaView>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    categoryScroll: {
        marginVertical: 10,
        paddingHorizontal: 10,
        flexGrow: 0,
    },
    categoryButton: {
        paddingVertical: 6,
        paddingHorizontal: 20,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginRight: 10,
    },
    selectedCategory: {
        backgroundColor: '#333',
    },
    categoryText: {
        color: '#333',
        fontWeight: '500',
        fontSize: 16,
    },
    selectedText: {
        color: '#fff',
    },
    list: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },

    card: {
        backgroundColor: '#fafafa',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        height: 350,
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 10,
    },

    name: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
    description: {
        fontSize: 14,
        color: '#777',
        marginVertical: 6,
    },
    addButton: {
        backgroundColor: '#0a84ff',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    addText: {
        color: '#fff',
        fontWeight: '600',
    },
    header: {
        elevation: 8,
        width: '90%',
        marginTop: 20,
        marginStart: 16

    }
});

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { useNavigation } from '@react-navigation/native';

const getIProdutos = () => {
    return [
        { id: 1, nome: 'Pneu De Moto', desc: 'Honda CG', quantidade: 10, valor: '70,00' },
        { id: 2, nome: 'Parafuso', quantidade: 5, valor: '05,00' },
        { id: 3, nome: 'Vela De Moto', quantidade: 2, valor: '30,00' },
        { id: 4, nome: 'Oléo', quantidade: 2, valor: '10,00' },
        { id: 5, nome: 'Aro', quantidade: 2, valor: '20,00' },
        { id: 6, nome: 'Capa de Banco', quantidade: 6, valor: '70,00' },
        { id: 7, nome: 'Coroa de Moto', quantidade: 5, valor: '30,00' },
        { id: 8, nome: 'Pneu de Carro', quantidade: 10, valor: '100,00' },
        { id: 9, nome: 'Corrente de Moto', quantidade: 15, valor: '30,00' },
    ];
};

export const Produtos = () => {
    const navigation = useNavigation()
    const produtos = getIProdutos();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={(item) => handleProduct(item)}
        >
            <Text style={styles.itemNome}>{item.nome}</Text>
            {item.desc &&
                <Text style={styles.itemSub}>{item.desc}</Text>
            }
            <Text style={styles.itemSub}>Valor: {item.valor}</Text>
        </TouchableOpacity>
    );

    const handleProduct = (item) => {
        navigation.navigate('DetalhesProduto', { produto: item })
    }

    const handleNewProduct = () => {
        navigation.navigate('CadastroDeProdutos')
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Produtos</Text>
                    <ButtonAdd
                        onPress={handleNewProduct}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <FlatList
                        data={produtos}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4,
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSub: {
        fontSize: 16,
        color: '#666',
    }
});


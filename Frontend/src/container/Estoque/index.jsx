import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd'
import { useNavigation } from '@react-navigation/native';

const getItensEstoque = () => {
    return [
        { id: 1, nome: 'Pneu De Moto', quantidade: 10, valorTotal: '150,00' },
        { id: 2, nome: 'Parafuso', quantidade: 5 },
        { id: 3, nome: 'Vela De Moto', quantidade: 2 },
        { id: 4, nome: 'Oléo', quantidade: 2 },
        { id: 5, nome: 'Aro', quantidade: 2 },
        { id: 6, nome: 'Capa de Banco', quantidade: 6 },
        { id: 7, nome: 'Coroa de Moto', quantidade: 5 },
        { id: 8, nome: 'Pneu de Carro', quantidade: 10 },
        { id: 9, nome: 'Corrente de Moto', quantidade: 15 },
    ];
};

export const Estoque = () => {
    const navigation = useNavigation()

    const itensEstoque = getItensEstoque();

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemNome}>{item.nome}</Text>
            <Text style={styles.itemSub}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.itemSub}>Valor em estoque: R$ {item.valorTotal}</Text>
        </TouchableOpacity>
    );

    const handleCadastrarEstoque = () => {
        navigation.navigate('CadastroDeEstoque')
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Estoque</Text>
                    <ButtonAdd
                        onPress={handleCadastrarEstoque}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <FlatList
                        data={itensEstoque}
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 1, // Adicione esta propriedade para suporte a Android
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
    },
});


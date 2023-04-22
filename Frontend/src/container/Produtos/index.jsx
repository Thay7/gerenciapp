import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';

export const Produtos = () => {
    const navigation = useNavigation()
    const [produtos, setProdutos] = useState({
        peca_descricao: '',
        peca_modelo: '',
        peca_valorRevenda: 0,
        peca_valorCompra: 0,
        peca_marca: '',
        estoque_criadoEm: '',
        estoque_atualizadoEm: '',
    })

    useEffect(() => {
        buscarProdutos()
    }, [])

    const buscarProdutos = async () => {
        let json = await useApi.produtos()
        setProdutos(json)
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('DetalhesProduto', { item })}
        >
            <Text style={styles.itemNome}>{item.peca_descricao}</Text>
            {item.desc &&
                <Text style={styles.itemSub}>desc</Text>
            }
            <Text style={styles.itemSub}>Valor: {formatter.format(item.peca_valorRevenda)}</Text>

        </TouchableOpacity>
    );

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


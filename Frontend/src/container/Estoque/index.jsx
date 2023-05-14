import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd'
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';

export const Estoque = () => {
    const [estoque, setEstoque] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        listaEstoque()
    }, []);

    const listaEstoque = async () => {
        setLoading(true)
        let json = await useApi.listarEstoque()
        setEstoque(json)
        setLoading(false)
    }

    const navigation = useNavigation()

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
                    {loading == true ?
                        (
                            <View>
                                <Text>Carregando...</Text>
                            </View>
                        )
                        :
                        (
                            estoque.map((item, index) => (
                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemNome}>Nome: {item.TB_produto.produto_nome}</Text>
                                    <Text>Quantidade: {item.estoque_quantidade}</Text>
                                </View>
                                ))
                        )
                    }
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


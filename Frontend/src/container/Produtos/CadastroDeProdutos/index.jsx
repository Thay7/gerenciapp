import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { InputApp } from '../../../components/InputApp';

export const CadastroDeProdutos = () => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Cadastro de Produtos</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <View style={{ marginBottom: 16 }}>
                        <InputApp
                            title="Nome"
                            width="50"
                        />
                        <InputApp
                            title="Descrição"
                        />
                        <InputApp
                            title="Valor de compra"
                        />
                        <InputApp
                            title="Valor de venda"
                        />

                    </View>
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


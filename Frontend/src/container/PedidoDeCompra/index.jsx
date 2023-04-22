import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { InputApp } from '../../components/InputApp'

export const PedidoDeCompra = () => {

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Pedido de Compra</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <InputApp
                        title="Nome"
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
});


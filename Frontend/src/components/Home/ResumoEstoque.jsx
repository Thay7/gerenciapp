import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const StockSummary = ({ totalPieces, totalValue, mostSoldItem }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.movimentoCaixaTitle}>Resumo do Estoque</Text>
            </View>
            <View style={styles.summaryItem}>
                <Text style={styles.summaryTitle}>Peças Cadastradas</Text>
                <Text style={styles.summaryValue}>100</Text>
            </View>
            <View style={styles.summaryItem}>
                <Text style={styles.summaryTitle}>Valor Total do Estoque</Text>
                <Text style={styles.summaryValue}>R$ 250,00</Text>
            </View>
            <View style={styles.summaryItem}>
                <Text style={styles.summaryTitle}>Peça Mais Vendida</Text>
                <Text style={styles.summaryValue}>Pneu de Moto</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        maxWidth: 800,
    },
    movimentoCaixaTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    summaryTitle: {
        fontSize: 16,
        color: '#333333',
    },
    summaryValue: {
        fontSize: 16,
        color: '#007AFF',
    },
});

export default StockSummary;

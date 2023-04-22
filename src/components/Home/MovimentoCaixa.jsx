import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HomeItem } from './HomeItem';
import StockSummary from './ResumoEstoque';
import { ScrollView } from 'react-native';

export const CashierMovement = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.movimentoCaixaContainer}>
                    <View style={styles.movimentoCaixaHeader}>
                        <Text style={styles.movimentoCaixaTitle}>Movimento do Caixa</Text>
                        <Text>Diário</Text>
                    </View>
                    <View style={styles.movimentoCaixaRow}>
                        <Text style={styles.movimentoCaixaLabel}>Quantidade de Peças Vendidas:</Text>
                        <Text style={styles.movimentoCaixaValue}>30</Text>
                    </View>
                    <View style={styles.movimentoCaixaRow}>
                        <Text style={styles.movimentoCaixaLabel}>Peça mais Vendida:</Text>
                        <Text style={styles.movimentoCaixaValue}>Pneu de Moto</Text>
                    </View>
                    <View style={styles.movimentoCaixaRow}>
                        <Text style={styles.movimentoCaixaLabel}>Saldo Total:</Text>
                        <Text style={styles.movimentoCaixaValue}>R$ 500,00</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    movimentoCaixaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    movimentoCaixaTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    movimentoCaixaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    movimentoCaixaLabel: {
        fontSize: 16,
        color: '#333333',
    },
    movimentoCaixaValue: {
        fontSize: 16,
        color: '#007AFF',
    },
})

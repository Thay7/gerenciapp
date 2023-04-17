import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HomeItem } from '../../components/Home/HomeItem';
import StockSummary from '../../components/Home/StockSummary';
import { ScrollView } from 'react-native';

export const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Meu Estoque</Text>
                <Text style={styles.subHeaderText}>Borracharia do Valdir</Text>
            </View>
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
                {/* // */}
                <StockSummary
                    totalPieces={30}
                    mostSoldItem="Pneu de Moto"
                    totalValue={500}
                />
                <View style={styles.homeItemsContainer}>
                    <HomeItem />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 80,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
    },
    subHeaderText: {
        fontSize: 20,
        color: '#666666',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 20,
    },
    movimentoCaixaContainer: {
        marginVertical: 10,
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
    homeItemsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 10,
        width: '100%',
        maxWidth: 800,
    },
});

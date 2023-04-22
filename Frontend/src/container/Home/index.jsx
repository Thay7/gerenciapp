import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HomeItem } from '../../components/Home/HomeItem';
import StockSummary from '../../components/Home/ResumoEstoque';
import { ScrollView } from 'react-native';
import { CashierMovement } from '../../components/Home/MovimentoCaixa';

export const Home = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Meu Estoque</Text>
                <Text style={styles.subHeaderText}>Borracharia do Valdir</Text>
            </View>
            <View
                style={styles.contentContainer}
            >
                <View
                    style={styles.movimentoCaixaContainer}
                >
                    <CashierMovement />
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

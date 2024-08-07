import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { ButtonBack } from '../../components/Buttons/ButtonBack';

export const Relatorios = () => {
    const [vendasList, setVendasList] = useState([]);
    const [pedidoComprasList, setPedidosCompraList] = useState([]);
    const [consolidadosList, setConsolidadosList] = useState([]);

    useEffect(() => {
        listaCadastros()
    }, []);

    const listaCadastros = async () => {
        setVendasList([
            {
                nome: 'Vendas por Mês/Ano',
                pagina: 'VendasPorMesAno'
            },
            {
                nome: 'Itens Mais Vendidos',
                pagina: 'ItensMaisVendidos'
            }
        ]);

        setPedidosCompraList([
            {
                nome: 'Histórico pedidos de compra',
                pagina: 'HistoricoPedidosCompra'
            },
            {
                nome: 'Compras por fornecedor',
                pagina: 'ComprasPorFornecedor'
            }
        ]);

        setConsolidadosList([
            {
                nome: 'Relatório consolidado',
                pagina: 'RelatorioConsolidado'
            },
        ]);
    };

    const navigation = useNavigation()

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <ButtonBack navigate="Home" />
                    <Text style={styles.titulo}>Relatórios</Text>
                </View>
                <View style={styles.containerBox}>
                    {vendasList.map((item, index) => (
                        <TouchableOpacity style={styles.box} key={index} onPress={() => {
                            navigation.navigate(item.pagina, { item: item })
                        }}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.itemSub}>{item.nome}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.containerBox}>
                    {pedidoComprasList.map((item, index) => (
                        <TouchableOpacity style={styles.box} key={index} onPress={() => {
                            navigation.navigate(item.pagina, { item: item })
                        }}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.itemSub}>{item.nome}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.containerBox}>
                    {consolidadosList.map((item, index) => (
                        <TouchableOpacity style={styles.box} key={index} onPress={() => {
                            navigation.navigate(item.pagina, { item: item })
                        }}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.itemSub}>{item.nome}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView >
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
        marginBottom: 16
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    headerIcons: {
        display: 'flex',
        flexDirection: 'row',
    },
    itemNome: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6
    },
    itemSub: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8
    },
    containerBox: {
        marginBottom: 18
    },
    box: {
        backgroundColor: '#fffafa',
        borderRadius: 8,
        justifyContent: 'center',
        height: 50,
        marginBottom: 10,
        elevation: 4
    },
});
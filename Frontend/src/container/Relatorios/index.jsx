import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';
import { ButtonBack } from '../../components/Buttons/ButtonBack';

export const Relatorios = () => {
    const [vendasList, setVendasList] = useState([]);
    const [pedidoComprasList, setPedidosCompraList] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listaCadastros()
    }, []);

    const listaCadastros = async () => {
        setLoading(true)
        //let json = await useApi.listarEstoque()
        //setEstoqueList(json)
        setVendasList([
            {
                nome: 'Vendas por mês/ano',
                pagina: 'VendasPorMesAno',
                dados: [
                    { id: 1, nomeFantasia: 'AutoPeças Master', razaoSocial: 'Master Autopeças Ltda', cnpj: '12.345.678/0001-90', contato: '(84) 9 9999-9991' },
                    { id: 2, nomeFantasia: 'MecânicaParts', razaoSocial: 'Mecânica Parts Distribuidora de Peças Automotivas EIRELI', cnpj: '98.765.432/0001-21', contato: '(84) 9 9999-9992' },
                ]
            },
            {
                nome: 'Itens Mais Vendidos',
                pagina: 'VendasPorMesAno',
                dados: [
                    { id: 1, nome: 'Maria Ozanilda', usuario: 'nilda', email: 'mariaozanilda@gmail.com' },
                    { id: 2, nome: 'Valdir', usuario: 'valdir', email: 'valdir@gmail.com' },
                    { id: 3, nome: 'Guilherme Rodrigues', usuario: 'guilherme', email: 'guilhermerodrigues@gmail.com' },
                    { id: 4, nome: 'Thaylynne', usuario: 'thay', email: 'thaylynne@gmail.com' },

                ]
            },
            {
                nome: 'Serviços por mês/ano',
                pagina: 'VendasPorMesAno',
                dados: [
                    { id: 1, nome: 'Maria Ozanilda', usuario: 'nilda', email: 'mariaozanilda@gmail.com' },
                    { id: 2, nome: 'Valdir', usuario: 'valdir', email: 'valdir@gmail.com' },
                    { id: 3, nome: 'Guilherme Rodrigues', usuario: 'guilherme', email: 'guilhermerodrigues@gmail.com' },
                    { id: 4, nome: 'Thaylynne', usuario: 'thay', email: 'thaylynne@gmail.com' },

                ]
            },
            {
                nome: 'Serviços mais vendidos',
                pagina: 'VendasPorMesAno',
                dados: [
                    { id: 1, nome: 'Maria Ozanilda', usuario: 'nilda', email: 'mariaozanilda@gmail.com' },
                    { id: 2, nome: 'Valdir', usuario: 'valdir', email: 'valdir@gmail.com' },
                    { id: 3, nome: 'Guilherme Rodrigues', usuario: 'guilherme', email: 'guilhermerodrigues@gmail.com' },
                    { id: 4, nome: 'Thaylynne', usuario: 'thay', email: 'thaylynne@gmail.com' },

                ]
            }
        ]);

        setPedidosCompraList([
            {
                nome: 'Histórico de pedidos de compra',
                dados: [
                    { id: 1, nomeFantasia: 'AutoPeças Master', razaoSocial: 'Master Autopeças Ltda', cnpj: '12.345.678/0001-90', contato: '(84) 9 9999-9991' },
                    { id: 2, nomeFantasia: 'MecânicaParts', razaoSocial: 'Mecânica Parts Distribuidora de Peças Automotivas EIRELI', cnpj: '98.765.432/0001-21', contato: '(84) 9 9999-9992' },
                ]
            },
            {
                nome: 'Compra por fornecedor',
                dados: [
                    { id: 1, nomeFantasia: 'AutoPeças Master', razaoSocial: 'Master Autopeças Ltda', cnpj: '12.345.678/0001-90', contato: '(84) 9 9999-9991' },
                    { id: 2, nomeFantasia: 'MecânicaParts', razaoSocial: 'Mecânica Parts Distribuidora de Peças Automotivas EIRELI', cnpj: '98.765.432/0001-21', contato: '(84) 9 9999-9992' },
                ]
            },
            {
                nome: 'Orçamento por fornecedor',
                dados: [
                    { id: 1, nomeFantasia: 'AutoPeças Master', razaoSocial: 'Master Autopeças Ltda', cnpj: '12.345.678/0001-90', contato: '(84) 9 9999-9991' },
                    { id: 2, nomeFantasia: 'MecânicaParts', razaoSocial: 'Mecânica Parts Distribuidora de Peças Automotivas EIRELI', cnpj: '98.765.432/0001-21', contato: '(84) 9 9999-9992' },
                ]
            },
        ]);

        setLoading(false)
    }
    const navigation = useNavigation()

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <ButtonBack navigate="Home" /> 
                    <Text style={styles.titulo}>Relatórios</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={styles.itemNome}>Vendas</Text>
                    {vendasList.map((item, index) => (
                        <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => {
                            navigation.navigate(item.pagina, { item: item })
                        }}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.itemSub}>{item.nome}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <Text style={[styles.itemNome, { marginTop: 16 }]}>Pedidos de Compra</Text>
                    {pedidoComprasList.map((item, index) => (
                        <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => {
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
        elevation: 1,
        borderRadius: 8,
        marginVertical: 4,
    },
    itemNome: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5
    },
    itemSub: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold'
    },
    cleanFilterText: {
        color: 'red',
        alignSelf: 'flex-end',
        marginBottom: 5
    },
    rowBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
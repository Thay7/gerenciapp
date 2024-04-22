import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import { HomeItem } from '../../components/Home/HomeItem';

//Icons menus
import ic_vendas from '../../icons/Home/ic_vendas.png';
import ic_estoque from '../../icons/Home/ic_estoque.png';
import ic_produtos from '../../icons/Home/ic_produtos.png';
import ic_pedido_de_compra from '../../icons/Home/ic_pedido_de_compra.png';
import ic_cadastros from '../../icons/Home/ic_cadastros.png';
import ic_dashboard from '../../icons/Home/ic_dashboard.png';

//
import { ResumoDia } from '../../components/Home/ResumoDia';
import { useApi } from '../../Api/useApi';

export const Home = () => {
    const menus = [
        { name: 'Vendas', icon: ic_vendas, page: 'Vendas' },
        { name: 'Estoque', icon: ic_estoque, page: 'Estoque' },
        { name: 'Cadastros', icon: ic_cadastros, page: 'Cadastros' },
        { name: 'Produtos/Serviços', icon: ic_produtos, page: 'ListarProdutosServicos' },
        { name: 'Pedido De Compra', icon: ic_pedido_de_compra, page: 'PedidoDeCompra' },
        { name: 'Relatórios', icon: ic_dashboard, page: 'Relatorios' }
    ];

    const [resumoData, setResumoData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        buscarResumoDia();
    }, [])

    const buscarResumoDia = async () => {
        setRefreshing(true);
        let data = await useApi.listarResumoDia();
        setResumoData(data);
        setRefreshing(false);
    };

    const onRefresh = () => {
        buscarResumoDia();
    };

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#3F51B5']} // Cores do indicador de carregamento
                    progressBackgroundColor="#fff" // Cor de fundo do indicador de carregamento
                />
            }
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>GerenciApp</Text>
                <Text style={styles.subHeaderText}>Borracharia do Valdir</Text>
            </View>
            <View style={styles.contentBox}>
                <ResumoDia data={resumoData} />
            </View>
            <HomeItem menus={menus} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    contentBox: {
        paddingHorizontal: 16,
    },
});

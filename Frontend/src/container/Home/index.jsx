import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HomeItem } from '../../components/Home/HomeItem';
import { ScrollView } from 'react-native';

//Icons menus
import ic_vendas from '../../icons/Home/ic_vendas.png';
import ic_estoque from '../../icons/Home/ic_estoque.png';
import ic_produtos from '../../icons/Home/ic_produtos.png';
import ic_pedido_de_compra from '../../icons/Home/ic_pedido_de_compra.png';
import ic_cadastros from '../../icons/Home/ic_cadastros.png';
import ic_dashboard from '../../icons/Home/ic_dashboard.png';

import { ResumoDia } from '../../components/Home/ResumoDia';
import { formatterbrl } from '../../utils/formatterbrl'

export const Home = () => {
    const menus = [
        { name: 'Vendas', icon: ic_vendas, page: 'Vendas' },
        { name: 'Estoque', icon: ic_estoque, page: 'Estoque' },
        { name: 'Cadastros', icon: ic_cadastros, page: 'Cadastros' },
        { name: 'Produtos/Serviços', icon: ic_produtos, page: 'ListarProdutosServicos' },
        { name: 'Pedido De Compra', icon: ic_pedido_de_compra, page: 'PedidoDeCompra' },
        { name: 'Relatórios', icon: ic_dashboard, page: 'Relatorios' }
    ];

    const labelsAndValues = [
        { label: 'Vendas do dia:', value: 25 },
        { label: 'Entrada Caixa:', value: formatterbrl(726) },
        { label: 'Saída Caixa:', value: formatterbrl(1349) },
        { label: 'Produto mais vendido:', value: 'Oléo Mobil' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>GerenciApp</Text>
                <Text style={styles.subHeaderText}>Borracharia do Valdir</Text>
            </View>
            <View style={styles.contentBox}>
                <ResumoDia
                    labelsAndValues={labelsAndValues}
                />
            </View>
            <View>
                <HomeItem
                    menus={menus}
                />
            </View>
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

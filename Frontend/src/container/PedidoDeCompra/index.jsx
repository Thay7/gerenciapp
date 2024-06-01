import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useApi } from '../../Api/useApi';
import { ModalSearch } from '../../components/ModalSearch/index';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { ButtonSearch } from '../../components/Buttons/ButtonSearch';
import { formatterbrl } from '../../utils/formatterbrl';
import { useRoute } from "@react-navigation/native";
import { ButtonBack } from '../../components/Buttons/ButtonBack';
import { Loading } from '../../components/Loading';

export const PedidoDeCompra = () => {
    const [pedidosCompraList, setPedidosCompraList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const route = useRoute();

    useEffect(() => {
        fnListarPedidosCompras()
    }, []);

    const fnListarPedidosCompras = async () => {
        setLoading(true)
        let json = await useApi.listarPedidosCompras()
        setPedidosCompraList(json)
        setLoading(false)
    }

    const fnHandleFilter = (number, value, dateHour) => {
        if (number || value || dateHour) {
            const filtered = pedidosCompraList.filter(item =>
                (!number || item.numero_pedido_compra.includes(number.trim())) &&
                (!value || item.valor_total.includes(value.trim())) &&
                (!dateHour || item.data_hora.includes(dateHour.trim()))
            );

            setSearch(filtered);
            setModalIsOpen(!modalIsOpen);

            if (filtered.length == 0)
                setNoResults(true);
            else
                setNoResults(false);
        }
    }

    const handleClearFilter = () => {
        setSearch([]);
        setNoResults(false);
    }

    const navigation = useNavigation()

    /*Ao adicionar, editar ou deletar um pedido de compra, será redirecionado para essa tela novamente.
    Esse useEffect atualiza a lista de pedidos compra para exibir corretamente depois da alteração/deleção*/
    useEffect(() => {
        if (route.params?.novoPedidoCompra) {
            const novoPedido = route.params.novoPedidoCompra;
            setPedidosCompraList([...pedidosCompraList, novoPedido]);
        };

        if (route.params?.pedidoRecebido) {
            const pedidoRecebido = route.params.pedidoRecebido;
            setPedidosCompraList(pedidosCompraList.map(pedido => (pedido.numero_pedido_compra === pedidoRecebido.numero_pedido_compra ? pedidoRecebido : pedido)));
        };

        if (route.params?.pedidoAtualizado) {
            const pedidoAtualizado = route.params.produtoAtualizado;
            setProdutos(produtos.map(pedido => (pedido.numero_pedido_compra === pedidoAtualizado.numero_pedido_compra ? pedidoAtualizado : pedido)));
        };

        if (route.params?.pedidoDeletado) {
            const pedidoDeletado = route.params.pedidoDeletado;
            const updatedOptions = produtos.filter(item => item.numero_pedido_compra !== pedidoDeletado.numero_pedido_compra);
            setProdutos(updatedOptions);
        };
    }, [route.params?.novoPedidoCompra, route.params?.pedidoRecebido, route.params?.produtoDeletado]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Home" />
                    <Text style={styles.titulo}>Pedido de Compra</Text>
                </View>
                <View style={styles.header}>
                    <View style={{ marginRight: 5 }}>
                        <ButtonSearch
                            onPress={() => setModalIsOpen(true)}
                        />
                    </View>
                    <ButtonAdd
                        onPress={() => navigation.navigate('NovoPedidoCompra')}
                    />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    (search.length > 0 || noResults) && (
                        <TouchableOpacity
                            onPress={handleClearFilter}
                        >
                            <Text style={styles.cleanFilterText}>Limpar filtro</Text>
                        </TouchableOpacity>
                    )
                }
                <View style={{ marginBottom: 16 }}>
                    {loading ?
                        (
                            <Loading /> 
                        )
                        :
                        (
                            noResults ?
                                (
                                    <View>
                                        <Text>Nenhum resultado para a busca!</Text>
                                    </View>
                                )
                                :
                                (
                                    search.length > 0 ?
                                        (
                                            search.map((item, index) => (
                                                <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => {
                                                    navigation.navigate('DetalhesPedidoCompra', { pedidocompra: item })
                                                }}>
                                                    <View style={styles.rowBetween}>
                                                        <Text style={styles.itemNome}>Nº Pedido:</Text>
                                                        <Text style={styles.itemNome}>{item.numero_pedido_compra}</Text>
                                                    </View>
                                                    <View style={styles.rowBetween}>
                                                        <Text>Data e Hora:</Text>
                                                        <Text>{item.data_hora}</Text>
                                                    </View>
                                                    <View style={styles.rowBetween}>
                                                        <Text>Total:</Text>
                                                        <Text>{formatterbrl(item.valor_total)}</Text>
                                                    </View>
                                                    <View style={[styles.rowBetween, { marginTop: 8 }]}>
                                                        <Text style={styles.itemNome}>Status:</Text>
                                                        <Text style={[styles.itemNome, { color: item.recebido == false ? '#4040ff' : 'green' }]}>{item.recebido == false ? "Efetuado" : "Recebido"}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                        )
                                        :
                                        pedidosCompraList.map((item, index) => (
                                            <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => {
                                                navigation.navigate('DetalhesPedidoCompra', { pedidocompra: item })
                                            }}>
                                                <View style={styles.rowBetween}>
                                                    <Text style={styles.itemNome}>Nº Pedido:</Text>
                                                    <Text style={styles.itemNome}>{item.numero_pedido_compra}</Text>
                                                </View>
                                                <View style={styles.rowBetween}>
                                                    <Text>Data e Hora:</Text>
                                                    <Text>{item.data_hora}</Text>
                                                </View>
                                                <View style={styles.rowBetween}>
                                                    <Text>Total:</Text>
                                                    <Text>{formatterbrl(item.valor_total)}</Text>
                                                </View>
                                                <View style={[styles.rowBetween, { marginTop: 8 }]}>
                                                    <Text style={styles.itemNome}>Status:</Text>
                                                    <Text style={[styles.itemNome, { color: item.recebido == false ? '#4040ff' : 'green' }]}>{item.recebido == false ? "Efetuado" : "Recebido"}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                )
                        )
                    }
                </View>
                <ModalSearch
                    title="Pesquisar Pedido Compra"
                    list={pedidosCompraList}
                    openModal={modalIsOpen}
                    fnCloseModal={() => setModalIsOpen(!modalIsOpen)}
                    handleFilterSales={fnHandleFilter}
                    pedidocompra
                />
            </ScrollView >
        </View >
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
        marginBottom: 8,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSub: {
        fontSize: 16,
        color: '#666',
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
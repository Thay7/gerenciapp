import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

import { useApi } from '../../Api/useApi';
import { ModalSearch } from '../../components/ModalSearch/index';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { ButtonSearch } from '../../components/Buttons/ButtonSearch';
import { formatterbrl } from '../../utils/formatterbrl';
import { Loading } from '../../components/Loading';

export const Vendas = () => {
    const [vendasList, setVendasList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const route = useRoute();

    useEffect(() => {
        buscarVendas()
    }, [])

    const buscarVendas = async () => {
        setLoading(true);
        let json = await useApi.listarVendas();
        console.log(json)
        setVendasList(json);
        setLoading(false);
    }

    const fnHandleFilter = (number, value, dateHour) => {
        if (number || value || dateHour) {
            const filtered = vendasList.filter(item =>
                (!number || item.numero_venda.includes(number.trim())) &&
                (!value || item.valor.includes(value.trim())) &&
                (!dateHour || item.data_hora.includes(dateHour.trim()))
            );

            setSearch(filtered);
            setModalIsOpen(!modalIsOpen);

            if (filtered.length == 0)
                setNoResults(true);
            else
                setNoResults(false);
        }
    };

    const handleClearFilter = () => {
        setSearch([]);
        setNoResults(false);
    };

    const navigation = useNavigation()

    /*Ao adicionar, editar ou deletar um produto, será redirecionado para essa tela novamente.
    Esse useEffect atualiza a lista de produtos para exibir corretamente depois da alteração/deleção*/
    useEffect(() => {
       /* if (route.params?.novaVenda) {
            const novaVenda = route.params.novaVenda;
            setVendasList([...vendasList, novaVenda]);
        }*/

        /*if (route.params?.produtoAtualizado) {
            const produtoAtualizado = route.params.produtoAtualizado;
            setProdutos(produtos.map(produto => (produto.id === produtoAtualizado.id ? produtoAtualizado : produto)));
        }

        if (route.params?.produtoDeletado) {
            const produtoDeletado = route.params.produtoDeletado;
            const updatedOptions = produtos.filter(item => item.id !== produtoDeletado.id);
            setProdutos(updatedOptions);
        }*/
    }, [route.params?.novaVenda]);

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Lista Vendas</Text>
                    <View style={styles.headerIcons}>
                        <View style={{ marginRight: 5 }}>
                            <ButtonSearch
                                onPress={() => setModalIsOpen(true)}
                            />
                        </View>
                        <ButtonAdd
                            onPress={() => navigation.navigate('NovaVenda')}
                        />
                    </View>
                </View>
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
                            <View>
                                <Loading />
                            </View>
                        )
                        :
                        (
                            !vendasList.length > 0 ?
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
                                                    navigation.navigate('DetalhesVenda', { venda: item })
                                                }}>
                                                    <View style={styles.rowBetween}>
                                                        <Text style={styles.itemNome}>Nº Venda:</Text>
                                                        <Text style={styles.itemNome}>{item.numero_venda}</Text>
                                                    </View>
                                                    <View style={styles.rowBetween}>
                                                        <Text>Data e Hora:</Text>
                                                        <Text>{item.data_hora}</Text>
                                                    </View>
                                                    <View style={styles.rowBetween}>
                                                        <Text>Total:</Text>
                                                        <Text>{formatterbrl(item.valor_total)}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                        )
                                        :
                                        vendasList.map((item, index) => (
                                            <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => {
                                                navigation.navigate('DetalhesVenda', { venda: item })
                                            }}>
                                                <View style={styles.rowBetween}>
                                                    <Text style={styles.itemNome}>Nº Venda:</Text>
                                                    <Text style={styles.itemNome}>{item.numero_venda}</Text>
                                                </View>
                                                <View style={styles.rowBetween}>
                                                    <Text>Data e Hora:</Text>
                                                    <Text>{item.data_hora}</Text>
                                                </View>
                                                <View style={styles.rowBetween}>
                                                    <Text>Total:</Text>
                                                    <Text>{formatterbrl(item.valor_total)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                )
                        )
                    }
                </View>
            </View>
            <ModalSearch
                title="Pesquisar Venda"
                list={vendasList}
                openModal={modalIsOpen}
                fnCloseModal={() => setModalIsOpen(!modalIsOpen)}
                handleFilterSales={fnHandleFilter}
                vendas
            />
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
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
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
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';
import { useRoute } from "@react-navigation/native";

import { formatterbrl } from '../../utils/formatterbrl';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { ButtonImport } from '../../components/Buttons/ButtonImport';
import { ButtonSearch } from '../../components/Buttons/ButtonSearch';
import { ModalSearch } from '../../components/ModalSearch';
import { Loading } from '../../components/Loading'
import { ButtonBack } from '../../components/Buttons/ButtonBack';

export const Produtos = () => {
    const navigation = useNavigation()
    const route = useRoute();

    const [tipoItem, setTipoItem] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [search, setSearch] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const fnHandleFilter = (name, reference) => {
        if (name || reference) {
            const filtered = produtos.filter(item =>
                (!name || item.nome.toLowerCase().includes(name.trim().toLowerCase())) &&
                (!reference || item.cod_produto.includes(reference.trim().toLowerCase()))
            );
            setSearch(filtered);
            setModalIsOpen(!modalIsOpen);

            if (filtered.length == 0)
                setNoResults(true);
            else
                setNoResults(false);
        }
    }

    useEffect(() => {
        buscarProdutos()
    }, [])

    const buscarProdutos = async () => {
        setLoading(true)
        let json = await useApi.listarProdutos()
        setProdutos(json)
        setLoading(false)
    }

    const handleNewProduct = () => {
        navigation.navigate('CadastroDeProdutos')
    }

    const handleClearFilter = () => {
        setSearch([]);
        setNoResults(false);
    }

    /*Ao adicionar, editar ou deletar um produto, será redirecionado para essa tela novamente.
    Esse useEffect atualiza a lista de produtos para exibir corretamente depois da alteração/deleção*/
    useEffect(() => {
        if (route.params?.novoProduto) {
            const novoProduto = route.params.novoProduto;
            setProdutos([...produtos, novoProduto]);
        }

        if (route.params?.produtoAtualizado) {
            const produtoAtualizado = route.params.produtoAtualizado;
            setProdutos(produtos.map(produto => (produto.id === produtoAtualizado.id ? produtoAtualizado : produto)));
        }

        if (route.params?.produtoDeletado) {
            const produtoDeletado = route.params.produtoDeletado;
            const updatedOptions = produtos.filter(item => item.id !== produtoDeletado.id);
            setProdutos(updatedOptions);
        }
    }, [route.params?.novoProduto, route.params?.produtoAtualizado, route.params?.produtoDeletado]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="ListarProdutosServicos" />
                    <Text style={styles.titulo}>Lista Produtos</Text>
                </View>
                <View style={styles.header}>
                    <View style={{ marginRight: 5 }}>
                        <ButtonSearch onPress={() => setModalIsOpen(true)} />
                    </View>
                    <View style={{ marginRight: 5 }}>
                        <ButtonAdd onPress={handleNewProduct} />
                    </View>
                    <ButtonImport />
                </View>
            </View>
            <ScrollView >
                {
                    (search.length > 0 || noResults) && (
                        <TouchableOpacity
                            onPress={handleClearFilter}
                        >
                            <Text style={styles.cleanFilterText}>Limpar filtro</Text>
                        </TouchableOpacity>
                    )
                }
                {loading == true ?
                    (
                        <View >
                            <Loading />
                        </View>
                    )
                    :
                    (
                        !produtos.length > 0 || noResults ?
                            (
                                <View>
                                    <Text>Nenhum resultado para a busca!</Text>
                                </View>
                            )
                            :
                            (
                                search.length > 0 ? (
                                    search.map((item, index) => (
                                        <TouchableOpacity
                                            style={styles.itemContainer}
                                            onPress={() => {
                                                navigation.navigate('DetalhesProduto', { produto: item });
                                            }}
                                            key={index}
                                        >
                                            <Text style={styles.itemNome}>{item.nome}</Text>
                                            <Text style={styles.itemSub}>Referência: {item.cod_produto}</Text>
                                            {item.descricao &&
                                                <Text style={styles.itemSub}>Descrição: {item.descricao}</Text>
                                            }
                                            <Text style={styles.itemSub}>Valor: {formatterbrl(item.valor_venda)}</Text>
                                        </TouchableOpacity>
                                    ))
                                )
                                    :
                                    (
                                        <View style={{ marginBottom: 16 }}>
                                            {produtos.length > 0 &&
                                                produtos.map((item, index) => (
                                                    <TouchableOpacity
                                                        style={styles.itemContainer}
                                                        onPress={() => {
                                                            navigation.navigate('DetalhesProduto', { produto: item });
                                                        }}
                                                        key={index}
                                                    >
                                                        <Text style={styles.itemNome}>{item.nome}</Text>
                                                        <Text style={styles.itemSub}>Referência: {item.cod_produto}</Text>
                                                        {item.descricao &&
                                                            <Text style={styles.itemSub}>Descrição: {item.descricao}</Text>
                                                        }
                                                        <Text style={styles.itemSub}>Valor: {formatterbrl(item.valor_venda)}</Text>
                                                    </TouchableOpacity>
                                                ))}

                                        </View>
                                    )
                            )
                    )
                }
                <ModalSearch
                    title="Pesquisar Produto"
                    list={produtos}
                    openModal={modalIsOpen}
                    fnCloseModal={() => setModalIsOpen(!modalIsOpen)}
                    handleFilterProducts={fnHandleFilter}
                    produtos
                />
            </ScrollView >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
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
    }
});


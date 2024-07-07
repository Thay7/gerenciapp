import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useApi } from '../../Api/useApi';
import { ModalSearch } from '../../components/ModalSearch/index';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { ButtonSearch } from '../../components/Buttons/ButtonSearch';
import { ButtonImport } from '../../components/Buttons/ButtonImport';
import { ButtonBack } from '../../components/Buttons/ButtonBack';
import { Loading } from '../../components/Loading';

export const Estoque = () => {
    const [estoqueList, setEstoqueList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState([]);
    const [noResults, setNoResults] = useState(false);
    
    const route = useRoute();

    useEffect(() => {
        buscarEstoque()
    }, [])

    const buscarEstoque = async () => {
        setLoading(true);
        let json = await useApi.listarEstoque();
        setEstoqueList(json);
        setLoading(false);
    };

    const fnHandleFilter = (name, reference) => {
        if (name || reference) {
            const filtered = estoqueList.filter(item =>
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

    const handleClearFilter = () => {
        setSearch([]);
        setNoResults(false);
    }

    const navigation = useNavigation()

    useEffect(() => {
        if (route.params?.novoEstoque) {
            const novoEstoque = route.params?.novoEstoque;
            console.log(novoEstoque)
            setEstoqueList([...estoqueList, novoEstoque]);
        }

        if (route.params?.estoqueAtualizado) {
            const estoqueAtualizado = route.params?.estoqueAtualizado;
            console.log(estoqueAtualizado)
            setEstoqueList(estoqueList.map(estoque => (estoque.id === estoqueAtualizado.id ? estoqueAtualizado : estoque)));
        }
    }, [route.params?.novoEstoque, route.params?.estoqueAtualizado]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Home" />
                    <Text style={styles.titulo}>Lista Estoque</Text>
                </View>
                <View style={styles.header}>
                    <ButtonSearch onPress={() => setModalIsOpen(true)} />
                    <View style={{ marginLeft: 5 }}>
                        <ButtonAdd
                            onPress={() => {
                                navigation.navigate('EntradaEstoque')
                            }} />
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    (search.length > 0 || noResults) && (
                        <TouchableOpacity onPress={handleClearFilter}>
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
                            noResults || estoqueList.length == 0 ?
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
                                                <TouchableOpacity style={styles.itemContainer} key={index}
                                                    onPress={() => {
                                                        navigation.navigate('DetalhesEstoque', { produto: item });
                                                    }}>
                                                    <Text style={styles.itemNome}>{item.nome}</Text>
                                                    <Text>Referência: {item.cod_produto}</Text>
                                                    <Text>Quantidade: {item.quantidade}</Text>
                                                </TouchableOpacity>
                                            ))
                                        )
                                        :
                                        estoqueList.map((item, index) => (
                                            <TouchableOpacity style={styles.itemContainer} key={index}
                                                onPress={() => {
                                                    navigation.navigate('DetalhesEstoque', { produto: item });
                                                }}>
                                                <Text style={styles.itemNome}>{item.nome}</Text>
                                                <Text>Referência: {item.cod_produto}</Text>
                                                <Text>Quantidade: {item.quantidade}</Text>
                                            </TouchableOpacity>
                                        ))
                                )
                        )
                    }
                </View>
                <ModalSearch
                    title="Pesquisar Estoque"
                    list={estoqueList}
                    openModal={modalIsOpen}
                    fnCloseModal={() => setModalIsOpen(!modalIsOpen)}
                    handleFilterProducts={fnHandleFilter}
                    produtos
                />
            </ScrollView>

        </View>
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
        marginBottom: 8
    },
    titulo: {
        fontSize: 25,
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
    }
});
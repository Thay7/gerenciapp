import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

//import { useApi } from '../../Api/useApi';

import { ButtonAdd } from '../../../components/Buttons/ButtonAdd';
import { ButtonImport } from '../../../components/Buttons/ButtonImport';
import { ButtonSearch } from '../../../components/Buttons/ButtonSearch';
import { ModalSearch } from '../../../components/ModalSearch';

export const ListaCadastros = () => {
    const route = useRoute();
    const { item } = route.params;
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [search, setSearch] = useState([]);

    const [dados, setDados] = useState([]);

    const fnHandleFilter = (name, reference) => {
        if (name || reference) {
            const filtered = dados.filter(item =>
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
        setDados(item.dados)
    }, [])

    // useEffect(() => {
    //     buscarProdutos()
    // }, [])

    // const buscarProdutos = async () => {
    //     setLoading(true)
    //     let json = await useApi.listarProdutos()
    //     setProdutos(json)
    //     setLoading(false)
    // }

    const handleNewProduct = () => {
        navigation.navigate('CadastroDeProdutos')
    }

    const handleClearFilter = () => {
        setSearch([]);
        setNoResults(false);
    }

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Lista {item.nome}</Text>
                    <View style={styles.headerIcons}>
                        <View style={{ marginRight: 5 }}>
                            <ButtonSearch onPress={() => setModalIsOpen(true)} />
                        </View>
                        <View style={{ marginRight: 5 }}>
                            <ButtonAdd onPress={() => navigation.navigate('NovoCadastro', { item: item })} />
                        </View>
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
                {loading == true ?
                    (
                        <View>
                            <Text>Carregando...</Text>
                        </View>
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
                            item.nome == 'Fornecedores' ?
                                (
                                    search.length > 0 ? (
                                        search.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.itemContainer}
                                                onPress={() => {
                                                    navigation.navigate('DetalhesCadastro', { item: item });
                                                }}
                                                key={index}
                                            >
                                                <Text style={styles.itemNome}>{item.nomeFantasia}</Text>
                                                <Text style={styles.itemSub}>CNPJ: {item.cnpj}</Text>
                                                <Text style={styles.itemSub}>Contato: {item.contato}</Text>
                                            </TouchableOpacity>
                                        ))
                                    )
                                        :
                                        (
                                            <View style={{ marginBottom: 16 }}>
                                                {dados.map((item, index) => (
                                                    <TouchableOpacity
                                                        style={styles.itemContainer}
                                                        onPress={() => {
                                                            navigation.navigate('DetalhesCadastro', { item: item });
                                                        }}
                                                        key={index}
                                                    >
                                                        <Text style={styles.itemNome}>{item.nomeFantasia}</Text>
                                                        <Text style={styles.itemSub}>CNPJ: {item.cnpj}</Text>
                                                        <Text style={styles.itemSub}>Contato: {item.contato}</Text>
                                                    </TouchableOpacity>
                                                ))}

                                            </View>
                                        )
                                ) :
                                (
                                    search.length > 0 ? (
                                        search.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.itemContainer}
                                                onPress={() => {
                                                    navigation.navigate('DetalhesCadastro', { item: item });
                                                }}
                                                key={index}
                                            >
                                                <Text style={styles.itemNome}>{item.nome}</Text>
                                                <Text style={styles.itemSub}>Usuário: {item.usuario}</Text>
                                                <Text style={styles.itemSub}>Email: {item.email}</Text>
                                            </TouchableOpacity>
                                        ))
                                    )
                                        :
                                        (
                                            <View style={{ marginBottom: 16 }}>
                                                {dados.map((item, index) => (
                                                    <TouchableOpacity
                                                        style={styles.itemContainer}
                                                        onPress={() => {
                                                            navigation.navigate('DetalhesCadastro', { item: item });
                                                        }}
                                                        key={index}
                                                    >
                                                        <Text style={styles.itemNome}>{item.nome}</Text>
                                                        <Text style={styles.itemSub}>Usuário: {item.usuario}</Text>
                                                        <Text style={styles.itemSub}>Email: {item.email}</Text>
                                                    </TouchableOpacity>
                                                ))}

                                            </View>
                                        )
                                )
                    )
                }
            </View >
            <ModalSearch
                title="Pesquisar Produto"
                list={dados}
                openModal={modalIsOpen}
                fnCloseModal={() => setModalIsOpen(!modalIsOpen)}
                handleFilterProducts={fnHandleFilter}
                produtos
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
    headerIcons: {
        display: 'flex',
        flexDirection: 'row',
    },
    cleanFilterText: {
        color: 'red',
        alignSelf: 'flex-end',
        marginBottom: 5
    }
});
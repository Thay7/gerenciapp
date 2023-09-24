import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';

import { formatterbrl } from '../../utils/formatterbrl';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { ButtonImport } from '../../components/Buttons/ButtonImport';
import { ButtonSearch } from '../../components/Buttons/ButtonSearch';
import { ModalSearch } from '../../components/ModalSearch';

export const Produtos = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [search, setSearch] = useState([]);
    const [produtos, setProdutos] = useState([
        { produto_id: 1, produto_nome: 'Aro', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 2, produto_nome: 'Pneu Moto', produto_referencia: '1686822', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 3, produto_nome: 'Oléo X', produto_referencia: '1686822', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 4, produto_nome: 'Retrovisor Biz', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 5, produto_nome: 'Amortecedor Motocicleta (Par)', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 6, produto_nome: 'Pneu Carro', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 7, produto_nome: 'Pisca (Par)', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 8, produto_nome: 'Punho Moto', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 9, produto_nome: 'Interruptor Pisca', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 10, produto_nome: 'Aro', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 11, produto_nome: 'Pneu Moto', produto_referencia: '1686822', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 12, produto_nome: 'Oléo X', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 13, produto_nome: 'Retrovisor Biz', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 14, produto_nome: 'Amortecedor Motocicleta (Par)', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 15, produto_nome: 'Pneu Carro', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 16, produto_nome: 'Pisca (Par)', produto_referencia: '1686825', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 17, produto_nome: 'Punho Moto', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
        { produto_id: 18, produto_nome: 'Interruptor Pisca', produto_referencia: '1686821', produto_descricao: 'descrição do produto', produto_marca: 'marca x', produto_valorCompra: 10, produto_valorVenda: 25 },
    ]);

    const fnHandleFilter = (name, reference) => {
        if (name || reference) {
            const filtered = produtos.filter(item =>
                (!name || item.produto_nome.toLowerCase().includes(name.trim().toLowerCase())) &&
                (!reference || item.produto_referencia.includes(reference.trim().toLowerCase()))
            );
            setSearch(filtered);
            setModalIsOpen(!modalIsOpen);

            if (filtered.length == 0)
                setNoResults(true);
            else
                setNoResults(false);
        }
    }
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
                    <Text style={styles.titulo}>Lista Produtos</Text>
                    <View style={styles.headerIcons}>
                        <View style={{ marginRight: 5 }}>
                            <ButtonSearch onPress={() => setModalIsOpen(true)} />
                        </View>
                        <View style={{ marginRight: 5 }}>
                            <ButtonAdd onPress={handleNewProduct} />
                        </View>
                        <ButtonImport />
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
                                            <Text style={styles.itemNome}>{item.produto_nome}</Text>
                                            <Text style={styles.itemSub}>Referência: {item.produto_referencia}</Text>
                                            {item.produto_descricao &&
                                                <Text style={styles.itemSub}>Descrição: {item.produto_descricao}</Text>
                                            }
                                            <Text style={styles.itemSub}>Valor: {formatterbrl(item.produto_valorVenda)}</Text>
                                        </TouchableOpacity>
                                    ))
                                )
                                    :
                                    (
                                        <View style={{ marginBottom: 16 }}>
                                            {produtos.map((item, index) => (
                                                <TouchableOpacity
                                                    style={styles.itemContainer}
                                                    onPress={() => {
                                                        navigation.navigate('DetalhesProduto', { produto: item });
                                                    }}
                                                    key={index}
                                                >
                                                    <Text style={styles.itemNome}>{item.produto_nome}</Text>
                                                    <Text style={styles.itemSub}>Referência: {item.produto_referencia}</Text>
                                                    {item.produto_descricao &&
                                                        <Text style={styles.itemSub}>Descrição: {item.produto_descricao}</Text>
                                                    }
                                                    <Text style={styles.itemSub}>Valor: {formatterbrl(item.produto_valorVenda)}</Text>
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
                list={produtos}
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
        fontSize: 35,
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


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ModalSearch } from '../../components/ModalSearch/index';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { ButtonSearch } from '../../components/Buttons/ButtonSearch';
import { formatterbrl } from '../../utils/formatterbrl';

export const Vendas = () => {
    const [vendasList, setVendasList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        listaEstoque()
    }, []);

    const listaEstoque = async () => {
        setLoading(true)
        //let json = await useApi.listarEstoque()
        //setEstoqueList(json)
        setVendasList([
            {
                numeroVenda: '012023',
                itens: [
                    { nome: 'Oléo Mobil', valor: '12', quantidade: '1' }, { nome: 'Troca de Óleo', valor: '10' }
                ],
                formaDePagamento: 'Cartão de Crédito',
                numeroParcelas: '1',
                valorTotal: '22',
                dataHora: '10/09/2023 14:20'
            },
            {
                numeroVenda: '022023',
                itens: [{ nome: 'Cabo de Freio', valor: '12', quantidade: '2' },
                { nome: 'Remendo Pneu Moto', valor: '10' }],
                formaDePagamento: 'Pix',
                valorTotal: '34',
                dataHora: '10/09/2023 14:00'
            },
        ])
        setLoading(false)
    }

    const fnHandleFilter = (number, value, dateHour) => {
        if (number || value || dateHour) {
            const filtered = vendasList.filter(item =>
                (!number || item.numeroVenda.includes(number.trim())) &&
                (!value || item.valorTotal.includes(value.trim())) &&
                (!dateHour || item.dataHora.includes(dateHour.trim()))
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
                                    search.length > 0 ?
                                        (
                                            search.map((item, index) => (
                                                <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => {
                                                    navigation.navigate('DetalhesVenda', { venda: item })
                                                }}>
                                                    <View style={styles.rowBetween}>
                                                        <Text style={styles.itemNome}>Nº Venda:</Text>
                                                        <Text style={styles.itemNome}>{item.numeroVenda}</Text>
                                                    </View>
                                                    <View style={styles.rowBetween}>
                                                        <Text>Data e Hora:</Text>
                                                        <Text>{item.dataHora}</Text>
                                                    </View>
                                                    <View style={styles.rowBetween}>
                                                        <Text>Total Compra:</Text>
                                                        <Text>{formatterbrl(item.valorTotal)}</Text>
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
                                                    <Text style={styles.itemNome}>{item.numeroVenda}</Text>
                                                </View>
                                                <View style={styles.rowBetween}>
                                                    <Text>Data e Hora:</Text>
                                                    <Text>{item.dataHora}</Text>
                                                </View>
                                                <View style={styles.rowBetween}>
                                                    <Text>Total Compra:</Text>
                                                    <Text>{formatterbrl(item.valorTotal)}</Text>
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
        fontSize: 35,
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
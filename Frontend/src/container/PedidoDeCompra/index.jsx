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

export const PedidoDeCompra = () => {
    const [comprasList, setComprasList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        listaCompras()
    }, []);

    const listaCompras = async () => {
        setLoading(true)
        //let json = await useApi.listarEstoque()
        //setEstoqueList(json)
        setComprasList([
            {
                numeroCompra: '012023',
                itens: [
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                    { nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                    { nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                    { nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                    { nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },


                ],
                fornecedor: {
                    id: 1,
                    nomeFantasia: 'AutoPeças Master',
                    razaoSocial: 'Master Autopeças Ltda',
                    cnpj: '12.345.678/0001-90',
                    contato: '(84) 9 9999-9991'
                },
                formaDePagamento: 'Boleto',
                numeroParcelas: '1',
                valorTotal: '230',
                dataHora: '10/09/2023 14:20',
                status: 'Efetuado'
            },
            {
                numeroCompra: '022023',
                itens: [
                    { nome: 'Cabo de Freio', valor: '50', quantidade: '2' },
                    { nome: 'Pneu Moto', valor: '100', quantidade: '2' }
                ],
                fornecedor: {
                    id: 2,
                    nomeFantasia: 'MecânicaParts',
                    razaoSocial: 'Mecânica Parts Distribuidora de Peças Automotivas EIRELI',
                    cnpj: '98.765.432/0001-21',
                    contato: '(84) 9 9999-9992'
                },
                formaDePagamento: 'Pix',
                numeroParcelas: '1',
                valorTotal: '34',
                dataHora: '10/09/2023 14:00',
                status: 'Recebido'
            },
        ])
        setLoading(false)
    }

    const fnHandleFilter = (number, value, dateHour) => {
        if (number || value || dateHour) {
            const filtered = comprasList.filter(item =>
                (!number || item.numeroCompra.includes(number.trim())) &&
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
                    <Text style={styles.titulo}>Pedido de Compra</Text>
                    <View style={styles.headerIcons}>
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
                                                    navigation.navigate('DetalhesPedidoCompra', { pedidocompra: item })
                                                }}>
                                                    <View style={styles.rowBetween}>
                                                        <Text style={styles.itemNome}>Nº Pedido:</Text>
                                                        <Text style={styles.itemNome}>{item.numeroCompra}</Text>
                                                    </View>
                                                    <View style={styles.rowBetween}>
                                                        <Text>Data e Hora:</Text>
                                                        <Text>{item.dataHora}</Text>
                                                    </View>
                                                    <View style={styles.rowBetween}>
                                                        <Text>Total:</Text>
                                                        <Text>{formatterbrl(item.valorTotal)}</Text>
                                                    </View>
                                                    <View style={[styles.rowBetween, { marginTop: 8 }]}>
                                                        <Text style={styles.itemNome}>Status:</Text>
                                                        <Text style={[styles.itemNome, { color: '#4040ff' }]}>{item.status}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                        )
                                        :
                                        comprasList.map((item, index) => (
                                            <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => {
                                                navigation.navigate('DetalhesPedidoCompra', { pedidocompra: item })
                                            }}>
                                                <View style={styles.rowBetween}>
                                                    <Text style={styles.itemNome}>Nº Pedido:</Text>
                                                    <Text style={styles.itemNome}>{item.numeroCompra}</Text>
                                                </View>
                                                <View style={styles.rowBetween}>
                                                    <Text>Data e Hora:</Text>
                                                    <Text>{item.dataHora}</Text>
                                                </View>
                                                <View style={styles.rowBetween}>
                                                    <Text>Total:</Text>
                                                    <Text>{formatterbrl(item.valorTotal)}</Text>
                                                </View>
                                                <View style={[styles.rowBetween, { marginTop: 8 }]}>
                                                    <Text style={styles.itemNome}>Status:</Text>
                                                    <Text style={[styles.itemNome, { color: item.status == 'Efetuado' ? '#4040ff' : 'green' }]}>{item.status}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                )
                        )
                    }
                </View>
            </View>
            <ModalSearch
                title="Pesquisar Pedido Compra"
                list={comprasList}
                openModal={modalIsOpen}
                fnCloseModal={() => setModalIsOpen(!modalIsOpen)}
                handleFilterSales={fnHandleFilter}
                pedidocompra
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
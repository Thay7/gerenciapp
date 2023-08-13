import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ModalSearch } from '../../components/ModalSearch/index';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { ButtonSearch } from '../../components/Buttons/ButtonSearch';

export const Estoque = () => {
    const [estoqueList, setEstoqueList] = useState([]);
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
        setEstoqueList([
            { nome: 'Aro', referencia: '1686821', quantidade: 23 },
            { nome: 'Pneu Moto', referencia: '1686822', quantidade: 15 },
            { nome: 'Oléo X', referencia: '1686822', quantidade: 26 },
            { nome: 'Retrovisor Biz', referencia: '1686821', quantidade: 3 },
            { nome: 'Amortecedor Motocicleta (Par)', referencia: '1686821', quantidade: 8 },
            { nome: 'Pneu Carro', referencia: '1686821', quantidade: 5 },
            { nome: 'Pisca (Par)', referencia: '1686821', quantidade: 6 },
            { nome: 'Punho Moto', referencia: '1686821', quantidade: 7 },
            { nome: 'Interruptor Pisca', referencia: '1686821', quantidade: 9 },
            { nome: 'Aro', referencia: '1686821', quantidade: 23 },
            { nome: 'Pneu Moto', referencia: '1686822', quantidade: 15 },
            { nome: 'Oléo X', referencia: '1686821', quantidade: 26 },
            { nome: 'Retrovisor Biz', referencia: '1686821', quantidade: 3 },
            { nome: 'Amortecedor Motocicleta (Par)', referencia: '1686821', quantidade: 8 },
            { nome: 'Pneu Carro', referencia: '1686821', quantidade: 5 },
            { nome: 'Pisca (Par)', referencia: '1686825', quantidade: 6 },
            { nome: 'Punho Moto', referencia: '1686821', quantidade: 7 },
            { nome: 'Interruptor Pisca', referencia: '1686821', quantidade: 9 },
        ])
        setLoading(false)
    }

    const fnHandleFilter = (name, reference) => {
        if (name || reference) {
            const filtered = estoqueList.filter(item =>
                (!name || item.nome.toLowerCase().includes(name.trim().toLowerCase())) &&
                (!reference || item.referencia.includes(reference.trim().toLowerCase()))
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
                    <Text style={styles.titulo}>Lista Estoque</Text>
                    <View style={styles.headerIcons}>
                        <View style={{ marginRight: 5 }}>
                            <ButtonSearch
                                onPress={() => setModalIsOpen(true)}
                            />
                        </View>
                        <ButtonAdd
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
                                                <View style={styles.itemContainer} key={index}>
                                                    <Text style={styles.itemNome}>{item.nome}</Text>
                                                    <Text>Quantidade: {item.quantidade}</Text>
                                                </View>
                                            ))
                                        )
                                        :
                                        estoqueList.map((item, index) => (
                                            <View style={styles.itemContainer} key={index}>
                                                <Text style={styles.itemNome}>{item.nome}</Text>
                                                <Text>Quantidade: {item.quantidade}</Text>
                                            </View>
                                        ))
                                )
                        )
                    }
                </View>
            </View>
            <ModalSearch
                title="Pesquisar Produto"
                list={estoqueList}
                openModal={modalIsOpen}
                fnCloseModal={() => setModalIsOpen(!modalIsOpen)}
                handleFilter={fnHandleFilter}
            />
        </ScrollView>
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
    }
});
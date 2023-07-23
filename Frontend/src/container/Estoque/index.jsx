import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ModalSearch } from '../../components/ModalSearch/index';

export const Estoque = () => {
    const [estoque, setEstoque] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        listaEstoque()
    }, []);

    const listaEstoque = async () => {
        setLoading(true)
        //let json = await useApi.listarEstoque()
        //setEstoque(json)
        setEstoque([
            { nome: 'Aro', referencia: '1686821', quantidade: 23 },
            { nome: 'Pneu Moto', referencia: '1686822', quantidade: 15 },
            { nome: 'Oléo X', referencia: '1686821', quantidade: 26 },
            { nome: 'Retrovisor Biz', referencia: '1686821', quantidade: 3 },
            { nome: 'Amortecedor Motocicleta (Par)', referencia: '1686821', quantidade: 8 },
            { nome: 'Pneu Carro', referencia: '1686821', quantidade: 5 },
            { nome: 'Pisca (Par)', referencia: '1686821', quantidade: 6 },
            { nome: 'Punho Moto', referencia: '1686821', quantidade: 7 },
            { nome: 'Interruptor Pisca', referencia: '1686821', quantidade: 9 },
        ])
        setLoading(false)
    }

    const handleFilter = (name, reference) => {
        if (name || reference) {
            const filtered = estoque.filter(item =>
                (!name || item.nome.toLowerCase().includes(name.toLowerCase())) &&
                (!reference || item.referencia.includes(reference))
            );
            setSearch(filtered);
            setModalIsOpen(!modalIsOpen);
        }
    };

    const handleSearch = () => {
        setModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setModalIsOpen(!modalIsOpen)
        setSearch([]);
    }

    const navigation = useNavigation()

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Lista Estoque</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity
                            onPress={handleSearch}>
                            <Icon
                                name="search"
                                size={25}
                                marginHorizontal={8}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                name="plus"
                                size={25}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 16 }}>
                    {loading == true ?
                        (
                            <View>
                                <Text>Carregando...</Text>
                            </View>
                        )
                        :
                        (
                            search.length > 0 ? (
                                search.map((item, index) => (
                                    <View style={styles.itemContainer} key={index}>
                                        <Text style={styles.itemNome}>{item.nome}</Text>
                                        <Text>Quantidade: {item.quantidade}</Text>
                                    </View>
                                ))
                            )
                                :
                                estoque.map((item, index) => (
                                    <View style={styles.itemContainer} key={index}>
                                        <Text style={styles.itemNome}>{item.nome}</Text>
                                        <Text>Quantidade: {item.quantidade}</Text>
                                    </View>
                                ))
                        )
                    }
                </View>
                <ModalSearch
                    title="Pesquisar Produto no Estoque"
                    list={estoque}
                    openModal={modalIsOpen}
                    fnCloseModal={handleCloseModal}
                    handleFilter={handleFilter}
                />
            </View>
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
        fontSize: 40,
        fontWeight: 'bold',
    },
    headerIcons: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    icon: {
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10
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
        elevation: 1, // Adicione esta propriedade para suporte a Android
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
});
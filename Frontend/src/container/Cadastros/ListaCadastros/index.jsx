import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

import { ButtonAdd } from '../../../components/Buttons/ButtonAdd';
import { ButtonSearch } from '../../../components/Buttons/ButtonSearch';
import { ModalSearch } from '../../../components/ModalSearch';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';

export const ListaCadastros = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { item } = route.params;

    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [search, setSearch] = useState([]);
    const [dados, setDados] = useState([]);
    const [nome, setNome] = useState();

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
        setDados(item.dados);
        setNome(item.nome);
    }, []);

    /*Ao adicionar, editar ou deletar um usuario/fornecedor, será redirecionado para essa tela novamente.
    Esse useEffect atualiza a lista de usuarios/fornecedors para exibir corretamente depois da alteração/deleção*/
    useEffect(() => {
        //Fornecedor
        if (route.params?.novoFornecedor) {
            const novoFornecedor = route.params?.novoFornecedor;
            setDados([...dados, novoFornecedor]);
        }
        if (route.params?.fornecedorAtualizado) {
            const fornecedorAtualizado = route.params?.fornecedorAtualizado;
            setDados(dados.map(fornecedor => (fornecedor.id === fornecedorAtualizado.id ? fornecedorAtualizado : fornecedor)));
            setNome('Usuários');
        }

        if (route.params?.fornecedorDeletado) {
            const fornecedorDeletado = route.params.fornecedorDeletado;
            const updatedData = dados.filter(item => item.id !== fornecedorDeletado.id);
            setDados(updatedData);
        }

        //Usuário
        if (route.params?.novoUsuario) {
            const novoUsuario = route.params.novoUsuario;
            setDados([...dados, novoUsuario]);
        }

        if (route.params?.usuarioAtualizado) {
            const usuarioAtualizado = route.params?.usuarioAtualizado;
            setDados(dados.map(usuario => (usuario.id === usuarioAtualizado.id ? usuarioAtualizado : usuario)));
            setNome('Fornecedores');
        }

        if (route.params?.usuarioDeletado) {
            const usuarioDeletado = route.params.usuarioDeletado;
            const updatedData = dados.filter(item => item.id !== usuarioDeletado.id);
            setDados(updatedData);
        }

        //Movimento caixa
        if (route.params?.novoMovimentoCaixa) {
            const novoMovimentoCaixa = route.params.novoMovimentoCaixa;
            setDados([...dados, novoMovimentoCaixa]);
        }

        if (route.params?.movimentoCaixaAtualizado) {
            const movimentoCaixaAtualizado = route.params?.movimentoCaixaAtualizado;
            setDados(dados.map(movCaixa => (movCaixa.id === movimentoCaixaAtualizado.id ? movimentoCaixaAtualizado : movCaixa)));
            setNome('Movimento Caixa');
        }

        if (route.params?.movimentoCaixaDeletado) {
            const movimentoCaixaDeletado = route.params.movimentoCaixaDeletado;
            const updatedData = dados.filter(item => item.id !== movimentoCaixaDeletado.id);
            setDados(updatedData);
        }
    }, [route.params?.novoFornecedor, route.params?.fornecedorAtualizado, route.params?.fornecedorDeletado,
    route.params?.novoUsuario, route.params?.usuarioAtualizado, route.params?.usuarioDeletado,
    route.params?.novoMovimentoCaixa, route.params?.movimentoCaixaAtualizado, route.params?.movimentoCaixaDeletado,]);

    const handleClearFilter = () => {
        setSearch([]);
        setNoResults(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Cadastros" />
                    <Text style={styles.titulo}>{nome}</Text>
                </View>
                <View style={styles.header}>
                    <View style={{ marginRight: 5 }}>
                        <ButtonSearch onPress={() => setModalIsOpen(true)} />
                    </View>
                    <View style={{ marginRight: 5 }}>
                        <ButtonAdd onPress={() => navigation.navigate('NovoCadastro', { item: item })} />
                    </View>
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
                            <View>
                                 {nome === 'Fornecedores' && (
                                search.length > 0 ? (
                                    search.map((item, index) => (
                                        <TouchableOpacity
                                            style={styles.itemContainer}
                                            onPress={() => navigation.navigate('DetalhesCadastro', { item })}
                                            key={index}
                                        >
                                            <Text style={styles.itemNome}>{item.nome_fantasia}</Text>
                                            <Text style={styles.itemSub}>CNPJ: {item.cnpj}</Text>
                                            <Text style={styles.itemSub}>Contato: {item.contato}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <View style={{ marginBottom: 16 }}>
                                        {dados.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.itemContainer}
                                                onPress={() => navigation.navigate('DetalhesCadastro', { item })}
                                                key={index}
                                            >
                                                <Text style={styles.itemNome}>{item.nome_fantasia}</Text>
                                                <Text style={styles.itemSub}>CNPJ: {item.cnpj}</Text>
                                                <Text style={styles.itemSub}>Contato: {item.contato}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )
                            )}
                            {nome === 'Usuários' && (
                                search.length > 0 ? (
                                    search.map((item, index) => (
                                        <TouchableOpacity
                                            style={styles.itemContainer}
                                            onPress={() => navigation.navigate('DetalhesCadastro', { item })}
                                            key={index}
                                        >
                                            <Text style={styles.itemNome}>{item.nome}</Text>
                                            <Text style={styles.itemSub}>Usuário: {item.usuario}</Text>
                                            <Text style={styles.itemSub}>Email: {item.email}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <View style={{ marginBottom: 16 }}>
                                        {dados.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.itemContainer}
                                                onPress={() => navigation.navigate('DetalhesCadastro', { item })}
                                                key={index}
                                            >
                                                <Text style={styles.itemNome}>{item.nome}</Text>
                                                <Text style={styles.itemSub}>Usuário: {item.usuario}</Text>
                                                <Text style={styles.itemSub}>Email: {item.email}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )
                            )}
                            {nome === 'Movimento Caixa' && (
                                search.length > 0 ? (
                                    search.map((item, index) => (
                                        <TouchableOpacity
                                            style={styles.itemContainer}
                                            onPress={() => navigation.navigate('DetalhesCadastro', { item })}
                                            key={index}
                                        >
                                            <Text style={styles.itemNome}>{item.tipo}</Text>
                                            <Text style={styles.itemSub}>Descrição: {item.descricao}</Text>
                                            <Text style={styles.itemSub}>Valor: {item.valor}</Text>
                                            <Text style={styles.itemSub}>Data/Hora: {item.data_hora}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <View style={{ marginBottom: 16 }}>
                                        {dados.map((item, index) => (
                                            <TouchableOpacity
                                                style={styles.itemContainer}
                                                onPress={() => navigation.navigate('DetalhesCadastro', { item })}
                                                key={index}
                                            >
                                                <Text style={styles.itemNome}>{item.tipo}</Text>
                                                <Text style={styles.itemSub}>Descrição: {item.descricao}</Text>
                                                <Text style={styles.itemSub}>Valor: {item.valor}</Text>
                                                <Text style={styles.itemSub}>Data/Hora: {item.data_hora}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )
                            )}
                            </View>
                    )
                }
                <ModalSearch
                    title={`Pesquisar ${nome}`}
                    list={dados}
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
        marginBottom: 8
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemSub: {
        fontSize: 16,
        color: '#666'
    },
    cleanFilterText: {
        color: 'red',
        alignSelf: 'flex-end',
        marginBottom: 5
    }
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useApi } from '../../../Api/useApi';
import { formatterdate } from '../../../utils/formatterdate'
import { Loading } from '../../../components/Loading';
import { InputApp } from '../../../components/InputApp';
import { useRoute } from "@react-navigation/native";
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';

export const DetalhesEstoque = () => {
    const [enable, setEnable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [messageError, setMessageError] = useState('');

    const navigation = useNavigation()

    const route = useRoute();
    const { produto } = route.params;

    const [objProdutoEstoque, setObjProdutoEstoque] = useState({
        id: produto.id,
        nome: produto.nome,
        cod_produto: produto.cod_produto,
        quantidade: produto.quantidade
    });

    const [modalErrors, setModalErrors] = useState(false);
    const handleInputChange = (name, value) => {
        setObjProdutoEstoque({ ...objProdutoEstoque, [name]: value })
    }

    useEffect(() => {
        const dataHoraAtual = new Date();
        setObjProdutoEstoque(prevState => ({
            ...prevState,
            data_hora: formatterdate(dataHoraAtual)
        }));
    }, [fnEditarEstoque]);

    const fnEditarEstoque = async () => {
        setLoading(true)

        if (await useApi.editarEstoque(objProdutoEstoque) == 200) {
            setModalSucess(true);
            setEnable(false);
            setTimeout(() => {
                navigation.navigate('Estoque', { estoqueAtualizado: objProdutoEstoque });
            }, 3000);
        } else {
            setTitleModal('Erro')
            setMessageError('Erro ao editar estoque.');
            setModalErrors(true);
            setTimeout(() => {
                navigation.navigate('Estoque');
            }, 3000);
        }
        setLoading(false);
    };

    const handleSalve = () => {
        if (objProdutoEstoque.nome != '' && objProdutoEstoque.cod_produto != '' && objProdutoEstoque.quantidade != '') {
            fnEditarEstoque();
        }
        else {
            setModalErrors(true);
            setMessageError('Preencha todos os campos obrigatórios.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Estoque" />
                    <Text style={styles.titulo}>Detalhes Estoque</Text>
                </View>
                <View style={styles.header}>
                    {!enable &&
                        <ButtonEdit onPress={() => setEnable(true)} />
                    }
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View >
                    {loading ? <Loading /> : (
                        <>
                            <InputApp
                                title="Nome *"
                                editable={false}
                                value={objProdutoEstoque.nome}
                                fullWidth
                                borderRadius={10}
                                marginBottom
                                onChangeText={(text) => handleInputChange("nome", text)}
                            />
                            <InputApp
                                title="Referência *"
                                editable={false}
                                value={objProdutoEstoque.cod_produto.toString()}
                                fullWidth
                                borderRadius={10}
                                marginBottom
                                keyboardType="numeric"
                                onChangeText={(text) => handleInputChange("cod_produto", text)}
                            />
                            <InputApp
                                title="Quantidade *"
                                editable={false}
                                value={objProdutoEstoque.quantidade.toString()}
                                fullWidth
                                borderRadius={10}
                                marginBottom
                                keyboardType="numeric"
                                onChangeText={(text) => handleInputChange("quantidade", text)}
                            />
                            {enable &&
                                <>
                                    <ButtonApp
                                        title="Salvar"
                                        color="#fff"
                                        backgroundColor="#4040ff"
                                        onPress={() => handleSalve()}
                                    />
                                    <ButtonApp
                                        title="Cancelar"
                                        color="#FF0000"
                                        onPress={() => setEnable(false)}
                                    />
                                </>
                            }
                        </>
                    )}
                </View>
                <ModalErrors
                    title="Aviso"
                    message={messageError}
                    openModal={modalErrors}
                    fnCloseModal={() => setModalErrors(!modalErrors)}
                />
                <ModalSucces
                    title="Sucesso"
                    message="Estoque editado com sucesso."
                    openModal={modalSucess}
                    fnCloseModal={() => setModalSucess(!modalSucess)}
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
        marginBottom: 10,
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
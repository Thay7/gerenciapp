import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useApi } from '../../../Api/useApi';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { InputApp } from '../../../components/InputApp';
import { InputSelectProductsEstoque } from '../../../components/InputSelectProductsEstoque';
import { formatterdate } from '../../../utils/formatterdate';
import { Loading } from '../../../components/Loading';

export const EntradaEstoque = () => {
    const navigation = useNavigation()

    useEffect(() => {
        buscarProdutos();
    }, []);

    const buscarProdutos = async () => {
        let json = await useApi.listarProdutosSemEstoque();
        setOptionsItens(json);
    };

    //Lidar com o produto selecionado
    const [optionsProducts, setOptionsItens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [messageError, setMessageError] = useState('');

    const [modalErrors, setModalErrors] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    //Obj a ser enviado para o back
    const [objEstoque, setObjEstoque] = useState({
        id_produto: '',
        quantidade: '',
        data_hora: ''
    });

    const handleInputChange = (name, value) => {
        setObjEstoque({ ...objEstoque, [name]: value })
    };

    //Onchange do select do produto
    const handleOnValueChange = (value) => {
        setSelectedProduct(value);
        handleInputChange("id_produto", value.id)
    };

    const handleEntradaEstoque = async () => {
        setLoading(true)
        if (await useApi.entradaEstoque(objEstoque) == 200) {
            setModalSucess(true);
            setTimeout(() => {
                navigation.navigate('Estoque', {
                    novoEstoque: objEstoque
                });
            }, 3000);
        } else {
            setMessageError('Erro ao dar entrada no estoque. Entre em contato com o suporte.');
            setModalErrors(true);
            setTimeout(() => {
                navigation.navigate('Estoque');
            }, 3000);
        }
        setLoading(false);
    }

    useEffect(() => {
        const dataHoraAtual = new Date();
        setObjEstoque(prevState => ({
            ...prevState,
            data_hora: formatterdate(dataHoraAtual)
        }));
    }, [handleSubmit]);

    const handleSubmit = async () => {
        if (objEstoque.id_produto != '' && objEstoque.quantidade != '') {
            handleEntradaEstoque();
        }
        else {
            setMessageError('Preencha todos os campos obrigatórios.');
            setModalErrors(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonBack navigate="Estoque" />
                <Text style={styles.titulo}>Entrada Estoque</Text>
            </View>
            <ScrollView >
                {loading && <Loading />}
                <View>
                    <InputSelectProductsEstoque
                        title="Produto"
                        options={optionsProducts}
                        selectedValue={selectedProduct}
                        onValueChange={(value) => handleOnValueChange(value)}
                    />
                    <InputApp
                        title="Quantidade"
                        fullWidth
                        multiline={true}
                        value={objEstoque.quantidade}
                        marginBottom={true}
                        borderRadius={10}
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("quantidade", text)}
                    />
                    <ButtonApp
                        title="Salvar"
                        color="#FFF"
                        backgroundColor="#4040ff"
                        onPress={handleSubmit}
                    />
                </View>
                <ModalErrors
                    title="Aviso"
                    message={messageError}
                    openModal={modalErrors}
                    fnCloseModal={() => setModalErrors(!modalErrors)}
                />
                <ModalSucces
                    title="Sucesso"
                    message="Entrada de estoque realizada com sucesso!"
                    openModal={modalSucess}
                    fnCloseModal={() => setModalSucess(!modalSucess)}
                />
            </ScrollView>
        </View >
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
        marginBottom: 16
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    }
});


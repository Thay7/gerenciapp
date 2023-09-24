import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { InputApp } from '../../../components/InputApp';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { useApi } from '../../../Api/useApi';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { InputSelectProductsEstoque } from '../../../components/InputSelectProductsEstoque';

export const EntradaEstoque = () => {
    //Lidar com o produto selecionado
    const [optionsProducts, setOptionsItens] = useState(
        [
            { id: '1', nome: 'Oléo Mobil', valor: '10', tipo: "Produto" },
            { id: '2', nome: 'Oléo Dulub', valor: '12', tipo: "Produto" },
            { id: '3', nome: 'Rolamento', valor: '12', tipo: "Produto" },
            { id: '4', nome: 'Viseira', valor: '12', tipo: "Produto" },
            { id: '5', nome: 'Luz Pisca - Biz', valor: '12', tipo: "Produto" },
            { id: '6', nome: 'Cabo de Freio', valor: '12', tipo: "Produto" },
            { id: '7', nome: 'Troca de Oléo', valor: '12', tipo: "Serviço" },
            { id: '8', nome: 'Remendo Pneu Moto', valor: '12', tipo: "Serviço" },
            { id: '9', nome: 'Remendo Pneu Carro', valor: '12', tipo: "Serviço" }
        ]
    );

    const [modalErrors, setModalErrors] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    //Obj a ser enviado para o back
    const [objEstoque, setObjEstoque] = useState({
        produto_id: '',
        produto_quantidade: '',
    })

    const handleInputChange = (name, value) => {
        if (name === "produto_valorCompra" || name === "produto_valorVenda") {
            if (value.includes(',') || value.includes('.')) {
                value = value.replace(",", ".");
            }
        }
        setObjEstoque({ ...objEstoque, [name]: value })
    }

    //Onchange do select do produto
    const handleOnValueChange = (value) => {
        setSelectedProduct(value);
        handleInputChange("produto_id", selectedProduct.id)
    };

    const handleSubmit = async () => {
        if (objEstoque.produto_id != '' && objEstoque.produto_quantidade != '') {
            console.log('nome valor compra e valor venda ta preenchido');
        }
        else {
            setModalErrors(true);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Entrada de Estoque</Text>
                </View>
                <View>
                    <InputSelectProductsEstoque
                        title="Produto"
                        options={optionsProducts}
                        selectedValue={selectedProduct}
                        onValueChange={(value) => handleOnValueChange(value)}
                    />
                    <InputApp
                        title="Quantidade *"
                        fullWidth
                        multiline={true}
                        value={objEstoque.produto_quantidade}
                        marginBottom={true}
                        borderRadius={10}
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("produto_quantidade", text)}
                    />
                    <ButtonApp
                        title="Salvar"
                        color="#FFF"
                        backgroundColor="#4040ff"
                        onPress={handleSubmit}
                    />
                </View>
                <ModalErrors
                    title="Erro"
                    message="Preencha todos os campos obrigatórios."
                    openModal={modalErrors}
                    fnCloseModal={() => setModalErrors(!modalErrors)}
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
    }
});


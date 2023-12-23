import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

//import { useApi } from '../../Api/useApi';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { InputApp } from '../../../components/InputApp';
import { useRoute } from "@react-navigation/native";
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { ModalErrors } from '../../../components/ModalErrors';

export const DetalhesEstoque = () => {
    const [enable, setEnable] = useState(false);
    const route = useRoute();

    const { produto } = route.params;

    const [objProdutoEstoque, setObjProdutoEstoque] = useState({
        nome: produto.nome,
        referencia: produto.referencia,
        quantidade: produto.quantidade
    });

    const [modalErrors, setModalErrors] = useState(false);
    const handleInputChange = (name, value) => {
        setObjProdutoEstoque({ ...objProdutoEstoque, [name]: value })
    }

    const handleSalve = () => {
        if (objProdutoEstoque.nome != '' && objProdutoEstoque.referencia != '' && objProdutoEstoque.quantidade != '') {
            console.log('todos preenchidos')
        }
        else {
            setModalErrors(true);
        }
    };

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Detalhes Estoque</Text>
                    {!enable &&
                        <ButtonEdit onPress={() => setEnable(true)} />
                    }
                </View>
                <View >
                    <InputApp
                        title="Nome *"
                        editable={enable}
                        value={objProdutoEstoque.nome}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                        onChangeText={(text) => handleInputChange("nome", text)}
                    />
                    <InputApp
                        title="Referência *"
                        editable={enable}
                        value={objProdutoEstoque.referencia}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("referencia", text)}
                    />
                    <InputApp
                        title="Quantidade *"
                        editable={enable}
                        value={objProdutoEstoque.quantidade.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("quantidade", text)}
                    />
                    {enable &&
                        <ButtonApp
                            title="Salvar"
                            color="#fff"
                            backgroundColor="#4040ff"
                            onPress={() => handleSalve()}
                        />
                    }
                </View>
                <ModalErrors
                    title="Aviso"
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
    }
});
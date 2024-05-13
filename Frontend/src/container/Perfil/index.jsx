import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

import { useApi } from '../../Api/useApi';
import { InputApp } from '../../components/InputApp';
import { Loading } from '../../components/Loading';
import { ButtonEdit } from '../../components/Buttons/ButtonEdit';
import { ButtonApp } from '../../components/Buttons/ButtonApp';
import { ButtonDelete } from '../../components/Buttons/ButtonDelete';
import { ModalErrors } from '../../components/ModalErrors';
import { ModalSucces } from '../../components/ModalSucces';
import { ModalConfirm } from '../../components/ModalConfirm'

export const Perfil = () => {
    const navigation = useNavigation()
    const [enable, setEnable] = useState(false);
    const [loading, setLoading] = useState(false);

    //Modais
    const [modalErrors, setModalErrors] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [titleModal, setTitleModal] = useState('Aviso');
    const [mensagemModal, setMensagemModal] = useState('Preencha todos os campos obrigatórios.');
    const [messageSucess, setMessageSucess] = useState('');

    const route = useRoute();
    // const { produto } = route.params;
    // const [formData, setFormData] = useState({
    //     id: produto.id,
    //     nome: produto.nome,
    //     cod_produto: produto.cod_produto,
    //     descricao: produto.descricao,
    //     marca: produto.marca,
    //     valor_compra: produto.valor_compra,
    //     valor_venda: produto.valor_venda
    // });

    // const handleInputChange = (name, value) => {
    //     if (name === "valor_compra" || name === "valor_venda") {
    //         if (value.includes(',') || value.includes('.')) {
    //             value = value.replace(",", ".");
    //         }
    //     }
    //     setFormData({ ...formData, [name]: value })
    // }

    const fnEditarProduto = async () => {
        // setLoading(true)
        // if (await useApi.editarProduto(formData) == 200) {
        //     setMessageSucess('Produto editado com sucesso.');
        //     setModalSucess(true);
        //     setEnable(false);
        //     setTimeout(() => {
        //         navigation.navigate('Produtos', { produtoAtualizado: formData });
        //     }, 3000);
        // } else {
        //     setTitleModal('Erro')
        //     setMensagemModal('Erro ao editar produto.');
        //     setModalErrors(true);
        //     setTimeout(() => {
        //         navigation.navigate('Produtos', { produtoAtualizado: formData });
        //     }, 3000);
        // }
        // setLoading(false);
    }

    const handleSubmit = async () => {
        // if (formData.nome != '' && formData.cod_produto != 0 && formData.marca != '' && formData.valor_compra > 0 && formData.valor_venda > 0) {
        //     fnEditarProduto()
        // }
        // else {
        //     setModalErrors(true);
        // }
    }

    const handleDelete = async () => {
        // setModalConfirm(false);
        // setLoading(true)
        // const id = formData.id;
        // if (await useApi.deletarProduto(id) == 200) {
        //     setMessageSucess('Produto deletado com sucesso.');
        //     setModalSucess(true);
        //     setTimeout(() => {
        //         navigation.navigate('Produtos', { produtoDeletado: formData });
        //     }, 3000);
        // } else {
        //     setTitleModal('Erro')
        //     setMensagemModal('Erro ao deletar produto.');
        //     setModalErrors(true);
        // }
        // setLoading(false);

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Perfil</Text>
                {!enable &&
                    <View style={styles.headerIcons}>
                        <View style={{ marginRight: 5 }}>
                            <ButtonEdit onPress={() => setEnable(true)} />
                        </View>
                    </View>
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {loading && <Loading />}
                <View>
                    <Text style={styles.itemNome}>Dados pessoais</Text>
                    <InputApp
                        title="Nome"
                        editable={enable}
                        // value={formData.nome}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("nome", text)}
                    />
                    <InputApp
                        title="Usuário"
                        editable={enable}
                        // value={formData.nome}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("nome", text)}
                    />
                    <InputApp
                        title="Email"
                        editable={enable}
                        // value={formData.cod_produto.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("cod_produto", text)}
                    />
                    <InputApp
                        title="Senha"
                        editable={enable}
                        secureTextEntry
                        // value={formData.cod_produto.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("cod_produto", text)}
                    />
                    <Text style={[styles.itemNome, { marginTop: 10 }]}>Dados empresa</Text>
                    <InputApp
                        title="CNPJ"
                        editable={enable}
                        //value={formData.descricao}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("descricao", text)}
                    />
                    <InputApp
                        title="Nome Fantasia"
                        editable={enable}
                        // value={formData.marca}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("marca", text)}
                    />
                    <InputApp
                        title="Razão Social"
                        editable={enable}
                        // value={formData.valor_compra.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("valor_compra", text)}
                    />
                    <InputApp
                        title="CEP"
                        editable={enable}
                        //  value={formData.valor_venda.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("valor_venda", text)}
                    />
                    <InputApp
                        title="Cidade"
                        editable={enable}
                        //  value={formData.valor_venda.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("valor_venda", text)}
                    />
                    <InputApp
                        title="Estado"
                        editable={enable}
                        //  value={formData.valor_venda.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("valor_venda", text)}
                    />
                    <InputApp
                        title="Rua"
                        editable={enable}
                        //  value={formData.valor_venda.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("valor_venda", text)}
                    />
                    <InputApp
                        title="Nº"
                        editable={enable}
                        //  value={formData.valor_venda.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom={false}
                        onChangeText={(text) => handleInputChange("valor_venda", text)}
                    />
                    <InputApp
                        title="Bairro"
                        editable={enable}
                        //  value={formData.valor_venda.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                        onChangeText={(text) => handleInputChange("valor_venda", text)}
                    />
                    {enable &&
                        <>
                            <ButtonApp
                                title="Salvar"
                                color="#fff"
                                backgroundColor="#4040ff"
                                onPress={handleSubmit}
                            />
                            <ButtonApp
                                title="Cancelar"
                                color="#ff0000"
                                onPress={() => setEnable(false)}
                            />
                        </>
                    }
                    <ModalErrors
                        title={titleModal}
                        message={mensagemModal}
                        openModal={modalErrors}
                        fnCloseModal={() => setModalErrors(!modalErrors)}
                    />
                    <ModalSucces
                        title="Sucesso"
                        message={messageSucess}
                        openModal={modalSucess}
                        fnCloseModal={() => setModalSucess(!modalSucess)}
                    />
                    <ModalConfirm
                        title="Atenção"
                        message="Tem certeza que deseja excluir?"
                        openModal={modalConfirm}
                        fnCloseModal={() => setModalConfirm(!modalConfirm)}
                        fnConfirm={handleDelete}
                    />
                </View>
            </ScrollView >
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
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
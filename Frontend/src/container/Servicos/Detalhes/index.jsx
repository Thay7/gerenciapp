import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

import { useApi } from '../../../Api/useApi';
import { InputApp } from '../../../components/InputApp';
import { Loading } from '../../../components/Loading';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { ButtonDelete } from '../../../components/Buttons/ButtonDelete';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { ModalConfirm } from '../../../components/ModalConfirm'
import { ButtonBack } from '../../../components/Buttons/ButtonBack';

export const DetalhesServicos = () => {
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
    const { servico } = route.params;
    const [formData, setFormData] = useState({
        id: servico.id,
        nome: servico.nome,
        descricao: servico.descricao,
        valor_venda: servico.valor_venda
    });

    const handleInputChange = (name, value) => {
        if (name === "valor_compra" || name === "valor_venda") {
            if (value.includes(',') || value.includes('.')) {
                value = value.replace(",", ".");
            }
        }
        setFormData({ ...formData, [name]: value })
    }

    const fnEditarServico = async () => {
        setLoading(true)
        if (await useApi.editarServico(formData) == 200) {
            setMessageSucess('Serviço editado com sucesso.');
            setModalSucess(true);
            setEnable(false);
            setTimeout(() => {
                navigation.navigate('Servicos', { servicoAtualizado: formData });
            }, 3000);
        } else {
            setTitleModal('Erro')
            setMensagemModal('Erro ao editar serviço.');
            setModalErrors(true);
            setTimeout(() => {
                navigation.navigate('Servicos', { servicoAtualizado: formData });
            }, 3000);
        }
        setLoading(false);
    }

    const handleSubmit = async () => {
        if (formData.nome != '') {
            fnEditarServico()
        }
        else {
            setModalErrors(true);
        }
    }

    const handleDelete = async () => {
        setModalConfirm(false);
        setLoading(true)
        const id = formData.id;
        if (await useApi.deletarServico(id) == 200) {
            setMessageSucess('Serviço deletado com sucesso.');
            setModalSucess(true);
            setTimeout(() => {
                navigation.navigate('Servicos', { servicoDeletado: formData });
            }, 3000);
        } else {
            setTitleModal('Erro')
            setMensagemModal('Erro ao deletar serviço.');
            setModalErrors(true);
        }
        setLoading(false);

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Servicos" />
                    <Text style={styles.titulo}>Detalhes Serviço</Text>
                </View>
                {!enable &&
                    <View style={styles.header}>
                        <View style={{ marginRight: 5 }}>
                            <ButtonEdit onPress={() => setEnable(true)} />
                        </View>
                        <ButtonDelete onPress={() => setModalConfirm(true)} />
                    </View>
                }
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {loading && <Loading />}
                <View>
                    <InputApp
                        title="Nome"
                        editable={enable}
                        value={formData.nome}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                        onChangeText={(text) => handleInputChange("nome", text)}
                    />
                    <InputApp
                        title="Descrição"
                        editable={enable}
                        value={formData.descricao}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                        onChangeText={(text) => handleInputChange("descricao", text)}
                    />
                    <InputApp
                        title="Valor Venda"
                        editable={enable}
                        value={formData.valor_venda.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                        keyboardType="numeric"
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
        marginBottom: 8,
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
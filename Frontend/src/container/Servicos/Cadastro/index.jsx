import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { InputApp } from '../../../components/InputApp';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { useApi } from '../../../Api/useApi';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { Loading } from '../../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';

export const CadastroDeServicos = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        valor_venda: 0,
        tipo: 'Servico'
    });

    const [modalErrors, setModalErrors] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [titleModal, setTitleModal] = useState('Aviso');
    const [mensagemModal, setMensagemModal] = useState('Preencha todos os campos obrigatórios.');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (name, value) => {
        if (name === "valor_compra" || name === "valor_venda") {
            if (value.includes(',') || value.includes('.')) {
                value = value.replace(",", ".");
            }
        }
        setFormData({ ...formData, [name]: value })
    }

    const cadastraNovoServico = async () => {
        setLoading(true)
        if (await useApi.cadastrarServico(formData) == 200) {
            setModalSucess(true);
            setTimeout(() => {
                navigation.navigate('Servicos', { novoServico: formData });
            }, 3000);
        } else {
            setTitleModal('Erro')
            setMensagemModal('Erro ao cadastrar serviço. Entre em contato com o suporte.');
            setModalErrors(true);
            setTimeout(() => {
                navigation.navigate('Servicos');
            }, 3000);
        }
        setLoading(false);
    }

    const handleSubmit = async () => {
        if (formData.nome != '' && formData.valor_venda > 0) {
            cadastraNovoServico()
        }
        else {
            setModalErrors(true);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonBack navigate="Servicos"/> 
                <Text style={styles.titulo}>Cadastro de Serviço</Text>
            </View>
            <ScrollView >
                {loading && <Loading />}
                <View>
                    <InputApp
                        title="Nome *"
                        fullWidth
                        value={formData.nome}
                        onChangeText={(text) => handleInputChange("nome", text)}
                        marginBottom={true}
                        borderRadius={10}
                    />
                    <InputApp
                        title="Descrição"
                        fullWidth
                        multiline={true}
                        value={formData.descricao}
                        onChangeText={(text) => handleInputChange("descricao", text)}
                        marginBottom={true}
                        borderRadius={10}
                    />
                    <InputApp
                        title="Valor Venda *"
                        fullWidth
                        value={formData.valor_venda}
                        onChangeText={(text) => handleInputChange("valor_venda", text)}
                        keyboardType="numeric"
                        marginBottom={true}
                        borderRadius={10}
                    />
                    <ButtonApp
                        title="Salvar"
                        color="#FFF"
                        backgroundColor="#4040ff"
                        onPress={handleSubmit}
                    />
                </View>
                <ModalErrors
                    title={titleModal}
                    message={mensagemModal}
                    openModal={modalErrors}
                    fnCloseModal={() => setModalErrors(!modalErrors)}
                />
                <ModalSucces
                    title="Sucesso"
                    message="Serviço cadastrado com sucesso!"
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
        marginBottom: 16,
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
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

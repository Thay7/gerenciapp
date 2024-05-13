import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useApi } from '../../../Api/useApi';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { InputApp } from '../../../components/InputApp';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { useRoute } from "@react-navigation/native";

export const NovoCadastro = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const { item } = route.params;

    const [formDataUsuario, setFormDataUsuario] = useState({
        nome: '',
        usuario: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const [formDataFornecedor, setFormDataFornecedor] = useState({
        nome_fantasia: '',
        razao_social: '',
        cnpj: '',
        contato: ''
    });

    const [modalErrors, setModalErrors] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [messageModalErrors, setMessageModalErrors] = useState('');
    const [messageModalSucess, setMessageModalSucess] = useState('');
    const [loading, setLoading] = useState();

    const handleInputChange = (name, value) => {
        if (item.nome == "Usuários")
            setFormDataUsuario({ ...formDataUsuario, [name]: value })
        else
            setFormDataFornecedor({ ...formDataFornecedor, [name]: value })
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (item.nome == "Usuários") {
            if (formDataUsuario.nome != '' && formDataUsuario.usuario != '' &&
                formDataUsuario.email != '' && formDataUsuario.senha != '' &&
                formDataUsuario.confirmarSenha != '') {

                if (formDataUsuario.senha != formDataUsuario.confirmarSenha) {
                    setModalErrors(true);
                    setMessageModalErrors('Senhas não coincidem.');
                }
                else {
                    if (await useApi.cadastrarUsuario(formDataUsuario) == 200) {
                        setModalSucess(true);
                        setMessageModalSucess('Usuário cadastrado com sucesso!');
                        setTimeout(() => {
                            navigation.navigate('ListaCadastros', {
                                novoUsuario: formDataUsuario
                            });
                        }, 3000);
                    } else {
                        setModalErrors(true);
                        setTimeout(() => {
                            navigation.navigate('ListaCadastros');
                        }, 3000);
                    }
                }

            }
            else {
                setModalErrors(true);
                setMessageModalErrors('Preencha todos os campos obrigatórios.');
            }
        }
        else if (item.nome == "Fornecedores") {

            if (formDataFornecedor.nome_fantasia != '' && formDataFornecedor.razao_social != '' &&
                formDataFornecedor.cnpj != '' && formDataFornecedor.contato != '') {

                if (await useApi.cadastrarFornecedor(formDataFornecedor) == 200) {
                    setModalSucess(true);
                    setMessageModalSucess('Fornecedor cadastrado com sucesso!');
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros', {
                            novoFornecedor: formDataFornecedor
                        });
                    }, 3000);
                } else {
                    setModalErrors(true);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros');
                    }, 3000);
                }

            }
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonBack navigate="ListaCadastros" />
                <Text style={styles.titulo}>Cadastro de {item.nome}</Text>
            </View>
            <ScrollView >
                <View>
                    {item.nome == 'Fornecedores' ? (
                        <>
                            <InputApp
                                title="Nome fantasia *"
                                fullWidth
                                value={formDataFornecedor.nome_fantasia}
                                onChangeText={(text) => handleInputChange("nome_fantasia", text)}
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="Razão social *"
                                fullWidth
                                multiline={true}
                                value={formDataFornecedor.razao_social}
                                onChangeText={(text) => handleInputChange("razao_social", text)}
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="CNPJ *"
                                fullWidth
                                value={formDataFornecedor.cnpj}
                                onChangeText={(text) => handleInputChange("cnpj", text)}
                                keyboardType="numeric"
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="Contato *"
                                fullWidth
                                value={formDataFornecedor.contato}
                                onChangeText={(text) => handleInputChange("contato", text)}
                                keyboardType="numeric"
                                marginBottom={true}
                                borderRadius={10}
                            />
                        </>
                    )
                        :
                        (
                            <>
                                <InputApp
                                    title="Nome *"
                                    fullWidth
                                    value={formDataUsuario.nome}
                                    onChangeText={(text) => handleInputChange("nome", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Usuário *"
                                    fullWidth
                                    multiline={true}
                                    value={formDataUsuario.usuario}
                                    onChangeText={(text) => handleInputChange("usuario", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Email *"
                                    fullWidth
                                    value={formDataUsuario.email}
                                    onChangeText={(text) => handleInputChange("email", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Senha *"
                                    fullWidth
                                    value={formDataUsuario.senha}
                                    onChangeText={(text) => handleInputChange("senha", text)}
                                    secureTextEntry={true}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Confirmar senha *"
                                    fullWidth
                                    value={formDataUsuario.confirmarSenha}
                                    onChangeText={(text) => handleInputChange("confirmarSenha", text)}
                                    secureTextEntry={true}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                            </>
                        )
                    }
                    <ButtonApp
                        title="Salvar"
                        color="#FFF"
                        backgroundColor="#4040ff"
                        onPress={handleSubmit}
                    />
                </View>
                <ModalErrors
                    title="Aviso"
                    message={messageModalErrors}
                    openModal={modalErrors}
                    fnCloseModal={() => setModalErrors(!modalErrors)}
                />
                <ModalSucces
                    title="Sucesso"
                    message={messageModalSucess}
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
        marginLeft: 15
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


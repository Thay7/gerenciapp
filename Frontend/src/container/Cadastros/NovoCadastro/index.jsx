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
import { InputSelectSimples } from '../../../components/InputSelectSimples';

export const NovoCadastro = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const { item } = route.params;
    const [modalErrors, setModalErrors] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [messageModalErrors, setMessageModalErrors] = useState('');
    const [messageModalSucess, setMessageModalSucess] = useState('');
    const [loading, setLoading] = useState();

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

    const [formDataMovCaixa, setFormDataMovCaixa] = useState({
        tipo: '',
        descricao: '',
        valor: 0
    });

    const handleInputChange = (name, value) => {
        switch (item.nome) {
            case 'Usuários':
                setFormDataUsuario({ ...formDataUsuario, [name]: value })
                break;
            case 'Fornecedores':
                setFormDataFornecedor({ ...formDataFornecedor, [name]: value })
                break;
            case 'Movimento Caixa':
                setValor(value)
                break;
        };
    };

    //Opcoes select Tipo 
    const optionsTipo = ['Saída'];
    const [selectedOptionTipo, setSelectedOptionTipo] = useState('Saída');

    //Opcoes select Descricao 
    const optionsDescEntrada = ['Abertura caixa', 'Entrada valor'];
    const optionsDescSaida = ['Mantimentos', 'Mercado', 'Contas'];
    const [selectedOptionDesc, setSelectedOptionDesc] = useState('');

    //Valor
    const [valor, setValor] = useState();

    const handleOptionsDesc = () => {
        switch (selectedOptionTipo) {
            case 'Entrada':
                return optionsDescEntrada;
            case 'Saída':
                return optionsDescSaida;
            default:
                return [];
        };
    };

    const handleOnValueChange = (value, tipo) => {
        if (optionsTipo != '') {
            switch (tipo) {
                case 'tipo':
                    setSelectedOptionTipo(value);
                    break;
                case 'desc':
                    setSelectedOptionDesc(value);
                    break;
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        switch (item.nome) {
            case 'Usuários':
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
                            setMessageModalErrors('Erro ao realizar cadastro. Entre em contato com o suporte.');
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
                };
                break;
            case 'Fornecedores':
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
                        setMessageModalErrors('Erro ao realizar cadastro. Entre em contato com o suporte.');
                        setModalErrors(true);
                        setTimeout(() => {
                            navigation.navigate('ListaCadastros');
                        }, 3000);
                    }
                }
                else {
                    setModalErrors(true);
                    setMessageModalErrors('Preencha todos os campos obrigatórios.');
                };
                break;
            case 'Movimento Caixa':
                if (selectedOptionTipo != '' && selectedOptionDesc != '' &&
                    valor != 0) {
                    formDataMovCaixa.tipo = selectedOptionTipo;
                    formDataMovCaixa.descricao = selectedOptionDesc;
                    formDataMovCaixa.valor = valor;
                    if (await useApi.cadastrarMovimentoCaixa(formDataMovCaixa) == 200) {
                        setModalSucess(true);
                        setMessageModalSucess('Movimento de caixa cadastrado com sucesso!');
                        setTimeout(() => {
                            navigation.navigate('ListaCadastros', {
                                novoMovimentoCaixa: formDataMovCaixa
                            });
                        }, 3000);
                    } else {
                        setMessageModalErrors('Erro ao realizar cadastro. Entre em contato com o suporte.');
                        setModalErrors(true);
                        setTimeout(() => {
                            navigation.navigate('ListaCadastros');
                        }, 3000);
                    }
                }
                else {
                    setModalErrors(true);
                    setMessageModalErrors('Preencha todos os campos obrigatórios.');
                };
                break;
        };
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonBack navigate="ListaCadastros" />
                <Text style={styles.titulo}>Cadastro {item.nome}</Text>
            </View>
            <ScrollView >
                <View>
                    {item.nome == 'Fornecedores' &&
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
                    }
                    {item.nome == 'Usuários' &&
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
                    }
                    {item.nome == 'Movimento Caixa' &&
                        <>
                            <InputSelectSimples
                                title="Tipo *"
                                options={optionsTipo}
                                selectedValue={selectedOptionTipo}
                                onValueChange={(value) => handleOnValueChange(value, 'tipo')}
                                editable={true}
                            />
                            <InputSelectSimples
                                title="Descrição *"
                                options={handleOptionsDesc()}
                                selectedValue={selectedOptionDesc}
                                onValueChange={(value) => handleOnValueChange(value, 'desc')}
                                editable={true}
                            />
                            <InputApp
                                title="Valor *"
                                fullWidth
                                value={formDataMovCaixa.valor}
                                onChangeText={(text) => handleInputChange("valor", text)}
                                keyboardType="numeric"
                                marginBottom={true}
                                borderRadius={10}
                                editable={true}
                            />
                        </>
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
        fontSize: 22,
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


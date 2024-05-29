import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useApi } from '../../../Api/useApi';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { InputApp } from '../../../components/InputApp';
import { formatterbrl } from '../../../utils/formatterbrl';
import { useRoute } from "@react-navigation/native";
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { ModalConfirm } from '../../../components/ModalConfirm';
import { Loading } from '../../../components/Loading';
import { ButtonDelete } from '../../../components/Buttons/ButtonDelete';
import { InputSelectSimples } from '../../../components/InputSelectSimples';

export const DetalhesCadastro = () => {
    const navigation = useNavigation()
    const [enable, setEnable] = useState(false);
    const [loading, setLoading] = useState(false);

    const [namePage, setNamePage] = useState('');
    const [titleModalErrors, setTitleModalErrors] = useState('');
    const [modalErrors, setModalErrors] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [mensagemModalErrors, setMensagemModalErrors] = useState('');
    const [mensagemSucess, setMessageSucess] = useState('');
    const [modalConfirm, setModalConfirm] = useState(false);

    const route = useRoute();
    const { item } = route.params;

    const [formDataFornecedor, setFormDataFornecedor] = useState({
        id: null,
        nome_fantasia: '',
        razao_social: '',
        cnpj: null,
        contato: null
    });

    const [formDataUsuario, setFormDataUsuario] = useState({
        id: null,
        nome: '',
        usuario: '',
        email: ''
    });

    const [formDataMovCaixa, setFormDataMovCaixa] = useState({
        id: null,
        tipo: '',
        descricao: '',
        valor: ''
    });

    useEffect(() => {
        if (item.cnpj) {
            setNamePage('Detalhes Fornecedor');
            setFormDataFornecedor({
                id: item.id,
                nome_fantasia: item.nome_fantasia,
                razao_social: item.razao_social,
                cnpj: item.cnpj,
                contato: item.contato
            });
        };

        if (item.usuario) {
            setNamePage('Detalhes Usuário');
            setFormDataUsuario({
                id: item.id,
                nome: item.nome,
                usuario: item.usuario,
                email: item.email
            });
        };

        if (item.tipo) {
            setNamePage('Detalhes Mov Caixa');
            setFormDataMovCaixa({
                id: item.id,
                tipo: item.tipo,
                descricao: item.descricao,
                valor: item.valor
            });
        };
    }, []);

    const handleInputChange = (name, value, tipo) => {
        switch (tipo) {
            case 'Fornecedor':
                setFormDataFornecedor({ ...formDataFornecedor, [name]: value });
                break;
            case 'Usuario':
                setFormDataUsuario({ ...formDataUsuario, [name]: value });
                break;
            case 'Movimento Caixa':
                setFormDataMovCaixa({ ...formDataMovCaixa, [name]: value });
                break;
        }
    };

    //Opcoes select Tipo 
    const optionsTipo = ['Saída'];
    const [selectedOptionTipo, setSelectedOptionTipo] = useState('Saída');

    //Opcoes select Descricao 
    const optionsDescEntrada = ['Abertura caixa', 'Entrada valor'];
    const optionsDescSaida = ['Mantimentos', 'Mercado', 'Contas'];
    const [selectedOptionDesc, setSelectedOptionDesc] = useState('');

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
                    setFormDataMovCaixa({ ...formDataMovCaixa, [tipo]: value });
                    break;
                case 'descricao':
                    setSelectedOptionDesc(value);
                    setFormDataMovCaixa({ ...formDataMovCaixa, [tipo]: value });
                    break;
            }
        }
    };

    const fnEditar = async (tipoCadastro) => {
        setLoading(true)
        switch (tipoCadastro) {
            case 'Usuario':
                if (await useApi.editarUsuario(formDataUsuario) == 200) {
                    setMessageSucess('Usuário editado com sucesso.');
                    setModalSucess(true);
                    setEnable(false);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros', { usuarioAtualizado: formDataUsuario });
                    }, 3000);
                } else {
                    setTitleModalErrors('Erro')
                    setMensagemModalErrors(`Erro ao editar ${tipoCadastro}.`);
                    setModalErrors(true);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros');
                    }, 3000);
                }
                break;
            case 'Fornecedor':
                if (await useApi.editarFornecedor(formDataFornecedor) == 200) {
                    setMessageSucess('Fornecedor editado com sucesso.');
                    setModalSucess(true);
                    setEnable(false);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros', { fornecedorAtualizado: formDataFornecedor });
                    }, 3000);
                } else {
                    setTitleModalErrors('Erro')
                    setMensagemModalErrors(`Erro ao editar ${tipoCadastro}.`);
                    setModalErrors(true);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros');
                    }, 3000);
                }
                break;
            case 'Mov Caixa':
                if (await useApi.editarMovCaixa(formDataMovCaixa) == 200) {
                    setMessageSucess('Mov Caixa editado com sucesso.');
                    setModalSucess(true);
                    setEnable(false);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros', { movimentoCaixaAtualizado: formDataMovCaixa });
                    }, 3000);
                } else {
                    setTitleModalErrors('Erro')
                    setMensagemModalErrors(`Erro ao editar ${tipoCadastro}.`);
                    setModalErrors(true);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros');
                    }, 3000);
                }
                break;
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        setModalConfirm(false);
        setLoading(true)
        switch (namePage) {
            case 'Detalhes Fornecedor':
                const idFornecedor = formDataFornecedor.id;
                if (await useApi.deletarFornecedor(idFornecedor) == 200) {
                    setMessageSucess(`Fornecedor deletado com sucesso.`);
                    setModalSucess(true);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros', { fornecedorDeletado: formDataFornecedor });
                    }, 3000);
                } else {
                    setTitleModal('Erro')
                    setMensagemModal(`Erro ao deletar fornecedor.`);
                    setModalErrors(true);
                }
                setLoading(false);
                break;
            case 'Detalhes Usuário':
                const idUsuario = formDataUsuario.id;
                if (await useApi.deletarUsuario(idUsuario) == 200) {
                    setMessageSucess(`Usuário deletado com sucesso.`);
                    setModalSucess(true);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros', { usuarioDeletado: formDataUsuario });
                    }, 3000);
                } else {
                    setTitleModal('Erro')
                    setMensagemModal(`Erro ao deletar usuário.`);
                    setModalErrors(true);
                }
                break;
            case 'Detalhes Mov Caixa':
                const idMovCaixa = formDataMovCaixa.id;
                if (await useApi.deletarMovCaixa(idMovCaixa) == 200) {
                    setMessageSucess(`Mov caixa deletado com sucesso.`);
                    setModalSucess(true);
                    setTimeout(() => {
                        navigation.navigate('ListaCadastros', { movimentoCaixaDeletado: formDataMovCaixa });
                    }, 3000);
                } else {
                    setTitleModal('Erro')
                    setMensagemModal(`Erro ao deletar mov caixa.`);
                    setModalErrors(true);
                }
                break;
        }

        setLoading(false);
    };

    const handleSubmit = async () => {
        switch (namePage) {
            case 'Detalhes Fornecedor':
                if (formDataFornecedor.nome_fantasia != "" && formDataFornecedor.razao_social != "" &&
                    formDataFornecedor.cnpj != null && formDataFornecedor.contato != null) {
                    fnEditar('Fornecedor');
                }
                else {
                    setModalErrors(true);
                    setTitleModalErrors('Aviso');
                    setMensagemModalErrors('Preencha todos os campos obrigatórios.');
                }
                break;
            case 'Detalhes Usuário':
                if (formDataUsuario.nome != '' && formDataUsuario.usuario != 0 && formDataUsuario.email != '') {
                    fnEditar('Usuario');
                }
                else {
                    setModalErrors(true);
                    setTitleModalErrors('Aviso');
                    setMensagemModalErrors('Preencha todos os campos obrigatórios.');
                }
                break;
            case 'Detalhes Mov Caixa':
                if (formDataMovCaixa.tipo != '' && formDataMovCaixa.descricao != 0 && formDataMovCaixa.valor != 0) {
                    fnEditar('Mov Caixa');
                }
                else {
                    setModalErrors(true);
                    setTitleModalErrors('Aviso');
                    setMensagemModalErrors('Preencha todos os campos obrigatórios.');
                }
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="ListaCadastros" />
                    <Text style={styles.titulo}>{namePage}</Text>
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
            <ScrollView >
                {loading && <Loading />}
                <View>
                    {item.cnpj &&
                        <>
                            <InputApp
                                title="Nome fantasia"
                                fullWidth
                                value={formDataFornecedor.nome_fantasia}
                                onChangeText={(text) => handleInputChange("nome_fantasia", text, 'Fornecedor')}
                                marginBottom={true}
                                borderRadius={10}
                                editable={enable}
                            />
                            <InputApp
                                title="Razão social"
                                fullWidth
                                multiline={true}
                                value={formDataFornecedor.razao_social}
                                onChangeText={(text) => handleInputChange("razao_social", text, 'Fornecedor')}
                                marginBottom={true}
                                borderRadius={10}
                                editable={enable}
                            />
                            <InputApp
                                title="CNPJ"
                                fullWidth
                                value={formDataFornecedor.cnpj}
                                onChangeText={(text) => handleInputChange("cnpj", text, 'Fornecedor')}
                                marginBottom={true}
                                borderRadius={10}
                                editable={enable}
                            />
                            <InputApp
                                title="Contato"
                                fullWidth
                                value={formDataFornecedor.contato}
                                onChangeText={(text) => handleInputChange("contato", text, 'Fornecedor')}
                                keyboardType="numeric"
                                marginBottom={true}
                                borderRadius={10}
                                editable={enable}
                            />
                        </>
                    }
                    {item.usuario &&
                        <>
                            <InputApp
                                title="Nome"
                                fullWidth
                                value={formDataUsuario.nome}
                                onChangeText={(text) => handleInputChange("nome", text, 'Usuario')}
                                marginBottom={true}
                                borderRadius={10}
                                editable={enable}
                            />
                            <InputApp
                                title="Usuário"
                                fullWidth
                                multiline={true}
                                value={formDataUsuario.usuario}
                                onChangeText={(text) => handleInputChange("usuario", text, 'Usuario')}
                                marginBottom={true}
                                borderRadius={10}
                                editable={enable}
                            />
                            <InputApp
                                title="Email"
                                fullWidth
                                value={formDataUsuario.email}
                                onChangeText={(text) => handleInputChange("email", text, 'Usuario')}
                                marginBottom={true}
                                borderRadius={10}
                                editable={enable}
                            />
                        </>

                    }
                    {item.tipo &&
                        <>
                            <InputSelectSimples
                                title="Tipo *"
                                options={optionsTipo}
                                selectedValue={formDataMovCaixa.tipo}
                                onValueChange={(value) => handleOnValueChange(value, 'tipo')}
                                editable={enable}
                            />
                            <InputSelectSimples
                                title="Descrição *"
                                options={handleOptionsDesc()}
                                selectedValue={formDataMovCaixa.descricao}
                                onValueChange={(value) => handleOnValueChange(value, 'descricao')}
                                editable={enable}
                            />
                            <InputApp
                                title="Valor *"
                                fullWidth
                                value={formDataMovCaixa.valor.toString()}
                                onChangeText={(text) => handleInputChange("valor", text, 'Movimento Caixa')}
                                keyboardType="numeric"
                                marginBottom={true}
                                borderRadius={10}
                                editable={enable}
                            />
                        </>

                    }
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
                                color="#FF0000"
                                onPress={() => setEnable(false)}
                            />
                        </>
                    }
                    <ModalErrors
                        title={titleModalErrors}
                        message={mensagemModalErrors}
                        openModal={modalErrors}
                        fnCloseModal={() => setModalErrors(!modalErrors)}
                    />
                    <ModalSucces
                        title="Sucesso"
                        message={mensagemSucess}
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
        fontSize: 20,
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
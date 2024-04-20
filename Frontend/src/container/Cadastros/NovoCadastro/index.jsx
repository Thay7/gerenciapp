import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { InputApp } from '../../../components/InputApp';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { useApi } from '../../../Api/useApi';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { useRoute } from "@react-navigation/native";
import { ButtonBack } from '../../../components/Buttons/ButtonBack';

export const NovoCadastro = () => {
    const route = useRoute();
    const { item } = route.params;

    const [formData, setFormData] = useState({
        produto_nome: '',
        produto_descricao: '',
        produto_marca: '',
        produto_valorCompra: 0,
        produto_valorVenda: 0
    })

    const [modalErrors, setModalErrors] = useState(false);
    const handleInputChange = (name, value) => {
        if (name === "produto_valorCompra" || name === "produto_valorVenda") {
            if (value.includes(',') || value.includes('.')) {
                value = value.replace(",", ".");
            }
        }
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async () => {
        if (item.nome == "Usuários") {
            if (formData.produto_nome != '' && formData.produto_valorCompra > 0 && formData.produto_valorVenda > 0) {
            }
            else {
                setModalErrors(true);
            }
        }
    }

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
                                value={formData.nome}
                                onChangeText={(text) => handleInputChange("produto_nome", text)}
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="Razão social *"
                                fullWidth
                                multiline={true}
                                value={formData.descricao}
                                onChangeText={(text) => handleInputChange("produto_descricao", text)}
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="CNPJ *"
                                fullWidth
                                value={formData.marca}
                                onChangeText={(text) => handleInputChange("produto_marca", text)}
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="Contato *"
                                fullWidth
                                value={formData.valorCompra}
                                onChangeText={(text) => handleInputChange("produto_valorCompra", text)}
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
                                    title="Nome"
                                    fullWidth
                                    value={formData.nome}
                                    onChangeText={(text) => handleInputChange("produto_nome", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Usuário"
                                    fullWidth
                                    multiline={true}
                                    value={formData.descricao}
                                    onChangeText={(text) => handleInputChange("produto_descricao", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Email"
                                    fullWidth
                                    value={formData.marca}
                                    onChangeText={(text) => handleInputChange("produto_marca", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Senha"
                                    fullWidth
                                    value={formData.valorCompra}
                                    onChangeText={(text) => handleInputChange("produto_valorCompra", text)}
                                    keyboardType="numeric"
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Confirmar senha"
                                    fullWidth
                                    value={formData.valorCompra}
                                    onChangeText={(text) => handleInputChange("produto_valorCompra", text)}
                                    keyboardType="numeric"
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
                    message="Preencha todos os campos obrigatórios."
                    openModal={modalErrors}
                    fnCloseModal={() => setModalErrors(!modalErrors)}
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
        fontSize: 30,
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


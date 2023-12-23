import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//import { useApi } from '../../Api/useApi';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { InputApp } from '../../../components/InputApp';
import { formatterbrl } from '../../../utils/formatterbrl';
import { useRoute } from "@react-navigation/native";
import { ButtonApp } from '../../../components/Buttons/ButtonApp';

export const DetalhesCadastro = () => {
    const [enable, setEnable] = useState(false);
    const [namePage, setNamePage] = useState('');
    const route = useRoute();
    const { item } = route.params;

    useEffect(() => {
        if (item.cnpj) {
            setNamePage('Detalhes Fornecedor')
        };

        if (item.usuario) {
            setNamePage('Detalhes Usuário')
        };
    }, [])

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>{namePage}</Text>
                    {!enable &&
                        <ButtonEdit onPress={() => setEnable(true)} />
                    }
                </View>
                <View>
                    {item.cnpj ? (
                        <>
                            <InputApp
                                title="Nome fantasia"
                                fullWidth
                                value={item.nomeFantasia}
                                onChangeText={(text) => handleInputChange("produto_nome", text)}
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="Razão social"
                                fullWidth
                                multiline={true}
                                value={item.razaoSocial}
                                onChangeText={(text) => handleInputChange("produto_descricao", text)}
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="CNPJ"
                                fullWidth
                                value={item.cnpj}
                                onChangeText={(text) => handleInputChange("produto_marca", text)}
                                marginBottom={true}
                                borderRadius={10}
                            />
                            <InputApp
                                title="Contato"
                                fullWidth
                                value={item.contato}
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
                                    value={item.nome}
                                    onChangeText={(text) => handleInputChange("produto_nome", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Usuário"
                                    fullWidth
                                    multiline={true}
                                    value={item.usuario}
                                    onChangeText={(text) => handleInputChange("produto_descricao", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Email"
                                    fullWidth
                                    value={item.email}
                                    onChangeText={(text) => handleInputChange("produto_marca", text)}
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                                <InputApp
                                    title="Senha"
                                    fullWidth
                                    // value={item.valorCompra}
                                    onChangeText={(text) => handleInputChange("produto_valorCompra", text)}
                                    keyboardType="numeric"
                                    marginBottom={true}
                                    borderRadius={10}
                                />
                            </>
                        )
                    }
                    {enable &&
                        <ButtonApp
                            title="Salvar"
                            color="#fff"
                            backgroundColor="#4040ff"
                            onPress={() => setEnable(false)}
                        />
                    }
                </View>
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
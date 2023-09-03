import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { InputApp } from '../../../components/InputApp';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { useApi } from '../../../Api/useApi';

export const CadastroDeProdutos = () => {
    const [formData, setFormData] = useState({
        produto_nome: '',
        produto_descricao: '',
        produto_marca: '',
        produto_valorCompra: 0,
        produto_valorVenda: 0
    })

    const handleInputChange = (name, value) => {
        if (name === "produto_valorCompra" || name === "produto_valorVenda") {
            if (value.includes(',') || value.includes('.')) {
                value = value.replace(",", ".");
            }
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = async () => {
        await useApi.cadastrarProdutos(formData)
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Cadastro de Produto</Text>
                </View>
                <View >
                    <View >
                        <InputApp
                            title="Nome"
                            fullWidth
                            value={formData.nome}
                            onChangeText={(text) => handleInputChange("produto_nome", text)}
                            marginBottom={true}
                            borderRadius={10}
                        />
                        <InputApp
                            title="Descrição"
                            fullWidth
                            multiline={true}
                            value={formData.descricao}
                            onChangeText={(text) => handleInputChange("produto_descricao", text)}
                            marginBottom={true}
                            borderRadius={10}
                        />
                        <InputApp
                            title="Marca"
                            fullWidth
                            value={formData.marca}
                            onChangeText={(text) => handleInputChange("produto_marca", text)}
                            marginBottom={true}
                            borderRadius={10}
                        />
                        <InputApp
                            title="Valor Compra"
                            fullWidth
                            value={formData.valorCompra}
                            onChangeText={(text) => handleInputChange("produto_valorCompra", text)}
                            keyboardType="numeric"
                            marginBottom={true}
                            borderRadius={10}
                        />
                        <InputApp
                            title="Valor Venda"
                            fullWidth
                            value={formData.valorVenda}
                            onChangeText={(text) => handleInputChange("produto_valorVenda", text)}
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


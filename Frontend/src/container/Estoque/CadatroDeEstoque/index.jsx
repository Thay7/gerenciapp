import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { InputApp } from '../../../components/InputApp';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { useApi } from '../../../Api/useApi';
import { InputSelect } from '../../../components/InputSelect';

export const CadastroDeEstoque = () => {
    const [valuesSelect, setValuesSelect] = useState([])
    const [selectedValue, setSelectedValue] = useState()

    const [formData, setFormData] = useState({
        produto_id: null,
        estoque_quantidade: null
    })

    useEffect(() => {
        valoreDisponiveis()
    }, []);

    useEffect(() => {
        setFormData({
            ...formData,
            produto_id: selectedValue
        });
    }, [selectedValue]);

    const valoreDisponiveis = async () => {
        let json = await useApi.listaProdutosSemEstoque()
        setValuesSelect(json)
    }

    const onValueChange = (value) => {
        setSelectedValue(value)
    }

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async () => {
        await useApi.cadastrarProdutoNoEstoque(formData)
        console.log(formData)
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Cadastrar Produto no Estoque</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <View style={{ marginBottom: 16 }}>
                        <InputSelect
                            title="Selecione o produto"
                            selectedValue={selectedValue}
                            onValueChange={onValueChange}
                            options={valuesSelect}
                        />
                        <InputApp
                            title="Quantidade"
                            placeholder="Informe a quantidade"
                            keyboardType="numeric"
                            fullWidth
                            value={formData.estoque_quantidade}
                            onChangeText={(text) => handleInputChange("estoque_quantidade", text)}
                        />
                        <ButtonApp
                            title="Cadastrar"
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
        fontSize: 24,
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


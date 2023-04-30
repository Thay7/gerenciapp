import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { formatterbrl } from '../../../utils/formatterbrl';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { InputApp } from '../../../components/InputApp'
import { ButtonApp } from '../../../components/Buttons/ButtonApp'
export const DetalhesProduto = () => {
    const route = useRoute()
    const { item } = route.params
    const [editing, setEditing] = useState(false)

    const [productForm, setProductForm] = useState({
        nome: '',
        descricao: '',
        valorCompra: 0,
        valorRevenda: 0
    })

    const handleInputChange = (fieldName, value) => {
        setProductForm({
            ...productForm,
            [fieldName]: value
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Detalhes Produto</Text>
                    <ButtonEdit
                        onPress={() => setEditing(true)}
                    />
                </View>
                {editing ? (
                    <View>
                        <InputApp
                            title="Nome"
                            value={item.peca_descricao}
                            onChangeText={(text) => handleInputChange('nome', text)}
                        />
                        <InputApp
                            title="Descrição"
                            // value={item.peca_descricao}
                            onChangeText={(text) => handleInputChange('descricao', text)}
                        />
                        <InputApp
                            title="Valor de compra"
                            value={formatterbrl(item.peca_valorCompra)}
                            onChangeText={(text) => handleInputChange('valorCompra', text)}
                        />
                        <InputApp
                            title="Valor de revenda"
                            value={formatterbrl(item.peca_valorRevenda)}
                            onChangeText={(text) => handleInputChange('valorRevenda', text)}
                        />
                        <ButtonApp
                            title="Salvar"
                            backgroundColor="#4040ff"
                            color="#FFF"
                            width={300}
                            onPress={() => setEditing(false)}
                        />
                    </View>
                ) :
                    (
                        <View >
                            <View style={styles.row}>
                                <Text style={styles.itemNome}>Nome:</Text>
                                <Text style={styles.itemSub}>{item.peca_descricao}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.itemNome}>Descrição:</Text>
                                <Text style={styles.itemSub}></Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.itemNome}>Valor de compra:</Text>
                                <Text style={styles.itemSub}>{formatterbrl(item.peca_valorCompra)}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.itemNome}>Valor de revenda:</Text>
                                <Text style={styles.itemSub}>{formatterbrl(item.peca_valorRevenda)}</Text>
                            </View>
                        </View>
                    )}

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
        marginLeft: 4
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});


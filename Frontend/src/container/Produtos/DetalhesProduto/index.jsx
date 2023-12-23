import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//import { useApi } from '../../Api/useApi';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { InputApp } from '../../../components/InputApp';
import { formatterbrl } from '../../../utils/formatterbrl';
import { useRoute } from "@react-navigation/native";
import { ButtonApp } from '../../../components/Buttons/ButtonApp';

export const DetalhesProduto = () => {
    const [enable, setEnable] = useState(false);
    const route = useRoute();
    const { produto } = route.params;

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Detalhes Produto</Text>
                    {!enable &&
                        <ButtonEdit onPress={() => setEnable(true)} />
                    }
                </View>
                <View>
                    <InputApp
                        title="Nome"
                        editable={enable}
                        value={produto.produto_nome}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                    //onChangeText={(text) => setSearchName(text)}
                    />
                    <InputApp
                        title="Referência"
                        editable={enable}
                        value={produto.produto_referencia}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                    //onChangeText={(text) => setSearchReference(text)}
                    />
                    <InputApp
                        title="Descrição"
                        editable={enable}
                        value={produto.produto_descricao}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                    //onChangeText={(text) => setSearchReference(text)}
                    />
                    <InputApp
                        title="Marca"
                        editable={enable}
                        value={produto.produto_marca}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                    //onChangeText={(text) => setSearchReference(text)}
                    />
                    <InputApp
                        title="Valor Compra"
                        editable={enable}
                        value={formatterbrl(produto.produto_valorCompra)}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                    //onChangeText={(text) => setSearchReference(text)}
                    />
                    <InputApp
                        title="Valor Venda"
                        editable={enable}
                        value={formatterbrl(produto.produto_valorVenda)}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                    //onChangeText={(text) => setSearchReference(text)}
                    />
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
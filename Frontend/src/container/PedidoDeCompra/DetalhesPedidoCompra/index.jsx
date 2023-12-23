import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//import { useApi } from '../../Api/useApi';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { InputApp } from '../../../components/InputApp';
import { formatterbrl } from '../../../utils/formatterbrl';
import { useRoute } from "@react-navigation/native";
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { InputSelectPagamento } from '../../../components/InputSelectPagamento';

export const DetalhesPedidoCompra = () => {
    const [enable, setEnable] = useState(false);
    const route = useRoute();
    const { pedidocompra } = route.params;

    //Lidar com a forma de pagamento
    const [optionsPagamento, setOptionsPagamento] = useState([
        'Boleto',
        'Pix'
    ]);

    const [selectedPagamento, setSelectedPagamento] = useState(pedidocompra.formaDePagamento);

    const handleOnValueChangePagamento = (value) => {
        setSelectedPagamento(value);
    };

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Detalhes Pedido Compra</Text>
                    {!enable &&
                        <ButtonEdit onPress={() => setEnable(true)} />
                    }
                </View>
                {pedidocompra.status != 'Recebido' && !enable &&
                    <ButtonApp
                        title="Confirmar recebimento"
                        color="#fff"
                        backgroundColor="green"
                        marginBottom={10}
                    // onPress={() => setEnable(false)}
                    />
                }
                <View style={[{ marginTop: 10, marginBottom: 10, marginHorizontal: 5 }, styles.rowBetween]}>
                    <View >
                        <Text style={styles.itemNome}>Nº Pedido Compra</Text>
                        <Text style={styles.itemSub}>{pedidocompra.numeroCompra}</Text>
                    </View>
                    <View>
                        <Text style={styles.itemNome}>Fornecedor</Text>
                        <Text style={styles.itemSub}>{pedidocompra.fornecedor.nomeFantasia}</Text>
                    </View>
                    <View>
                        <Text style={styles.itemNome}>Data e Hora</Text>
                        <Text style={styles.itemSub}>{pedidocompra.dataHora}</Text>
                    </View>
                </View>
                <View >
                    <View style={styles.itemContainer}>
                        {pedidocompra.itens.map((item, index) => (
                            <View key={index}>
                                <Text style={[styles.itemNome, { marginBottom: 10 }]}>{item.nome}</Text>
                                <View style={styles.rowBetween}>
                                    <InputApp
                                        title="Valor"
                                        editable={enable}
                                        value={item.valor}
                                        width={130}
                                        fullWidth
                                        borderRadius={10}
                                        marginBottom
                                    //onChangeText={(text) => setSearchReference(text)}
                                    />
                                    {item.quantidade &&
                                        <InputApp
                                            title="Quantidade"
                                            editable={enable}
                                            value={item.quantidade}
                                            width={130}
                                            fullWidth
                                            borderRadius={10}
                                            marginBottom
                                        //onChangeText={(text) => setSearchReference(text)}
                                        />
                                    }
                                </View>
                            </View>
                        ))}
                    </View>
                    <Text style={[styles.itemNome, { marginTop: 10 }]}>Detalhes Fornecedor</Text>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemNome}>Nome Fantasia</Text>
                        <InputApp
                            value={pedidocompra.fornecedor.nomeFantasia}
                            keyboardType="numeric"
                            marginBottom={true}
                            height={30}
                            borderRadius={5}
                            editable={enable}
                        />
                        <Text style={styles.itemNome}>Razão Social</Text>
                        <InputApp
                            value={pedidocompra.fornecedor.razaoSocial}
                            keyboardType="numeric"
                            marginBottom={true}
                            height={30}
                            borderRadius={5}
                            editable={enable}
                        />
                        <Text style={styles.itemNome}>CNPJ</Text>
                        <InputApp
                            value={pedidocompra.fornecedor.cnpj}
                            keyboardType="numeric"
                            marginBottom={true}
                            height={30}
                            borderRadius={5}
                            editable={enable}
                        />
                        <Text style={styles.itemNome}>Contato</Text>
                        <InputApp
                            value={pedidocompra.fornecedor.contato}
                            keyboardType="numeric"
                            marginBottom={true}
                            height={30}
                            borderRadius={5}
                            editable={enable}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <InputSelectPagamento
                            title="Forma de Pagamento"
                            options={optionsPagamento}
                            selectedValue={selectedPagamento}
                            onValueChange={(value) => handleOnValueChangePagamento(value)}
                            enable={enable}
                        />
                        <InputApp
                            title="Nº Parcelas"
                            editable={false}
                            value={pedidocompra.numeroParcelas}
                            fullWidth
                            borderRadius={10}
                            marginBottom
                        //onChangeText={(text) => setSearchReference(text)}
                        />
                        <InputApp
                            title="Valor Total"
                            editable={enable}
                            value={pedidocompra.valorTotal}
                            fullWidth
                            borderRadius={10}
                            marginBottom
                        //onChangeText={(text) => setSearchReference(text)}
                        />
                    </View>
                    {enable &&
                        <>
                            <ButtonApp
                                title="Salvar"
                                color="#fff"
                                backgroundColor="#4040ff"
                                onPress={() => setEnable(false)}
                            />
                            <ButtonApp
                                title="Cancelar"
                                color="#FF0000"
                                onPress={() => setEnable(false)}
                            />
                        </>
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
        marginBottom: 10
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
    },
    rowBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
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

export const DetalhesVenda = () => {
    const [enable, setEnable] = useState(false);
    const route = useRoute();
    const { venda } = route.params;

    //Lidar com a forma de pagamento
    const [optionsPagamento, setOptionsPagamento] = useState([
        'Dinheiro',
        'Pix',
        'Cartão de Debito',
        'Cartão de Crédito'
    ]);

    const [selectedPagamento, setSelectedPagamento] = useState(null);

    const handleOnValueChangePagamento = (value) => {
        setSelectedPagamento(value);
    };
    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Detalhes Venda</Text>
                    {!enable &&
                        <ButtonEdit onPress={() => setEnable(true)} />
                    }
                </View>
                <View style={styles.itemContainer}>
                    <View style={[{ marginBottom: 10 }, styles.rowBetween]}>
                        <View >
                            <Text style={styles.itemNome}>Nº Venda</Text>
                            <Text style={styles.itemSub}>{venda.numeroVenda}</Text>
                        </View>
                        <View>
                            <Text style={styles.itemNome}>Data e Hora</Text>
                            <Text style={styles.itemSub}>{venda.dataHora}</Text>
                        </View>
                    </View>
                    <View>
                        {venda.itens.map((item, index) => (
                            <View>
                                <Text style={[styles.itemNome, { marginBottom: 5 }]}>Item {index + 1}</Text>
                                <View>
                                    <Text style={styles.itemSub}>{item.nome}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <InputApp
                                            title="Valor"
                                            editable={enable}
                                            value={item.valor.toString()}
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
                                                value={item.quantidade.toString()}
                                                width={130}
                                                fullWidth
                                                borderRadius={10}
                                                marginBottom
                                            //onChangeText={(text) => setSearchReference(text)}
                                            />
                                        }
                                    </View>
                                </View>
                            </View>
                        ))}
                        <InputSelectPagamento
                            title="Forma de Pagamento"
                            options={optionsPagamento}
                            selectedValue={selectedPagamento}
                            onValueChange={(value) => handleOnValueChangePagamento(value)}
                            enable={enable}
                        />
                        {venda.formaDePagamento == "Cartão de Crédito" &&
                            <InputApp
                                title="Nº Parcelas"
                                editable={false}
                                value={venda.numeroParcelas.toString()}
                                fullWidth
                                borderRadius={10}
                                marginBottom
                            //onChangeText={(text) => setSearchReference(text)}
                            />
                        }
                        <InputApp
                            title="Valor Total"
                            editable={enable}
                            value={venda.valorTotal.toString()}
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
        marginBottom: 20
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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { ButtonDelete } from '../../../components/Buttons/ButtonDelete';
import { InputSelectPagamento } from '../../../components/InputSelectPagamento';
import { InputApp } from '../../../components/InputApp';
import { useApi } from '../../../Api/useApi';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { ModalConfirm } from '../../../components/ModalConfirm';
import { Loading } from '../../../components/Loading';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';

export const DetalhesPedidoCompra = () => {
    const [enable, setEnable] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    const route = useRoute();
    const { pedidocompra } = route.params;

    const [objPedidocompra, setObjPedidocompra] = useState({
        numero_pedido_compra: pedidocompra.numero_pedido_compra,
        forma_pagamento: pedidocompra.forma_pagamento,
        numero_parcelas: pedidocompra.numero_parcelas,
        recebido: pedidocompra.recebido,
        data_hora: pedidocompra.data_hora,
        nome_fantasia: pedidocompra.nome_fantasia,
        razao_social: pedidocompra.razao_social,
        cnpj: pedidocompra.cnpj,
        contato: pedidocompra.contato,
        valor_total: pedidocompra.valor_total,
        itens: pedidocompra.itens,
    });

    //Modais
    const [modalErrors, setModalErrors] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [titleModal, setTitleModal] = useState('Aviso');
    const [mensagemModal, setMensagemModal] = useState('Preencha todos os campos obrigatórios.');
    const [messageSucess, setMessageSucess] = useState('');

    //Lidar com a forma de pagamento
    const [optionsPagamento, setOptionsPagamento] = useState([
        'Boleto',
        'Pix'
    ]);

    const [selectedPagamento, setSelectedPagamento] = useState(objPedidocompra.forma_pagamento);

    const handleOnValueChangePagamento = (value) => {
        setSelectedPagamento(value);
        setObjPedidocompra({ ...objPedidocompra, forma_pagamento: value });
    };

    const handleInputChange = (name, value, id_item) => {
        if (name == 'quantidade' || name == 'valor') {
            const itemAtualizado = objPedidocompra.itens.map(item => {
                if (item.id_item === id_item) {

                    // Atualiza o valor específico (quantidade ou valor) do item desejado
                    return { ...item, [name]: value };
                }
                return item;
            });

            // Atualiza o estado com o array de itens atualizado
            setObjPedidocompra({ ...objPedidocompra, itens: itemAtualizado });
        } else {

            // Se o nome não for 'quantidade' ou 'valor', atualiza normalmente
            setObjPedidocompra({ ...objPedidocompra, [name]: value });
        }
    };

    const fnConfirmarRecebimento = async () => {
        setLoading(true)
        if (await useApi.confirmarRecebimento(objPedidocompra.numero_pedido_compra) == 200) {
            objPedidocompra.recebido = 1;
            setObjPedidocompra(objPedidocompra);
            setMessageSucess('Pedido compra recebido com sucesso.');
            setModalSucess(true);
            setEnable(false);
            setTimeout(() => {
                navigation.navigate('PedidoDeCompra', { pedidoRecebido: objPedidocompra });
            }, 2000);
        } else {
            setTitleModal('Erro')
            setMensagemModal('Erro ao receber pedido.');
            setModalErrors(true);
            setTimeout(() => {
                navigation.navigate('PedidoDeCompra');
            }, 2000);
        }
        setLoading(false);
    };

    //Calcular total da compra a cada nova ação nos itens
    useEffect(() => {
        let totalCompra = 0;
        for (let i = 0; i < objPedidocompra.itens.length; i++) {
            if (objPedidocompra.itens[i].hasOwnProperty('quantidade')) {
                totalCompra += objPedidocompra.itens[i].valor * objPedidocompra.itens[i].quantidade;
            }
            else {
                totalCompra += objPedidocompra.itens[i].valor;
            }
        };
        setObjPedidocompra({ ...objPedidocompra, valor_total: totalCompra });
    }, [objPedidocompra.itens]);

    const fnEditarPedido = async () => {
        setLoading(true)
        if (await useApi.editarPedido(objPedidocompra) == 200) {
            setMessageSucess('Pedido editado com sucesso.');
            setModalSucess(true);
            setEnable(false);
            setTimeout(() => {
                navigation.navigate('PedidoDeCompra', { pedidoAtualizado: objPedidocompra });
            }, 2000);
        } else {
            setTitleModal('Erro')
            setMensagemModal('Erro ao editar pedido.');
            setModalErrors(true);
            setTimeout(() => {
                navigation.navigate('PedidoDeCompra')
            }, 2000);
        }
        setLoading(false);
    };

    const handleSubmit = async () => {
        if (objPedidocompra.valor != '' &&
            objPedidocompra.quantidade != 0 &&
            objPedidocompra.forma_pagamento != '' &&
            objPedidocompra.valor_total > 0) {
            fnEditarPedido()
        }
        else {
            setModalErrors(true);
        }
    };

    const handleDelete = async () => {
        setModalConfirm(false);
        setLoading(true)
        if (await useApi.deletarPedido(objPedidocompra) == 200) {
            setMessageSucess('Pedido deletado com sucesso.');
            setModalSucess(true);
            setTimeout(() => {
                navigation.navigate('PedidoDeCompra', { pedidoDeletado: objPedidocompra });
            }, 3000);
        } else {
            setTitleModal('Erro')
            setMensagemModal('Erro ao deletar pedido.');
            setModalErrors(true);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="PedidoDeCompra" />
                    <Text style={styles.titulo}>Detalhes Pedido</Text>
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
            <ScrollView showsVerticalScrollIndicator={false}>
                {loading && <Loading />}
                {objPedidocompra.recebido != 1 && !enable &&
                    <ButtonApp
                        title="Confirmar recebimento"
                        color="#fff"
                        backgroundColor="green"
                        marginBottom={10}
                        onPress={fnConfirmarRecebimento}
                    />
                }
                <View style={[{ marginTop: 10, marginBottom: 10, marginHorizontal: 5 }, styles.rowBetween]}>
                    <View >
                        <Text style={styles.itemNome}>Nº Pedido Compra</Text>
                        <Text style={styles.itemSub}>{objPedidocompra.numero_pedido_compra}</Text>
                    </View>
                    <View>
                        <Text style={styles.itemNome}>Data e Hora</Text>
                        <Text style={styles.itemSub}>{objPedidocompra.data_hora}</Text>
                    </View>
                </View>
                <View >
                    <View style={styles.itemContainer}>
                        {objPedidocompra.itens.map((item, index) => (
                            <View key={index}>
                                <Text style={[styles.itemNome, { marginBottom: 10 }]}>{item.nome}</Text>
                                <View style={styles.rowBetween}>
                                    <InputApp
                                        title="Valor"
                                        editable={enable}
                                        value={item.valor.toString()}
                                        width={130}
                                        fullWidth
                                        borderRadius={10}
                                        marginBottom
                                        keyboardType="numeric"
                                        onChangeText={(text) => handleInputChange("valor", text)}
                                    />
                                    <InputApp
                                        title="Quantidade"
                                        editable={enable}
                                        value={item.quantidade.toString()}
                                        width={130}
                                        fullWidth
                                        borderRadius={10}
                                        marginBottom
                                        keyboardType="numeric"
                                        onChangeText={(text) => handleInputChange("quantidade", text)}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                    <Text style={[styles.itemNome, { marginTop: 10 }]}>Detalhes Fornecedor</Text>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemNome}>Nome Fantasia</Text>
                        <InputApp
                            value={objPedidocompra.nome_fantasia}
                            marginBottom={true}
                            height={30}
                            borderRadius={5}
                            editable={enable}
                            onChangeText={(text) => handleInputChange("nome_fantasia", text)}
                        />
                        <Text style={styles.itemNome}>Razão Social</Text>
                        <InputApp
                            value={objPedidocompra.razao_social}
                            marginBottom={true}
                            height={30}
                            borderRadius={5}
                            editable={enable}
                            onChangeText={(text) => handleInputChange("razao_social", text)}
                        />
                        <Text style={styles.itemNome}>CNPJ</Text>
                        <InputApp
                            value={objPedidocompra.cnpj}
                            keyboardType="numeric"
                            marginBottom={true}
                            height={30}
                            borderRadius={5}
                            editable={enable}
                            onChangeText={(text) => handleInputChange("cnpj", text)}
                        />
                        <Text style={styles.itemNome}>Contato</Text>
                        <InputApp
                            value={objPedidocompra.contato}
                            keyboardType="numeric"
                            marginBottom={true}
                            height={30}
                            borderRadius={5}
                            editable={enable}
                            onChangeText={(text) => handleInputChange("contato", text)}
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
                            editable={enable}
                            value={objPedidocompra.numero_parcelas.toString()}
                            fullWidth
                            borderRadius={10}
                            marginBottom
                            keyboardType="numeric"
                            onChangeText={(text) => handleInputChange("numero_parcelas", text)}
                        />
                        <InputApp
                            title="Valor Total"
                            editable={enable}
                            value={objPedidocompra.valor_total.toString()}
                            fullWidth
                            borderRadius={10}
                            marginBottom
                            onChangeText={(text) => handleInputChange("valor_total", text)}
                        />
                    </View>
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
                        title={titleModal}
                        message={mensagemModal}
                        openModal={modalErrors}
                        fnCloseModal={() => setModalErrors(!modalErrors)}
                    />
                    <ModalSucces
                        title="Sucesso"
                        message={messageSucess}
                        openModal={modalSucess}
                        fnCloseModal={() => setModalSucess(!modalSucess)}
                    />
                    <ModalConfirm
                        title="Atenção"
                        message="Tem certeza que deseja excluir o pedido de compra?"
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
        marginBottom: 8
    },
    titulo: {
        fontSize: 25,
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
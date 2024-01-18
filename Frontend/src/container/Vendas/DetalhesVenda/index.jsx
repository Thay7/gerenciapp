import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

import { useApi } from '../../../Api/useApi';
import { InputApp } from '../../../components/InputApp';
import { InputSelectPagamento } from '../../../components/InputSelectPagamento';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { ButtonDelete } from '../../../components/Buttons/ButtonDelete';
import { ButtonEdit } from '../../../components/Buttons/ButtonEdit';
import { ModalConfirm } from '../../../components/ModalConfirm';
import { ModalSucces } from '../../../components/ModalSucces';
import { ModalErrors } from '../../../components/ModalErrors';
import { Loading } from '../../../components/Loading';

export const DetalhesVenda = () => {
    const route = useRoute();
    const { venda } = route.params;

    const [formData, setFormData] = useState({
        id: venda.id,
        itens: venda.itens,
        forma_pagamento: venda.forma_pagamento,
        numero_parcelas: venda.numero_parcelas,
        valor_total: venda.valor_total,
        data_hora: venda.data_hora
    });

    const [enable, setEnable] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    //Modais
    const [modalErrors, setModalErrors] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [titleModal, setTitleModal] = useState('Aviso');
    const [mensagemModal, setMensagemModal] = useState('Preencha todos os campos obrigatórios.');
    const [messageSucess, setMessageSucess] = useState('');

    //Lidar com a forma de pagamento
    const [optionsPagamento, setOptionsPagamento] = useState([
        'Dinheiro',
        'Pix',
        'Cartão de Debito',
        'Cartão de Crédito'
    ]);

    const [selectedPagamento, setSelectedPagamento] = useState(formData.forma_pagamento);

    const handleOnValueChangePagamento = (value) => {
        setSelectedPagamento(value);
        setFormData({ ...formData, forma_pagamento: value });
    };

    const handleInputChange = (name, value, id_item) => {
        if (name == 'quantidade' || name == 'valor') {
            const itemAtualizado = formData.itens.map(item => {
                if (item.id_item === id_item) {

                    // Atualiza o valor específico (quantidade ou valor) do item desejado
                    return { ...item, [name]: value };
                }
                return item;
            });

            // Atualiza o estado com o array de itens atualizado
            setFormData({ ...formData, itens: itemAtualizado });
        } else {

            // Se o nome não for 'quantidade' ou 'valor', atualiza normalmente
            setFormData({ ...formData, [name]: value });
        }
    }

    //Calcular total da compra a cada nova ação nos itens
    useEffect(() => {
        let totalCompra = 0;
        for (let i = 0; i < formData.itens.length; i++) {
            if (formData.itens[i].hasOwnProperty('quantidade')) {
                totalCompra += formData.itens[i].valor * formData.itens[i].quantidade;
            }
            else {
                totalCompra += formData.itens[i].valor;
            }
        };
        setFormData({ ...formData, valor_total: totalCompra });
    }, [formData.itens]);

    const fnEditarVenda = async () => {
        setLoading(true)
        if (await useApi.editarVenda(formData) == 200) {
            setMessageSucess('Venda editada com sucesso.');
            setModalSucess(true);
            setEnable(false);
            setTimeout(() => {
                navigation.navigate('Vendas', { vendaAtualizada: formData });
            }, 3000);
        } else {
            setTitleModal('Erro')
            setMensagemModal('Erro ao editar venda.');
            setModalErrors(true);
            setTimeout(() => {
                navigation.navigate('Vendas');
            }, 3000);
        }
        setLoading(false);

    };

    const handleSubmit = async () => {
        let errors = 0;
        for (let i = 0; i < formData.itens.length; i++) {
            if (formData.itens[i].quantidade == 0 ||
                formData.itens[i].quantidade == null ||
                formData.itens[i].valor == 0 ||
                formData.itens[i].valor == null) {
                errors++;
            }
        }

        if (formData.valor != '' &&
            formData.quantidade != 0 &&
            formData.forma_pagamento != '' &&
            formData.valor_total > 0 &&
            errors == 0) {
            fnEditarVenda()
        }
        else {
            setTitleModal('Erro')
            setMensagemModal('Preencha todos os campos.');
            setModalErrors(true);
        }
    };


    const handleDelete = async () => {
        setModalConfirm(false);
        setLoading(true)
        if (await useApi.deletarVenda(formData) == 200) {
            setMessageSucess('Venda deletada com sucesso.');
            setModalSucess(true);
            setTimeout(() => {
                navigation.navigate('Vendas', { vendaDeletada: formData });
            }, 3000);
        } else {
            setTitleModal('Erro')
            setMensagemModal('Erro ao deletar venda.');
            setModalErrors(true);
        }
        setLoading(false);

    };

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Detalhes Venda</Text>
                    {!enable &&
                        <View style={styles.headerIcons}>
                            <View style={{ marginRight: 5 }}>
                                <ButtonEdit onPress={() => setEnable(true)} />
                            </View>
                            <ButtonDelete onPress={() => setModalConfirm(true)} />
                        </View>
                    }
                </View>
                {loading && <Loading />}
                <View style={[{ marginTop: 10, marginBottom: 10, marginHorizontal: 5 }, styles.rowBetween]}>
                    <View >
                        <Text style={styles.itemNome}>Nº Venda</Text>
                        <Text style={styles.itemSub}>{venda.numero_venda}</Text>
                    </View>
                    <View>
                        <Text style={styles.itemNome}>Data e Hora</Text>
                        <Text style={styles.itemSub}>{venda.data_hora}</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    {formData.itens.map((item, index) => (
                        <View key={index}>
                            <Text style={[styles.itemNome, { marginBottom: 10 }]}>{item.nome}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <InputApp
                                    title="Valor"
                                    editable={enable}
                                    value={item.valor.toString()}
                                    width={130}
                                    fullWidth
                                    borderRadius={10}
                                    marginBottom
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange("valor", text, item.id_item)}
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
                                    onChangeText={(text) => handleInputChange("quantidade", text, item.id_item)}
                                />
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.itemContainer}>
                    <InputSelectPagamento
                        title="Forma de Pagamento"
                        options={optionsPagamento}
                        selectedValue={selectedPagamento}
                        onValueChange={(value) => handleOnValueChangePagamento(value)}
                        enable={enable}
                    />
                    {formData.forma_pagamento === "Cartão de Crédito" &&
                        <InputApp
                            title="Nº Parcelas"
                            editable={enable}
                            value={formData.numero_parcelas.toString()}
                            fullWidth
                            borderRadius={10}
                            marginBottom
                            keyboardType="numeric"
                            onChangeText={(text) => handleInputChange("numero_parcelas", text)}
                        />
                    }
                    <InputApp
                        title="Valor Total"
                        editable={enable}
                        value={formData.valor_total.toString()}
                        fullWidth
                        borderRadius={10}
                        marginBottom
                        keyboardType="numeric"
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
                    message="Tem certeza que deseja excluir?"
                    openModal={modalConfirm}
                    fnCloseModal={() => setModalConfirm(!modalConfirm)}
                    fnConfirm={handleDelete}
                />
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
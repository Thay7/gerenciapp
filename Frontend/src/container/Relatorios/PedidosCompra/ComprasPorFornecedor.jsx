import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { formatterbrl } from '../../../utils/formatterbrl';
import { ModalErrors } from '../../../components/ModalErrors';
import { ButtonFilter } from '../../../components/Buttons/ButtonFilter';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';
import { useApi } from '../../../Api/useApi';
import { Loading } from '../../../components/Loading';
import { InputSelectSimples } from '../../../components/InputSelectSimples';

export const ComprasPorFornecedor = () => {
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');

    const [formData, setFormData] = useState();
    const [fornecedores, setFornecedores] = useState([]);

    const [dadosRelatorio, setDadosRelatorio] = useState([]);
    const [modalErrors, setModalErrors] = useState(false);
    const [msgError, setMsgError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePesquisar = async () => {
        if (fornecedorSelecionado != '') {
            setLoading(true)
            let jsonDadosRelatorio = await useApi.listarDadosRelatorioComprasFornecedor(formData)

            if (!jsonDadosRelatorio.length > 0) {
                setMsgError('Não há dados para o fornecedor selecionado.');
                setModalErrors(true);
            }
            else {
                setDadosRelatorio(jsonDadosRelatorio);
            }
            setLoading(false)
        }
        else {
            setMsgError('Por favor, selecione o ano.');
            setModalErrors(true);
        };
    };

    const handleClickFilter = () => {
        setDadosRelatorio([]);
        setFornecedorSelecionado('');
    };

    useEffect(() => {
        populaSelectFornecedores();
    }, [])

    const populaSelectFornecedores = async () => {
        let jsonFornecedores = await useApi.listarFornecedores()
        setFornecedores(jsonFornecedores)
    };

    useEffect(() => {
        if (fornecedorSelecionado != '')
            setFormData({ idFornecedor: fornecedorSelecionado.id })
    }, [fornecedorSelecionado])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Relatorios" />
                    <Text style={styles.titulo}>Compras pro Fornecedor</Text>
                </View>
                {dadosRelatorio.length > 0 &&
                    <View style={styles.header}>
                        <ButtonFilter onPress={handleClickFilter} />
                    </View>
                }
            </View>
            {dadosRelatorio.length > 0 &&
                <>
                    <View style={[styles.rowBetween, { marginTop: 10 }]}>
                        <Text style={styles.itemNome}>Fornecedor</Text>
                        <Text style={styles.subTitulo}>{fornecedorSelecionado.razao_social}</Text>
                    </View>
                    <View style={styles.line}></View>
                </>
            }
            <ScrollView showsVerticalScrollIndicator={false}>

                {dadosRelatorio.length == 0 ? (
                    <View style={{ marginTop: 20 }}>
                        <InputSelectSimples
                            title="Fornecedor"
                            options={fornecedores}
                            selectedValue={fornecedorSelecionado}
                            onValueChange={(value) => setFornecedorSelecionado(value)} />
                        <ButtonApp
                            title="Pesquisar"
                            color="#FFF"
                            backgroundColor="#4040ff"
                            onPress={handlePesquisar}
                        />
                    </View>
                )
                    :
                    (

                        loading == true ?
                            (
                                <View >
                                    <Loading />
                                </View>
                            )
                            :
                            (
                                <View>
                                    {dadosRelatorio.map((item, index) => (
                                        <View style={styles.itemContainer} key={index}>
                                            <View style={styles.rowBetween}>
                                                <Text style={styles.itemNome}>Número pedido:</Text>
                                                <Text style={styles.subTitulo}>{item.numero_pedido_compra}</Text>
                                            </View>
                                            <View style={styles.rowBetween}>
                                                <Text style={styles.itemNome}>Forma de pagamento:</Text>
                                                <Text style={styles.subTitulo}>{item.forma_pagamento}</Text>
                                            </View>
                                            <View style={styles.rowBetween}>
                                                <Text style={styles.itemNome}>Valor:</Text>
                                                <Text style={styles.subTitulo}>{formatterbrl(item.valor_total)}</Text>
                                            </View>
                                            <View style={styles.rowBetween}>
                                                <Text style={styles.itemNome}>Data/Hora:</Text>
                                                <Text style={styles.subTitulo}>{item.data_hora}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )
                    )}
            </ScrollView>
            <ModalErrors
                title="Aviso"
                message={msgError}
                openModal={modalErrors}
                fnCloseModal={() => setModalErrors(!modalErrors)}
            />
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
        marginBottom: 2
    },
    relatorioNome: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    line: {
        borderBottomWidth: 1,
        shadowRadius: 4,
        borderRadius: 8,
        marginBottom: 15
    },
    titulo: {
        fontSize: 21,
        fontWeight: 'bold',
        marginLeft: 15
    },
    subTitulo: {
        fontWeight: 'bold',
        color: '#4040ff'
    },
    rowBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemNome: {
        fontWeight: 'bold',
        marginBottom: 5
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
        marginVertical: 4
    }
});
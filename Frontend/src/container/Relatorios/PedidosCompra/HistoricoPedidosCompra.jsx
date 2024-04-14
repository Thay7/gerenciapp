import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { InputSelectRelatorios } from '../../../components/InputSelectRelatorios';
import { formatterbrl } from '../../../utils/formatterbrl';
import { ModalErrors } from '../../../components/ModalErrors';
import { ButtonFilter } from '../../../components/Buttons/ButtonFilter';
import { ButtonBack } from '../../../components/Buttons/ButtonBack';
import { useApi } from '../../../Api/useApi';
import { Loading } from '../../../components/Loading';

export const HistoricoPedidosCompra = () => {
    const [anoSelecionado, setAnoSelecionado] = useState('');
    const [mesSelecionado, setMesSelecionado] = useState('');

    const [formData, setFormData] = useState();
    const [meses, setMeses] = useState('');
    const [anos, setAnos] = useState('');

    const [dadosRelatorio, setDadosRelatorio] = useState([]);
    const [itemMaisVendido, setItemMaisVendido] = useState('');
    const [modalErrors, setModalErrors] = useState(false);
    const [msgError, setMsgError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePesquisar = async () => {
        if (anoSelecionado != '') {
            setLoading(true)
            let jsonDadosRelatorio = await useApi.listarDadosRelatorioHistoricoPedidosCompra(formData)
            setDadosRelatorio(jsonDadosRelatorio);
            setLoading(false)
        }
        else {
            setMsgError('Por favor, selecione o ano.');
            setModalErrors(true);
        };
    };

    const handleClickFilter = () => {
        setDadosRelatorio([]);
        setAnoSelecionado('');
        setMesSelecionado('');
    };

    useEffect(() => {
        populaSelectsMesAno();
    }, [])

    const populaSelectsMesAno = async () => {
        let jsonAnos = await useApi.listarAnosDisponiveisPedidosCompra()
        setAnos(jsonAnos)

        let jsonMeses = await useApi.listarMesesDisponiveisPedidosCompra()
        setMeses(jsonMeses)
    };

    useEffect(() => {
        if (anoSelecionado != '')
            setFormData({ ...formData, ano: anoSelecionado })
        if (mesSelecionado != '')
            setFormData({ ...formData, mes: mesSelecionado })
    }, [anoSelecionado, mesSelecionado])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Relatorios" />
                    <Text style={styles.titulo}>Relatório</Text>
                </View>
                {dadosRelatorio.length > 0 &&
                    <View style={styles.header}>
                        <ButtonFilter onPress={handleClickFilter} />
                    </View>
                }
            </View>
            <Text style={styles.relatorioNome}>Historico Pedidos Compra</Text>
            {dadosRelatorio.length == 0 ? (
                <View style={{ marginTop: 20 }}>
                    <InputSelectRelatorios
                        title="Ano"
                        options={anos}
                        selectedValue={anoSelecionado}
                        onValueChange={(value) => setAnoSelecionado(value)} />
                    <InputSelectRelatorios
                        title="Mês"
                        options={meses}
                        selectedValue={mesSelecionado}
                        onValueChange={(value) => setMesSelecionado(value)} />
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
                            <View style={{ marginTop: 25 }}>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.itemNome}>Mês/Ano</Text>
                                    <Text style={styles.subTitulo}>{mesSelecionado} {anoSelecionado}</Text>
                                </View>
                                <View style={styles.line}></View>
                                <ScrollView showsVerticalScrollIndicator={false}>
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
                                </ScrollView>
                            </View>
                        )
                )}
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
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 15
    },
    subTitulo: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#4040ff'
    },
    rowBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemNome: {
        fontSize: 17,
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
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { InputSelectRelatorios } from '../../../components/InputSelectRelatorios';
import { formatterbrl } from '../../../utils/formatterbrl';
import { ModalErrors } from '../../../components/ModalErrors';
import { ButtonFilter } from '../../../components/Buttons/ButtonFilter';

export const VendasPorMesAno = () => {
    const [anoSelecionado, setAnoSelecionado] = useState('');
    const [mesSelecionado, setMesSelecionado] = useState('');

    const [meses, setMeses] = useState([
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]);
    const [anos, setAnos] = useState([
        '2023'
    ]);

    const [dados, setDados] = useState([
        { ano: '2023', mes: 'Agosto', totalVendas: '10351.17' },
        { ano: '2023', mes: 'Setembro', totalVendas: '11454.94' },
        { ano: '2023', mes: 'Outubro', totalVendas: '10942.44' },
        { ano: '2023', mes: 'Novembro', totalVendas: '12093.11' },
        { ano: '2023', mes: 'Dezembro', totalVendas: '3749.27' }
    ]);

    const [dadosRelatorio, setDadosRelatorio] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [modalErrors, setModalErrors] = useState(false);
    const [msgError, setMsgError] = useState('');

    const handlePesquisar = () => {
        if (anoSelecionado != '') {
            if (anoSelecionado != '' && mesSelecionado != '') {
                setDadosFiltrados(dados.filter(item => item.ano === anoSelecionado && item.mes === mesSelecionado));
            } else {
                setDadosFiltrados(dados.filter(item => item.ano === anoSelecionado));
            }

            if (dadosFiltrados.length > 0) {
                setDadosRelatorio(dadosFiltrados);
            }
            else {
                setMsgError('Não há dados para o ano/mês selecionado.');
                setModalErrors(true);
            }
        } else {
            setMsgError('Por favor, selecione o ano.');
            setModalErrors(true);
        }
    };

    const handleClickFilter = () => {
        setDadosRelatorio([]);
        setAnoSelecionado('');
        setMesSelecionado('');

        console.log(dadosRelatorio)
        console.log(anoSelecionado)
        console.log(mesSelecionado)


    };

    useEffect(() => {

    }, [])

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Relatório</Text>
                    {dadosRelatorio.length > 0 &&
                        <ButtonFilter
                            onpress={handleClickFilter}
                        />
                    }
                </View>
                {/* <Text style={styles.subTitulo}>Vendas por mês/ano</Text> */}
                {!dadosRelatorio.length > 0 &&
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
                }
                {dadosRelatorio.length > 0 &&
                    dadosRelatorio.map((item, index) => (
                        <View style={styles.itemContainer} key={index}>
                            <View style={styles.rowBetween}>
                                <View>
                                    <Text style={styles.itemNome}>Mês</Text>
                                    <Text style={styles.valorDestacado}>{item.mes}</Text>
                                </View>
                                <View>
                                    <Text style={styles.itemNome}>Total vendas</Text>
                                    <Text style={[styles.valor, styles.valorDestacado]}>{formatterbrl(item.totalVendas)}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                <ModalErrors
                    title="Aviso"
                    message={msgError}
                    openModal={modalErrors}
                    fnCloseModal={() => setModalErrors(!modalErrors)}
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
    subTitulo: {
        fontSize: 20,
        color: '#4040ff'
    },
    rowBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        shadowRadius: 4,
        borderRadius: 8,
        marginVertical: 4
    },
    itemNome: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5
    },
    valor: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    valorDestacado: {
        color: '#4040ff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
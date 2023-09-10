import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useNavigation } from '@react-navigation/native';

//import componentes personalizados 
import { InputApp } from '../../../components/InputApp';
import { InputSelectItens } from '../../../components/InputSelectItens';
import { formatterbrl } from '../../../utils/formatterbrl';
import { InputSelectPagamento } from '../../../components/InputSelectPagamento';

//import icon
import ic_remove from '../../../icons/ic_remove.png'
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';

export const NovaVenda = () => {
    //Step 1 - Itens
    const [optionsItens, setOptionsItens] = useState(
        [
            { id: 1, nome: 'Oléo Mobil', valor: 10, tipo: "Produto" },
            { id: 2, nome: 'Oléo Dulub', valor: 12, tipo: "Produto" },
            { id: 3, nome: 'Rolamento', valor: 12, tipo: "Produto" },
            { id: 4, nome: 'Viseira', valor: 12, tipo: "Produto" },
            { id: 5, nome: 'Luz Pisca - Biz', valor: 12, tipo: "Produto" },
            { id: 6, nome: 'Cabo de Freio', valor: 12, tipo: "Produto" },
            { id: 7, nome: 'Troca de Oléo', valor: 12, tipo: "Serviço" },
            { id: 8, nome: 'Remendo Pneu Moto', valor: 12, tipo: "Serviço" },
            { id: 9, nome: 'Remendo Pneu Carro', valor: 12, tipo: "Serviço" }
        ]
    );

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [objVenda, setObjVenda] = useState({
        itens: null,
        pagamento: null
    });

    //Infos venda
    const [itensVenda, setItensVenda] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);

    //Onchange do select dos itens
    const handleOnValueChange = (value) => {
        setSelectedProduct(value);

        //Adicionando o item clicado à venda
        if (!itensVenda.includes(value))
            itensVenda.push(value);

        //Removendo o item da lista de opções
        const updatedOptions = optionsItens.filter(item => item.id !== value.id);
        setOptionsItens(updatedOptions);

        //Inicializando o produto sempre com quantidade 1
        if (value.tipo == "Produto")
            handleChangeQtde(value, '1');
    };

    const handleRemoveItem = (value) => {
        //Adicionando o item ao select
        itensVenda.forEach(element => {
            if (element.id == value.id) {
                optionsItens.push(element);
            }
        });

        //Removendo o item da venda
        const updatedItensVenda = itensVenda.filter(item => item.id !== value.id);
        setItensVenda(updatedItensVenda);
        setSelectedProduct(null);

        if (!itensVenda.length > 0)
            setTotalCompra(0);
    };

    const handleChangeQtde = (item, value) => {
        //Removendo o item sem a quantidade
        const updatedItensVenda = itensVenda.filter(item => item.id !== value.id);
        setItensVenda(updatedItensVenda);

        //Adicionando à quantidade ao item
        itensVenda.forEach(element => {
            if (element.id == item.id) {
                if (value == 0) {
                    element.quantidade = 1;
                }
                else {
                    element.quantidade = value;
                }
            }
        });
    };

    //Calcular total da compra a cada nova ação dos itens
    useEffect(() => {
        let totalCompra = 0;
        for (let i = 0; i < itensVenda.length; i++) {
            if (itensVenda[i].hasOwnProperty('quantidade'))
                totalCompra += itensVenda[i].valor * itensVenda[i].quantidade;
            else {
                totalCompra += itensVenda[i].valor;
            }
        };
        setTotalCompra(totalCompra);
    }, [selectedProduct, itensVenda])

    const removeBtnStep1 = itensVenda.length > 0 ? false : true;

    //Validações antes de ir para o step 2
    const [errorsStep1, setErrorsStep1] = useState(false);
    const [modalErrorsStep1, setModalErrorsStep1] = useState(false);

    const handleOnNextStep1 = () => {
        let error = 0;

        for (let i = 0; i < itensVenda.length; i++) {
            console.log(itensVenda[i].tipo)
            console.log(itensVenda[i].nome)
            if (itensVenda[i].tipo == "Produto") {
                if (itensVenda[i].quantidade == 0 || itensVenda[i].quantidade == null) {
                    console.log(itensVenda[i].nome);
                    error++;
                }
            }
        }

        if (error > 0) {
            setErrorsStep1(true);
            setModalErrorsStep1(true);
        }
    };

    //Step 2 - Pagamento
    const [optionsPagamento, setOptionsPagamento] = useState([
        'Dinheiro',
        'Pix',
        'Cartão de Debito',
        'Cartão de Crédito'
    ]);

    const [selectedPagamento, setSelectedPagamento] = useState(null);
    const [numeroParcelas, setNumeroParcelas] = useState(1);

    const handleOnValueChangePagamento = (value) => {
        setSelectedPagamento(value);
    };

    const handleChangeParcelas = (value) => {
        setNumeroParcelas(value);
    };

    const handleChangeValorTotal = (value) => {
        setTotalCompra(value);
    };

    //Validações antes de ir para o próximo step
    const [errorsStep2, setErrorsStep2] = useState(false);
    const [modalErrorsStep2, setModalErrorsStep2] = useState(false);
    const [messageModalErrorStep2, setMessageModalErrorStep2] = useState('');
    const handleOnNextStep2 = () => {
        let error = 0;

        if (numeroParcelas <= 0 || numeroParcelas == null) {
            error++;
            setMessageModalErrorStep2('Número de parcelas tem que ser maior que 0.');
        }
        else if (totalCompra <= 0 || numeroParcelas == null) {
            error++;
            setMessageModalErrorStep2('Valor total tem que ser maior que 0.');
        }
        else if ((numeroParcelas <= 0 || numeroParcelas == null) && (totalCompra <= 0 || numeroParcelas == null)) {
            error++;
            setMessageModalErrorStep2('Número de parcelas e valor total tem que ser maior que 0.');
        }

        if (error > 0) {
            setErrorsStep2(true);
            setModalErrorsStep2(true);
        }
    };

    const removeBtnStep2 = selectedPagamento == 'Dinheiro' || selectedPagamento == 'Pix'
        || selectedPagamento == 'Cartão de Debito' || selectedPagamento == 'Cartão de Crédito' ? false : true;

    //Styles Stepper
    const buttonTextStyle = {
        color: '#4040ff',
    };

    const buttonStyle = {
        marginHorizontal: -50,
    };

    const progressStepsStyle = {
        activeStepIconBorderColor: '#4040ff',
        activeLabelColor: '#4040ff',
        activeStepNumColor: 'white',
        activeStepIconColor: '#4040ff',
        completedStepIconColor: '#4040ff',
        completedProgressBarColor: '#4040ff',
        completedCheckColor: 'white',
    };

    //Step 3 - Finalização
    //Montando o JSON da venda para enviar ao banco
    const [modalSucces, setModalSucces] = useState(false);
    const onSubmit = () => {
        setObjVenda({
            //itensVenda.nome, itensVenda.quantidade, itensVenda.valor
            itens: itensVenda,
            pagamento: [{ formaPagamento: selectedPagamento }, { numeroParcelas: numeroParcelas }, { valorTotal: totalCompra }],
            dataHora: new Date()
        })

        setModalSucces(true);
    };

    const navigation = useNavigation()

    const handleModalSucces = () => {
        navigation.navigate('Vendas');
        setModalSucces(false);
    }

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Nova Venda</Text>
                </View>
                <ProgressSteps
                    {...progressStepsStyle}
                >
                    <ProgressStep
                        label="Itens"
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        nextBtnText="Próximo"
                        nextBtnStyle={buttonStyle}
                        previousBtnText="Voltar"
                        removeBtnRow={removeBtnStep1}
                        onNext={handleOnNextStep1}
                        errors={errorsStep1}
                    >
                        <InputSelectItens
                            title="Selecione os itens"
                            options={optionsItens}
                            selectedValue={selectedProduct}
                            onValueChange={(value) => handleOnValueChange(value)}
                        />
                        {itensVenda.length > 0 && <Text style={[styles.itemNome]}>Itens Venda</Text>}
                        <View>
                            {itensVenda.map((item, i) => (
                                item.tipo == "Produto" ?
                                    (
                                        <View style={styles.itemContainer} key={i}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => handleRemoveItem(item)}>
                                                <Image source={ic_remove} style={styles.icon} />
                                            </TouchableOpacity>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={styles.itemNome}>{item.tipo == "Produto" ? "Produto" : "Serviço"}</Text>
                                                    <Text >{item.nome}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.itemNome}>Valor</Text>
                                                    <Text>{formatterbrl(item.valor)}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.itemNome}>Quantidade</Text>
                                                    <InputApp
                                                        value={item.quantidade}
                                                        onChangeText={(value) => handleChangeQtde(item, value)}
                                                        keyboardType="numeric"
                                                        marginBottom={false}
                                                        height={25}
                                                        borderRadius={5}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    )
                                    :
                                    (
                                        <View style={styles.itemContainer} key={i}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => handleRemoveItem(item)}>
                                                <Image source={ic_remove} style={styles.icon} />
                                            </TouchableOpacity>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <View>
                                                    <Text style={styles.itemNome}>{item.tipo == "Produto" ? "Produto" : "Serviço"}</Text>
                                                    <Text >{item.nome}</Text>
                                                </View>
                                                <View style={{ marginLeft: 58 }}>
                                                    <Text style={styles.itemNome}>Valor</Text>
                                                    <Text>{formatterbrl(item.valor)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                            ))}
                            {
                                itensVenda.length > 0 &&
                                <View >
                                    <Text style={styles.value}>Valor Total:</Text>
                                    <Text style={styles.value}>{formatterbrl(totalCompra)}</Text>
                                </View>
                            }
                        </View>
                        <ModalErrors
                            title="Erro"
                            message="Quantidade precisa ser maior que 0."
                            openModal={modalErrorsStep1}
                            fnCloseModal={() => setModalErrorsStep1(!modalErrorsStep1)}
                        />
                    </ProgressStep>
                    <ProgressStep
                        label="Pagamento"
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        nextBtnText="Próximo"
                        previousBtnText="Voltar"
                        removeBtnRow={removeBtnStep2}
                        onNext={handleOnNextStep2}
                        errors={errorsStep2}
                    >
                        <InputSelectPagamento
                            title="Selecione a forma de pagamento"
                            options={optionsPagamento}
                            selectedValue={selectedPagamento}
                            onValueChange={(value) => handleOnValueChangePagamento(value)}
                        />
                        {selectedPagamento != null && <Text style={styles.itemNome}>Itens Venda</Text>}
                        {(selectedPagamento == "Dinheiro" || selectedPagamento == "Pix" || selectedPagamento == "Cartão de Debito") &&
                            itensVenda.map((item, i) => (
                                <View style={[styles.itemContainer, { marginBottom: 1 }]} key={i}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View>
                                            <Text style={styles.itemNome}>{item.tipo == "Produto" ? "Produto" : "Serviço"}</Text>
                                            <Text >{item.nome}</Text>
                                        </View>
                                        <View style={{ marginLeft: 58 }}>
                                            <Text style={styles.itemNome}>Valor</Text>
                                            <Text>{formatterbrl(item.valor)}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                        {selectedPagamento == "Cartão de Crédito" &&
                            itensVenda.map((item, i) => (
                                <View style={[styles.itemContainer, { marginBottom: 1 }]} key={i}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View>
                                            <Text style={styles.itemNome}>{item.tipo == "Produto" ? "Produto" : "Serviço"}</Text>
                                            <Text>{item.nome}</Text>
                                        </View>
                                        <View style={{ marginLeft: 58 }}>
                                            <Text style={styles.itemNome}>Valor</Text>
                                            <Text>{formatterbrl(item.valor)}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        {selectedPagamento == "Cartão de Crédito" ?
                            (
                                <>
                                    <Text style={[styles.itemNome, { marginTop: 10 }]}>Detalhes Parcelamento</Text>
                                    <View style={[styles.itemContainer, { marginBottom: 1 }]}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={styles.itemNome}>Nº Parcelas</Text>
                                            <InputApp
                                                value={numeroParcelas.toString()}
                                                onChangeText={(value) => handleChangeParcelas(value)}
                                                keyboardType="numeric"
                                                marginBottom={false}
                                                height={30}
                                                width={100}
                                                borderRadius={5}
                                                alignSelf="flex-end"
                                            />
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View>
                                                <Text style={styles.itemNome}>Valor Total</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                {/* <Text style={{ fontSize: 16, marginRight: 3 }}>R$</Text> */}
                                                <InputApp
                                                    value={totalCompra.toString()}
                                                    onChangeText={(value) => handleChangeValorTotal(value)}
                                                    keyboardType="numeric"
                                                    marginBottom={false}
                                                    height={30}
                                                    width={100}
                                                    borderRadius={5}
                                                    alignSelf="flex-end"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </>
                            ) :
                            (
                                selectedPagamento != null && (
                                    <>
                                        <Text style={styles.value}>Valor Total:</Text>
                                        <Text style={styles.value}>{formatterbrl(totalCompra)}</Text>
                                    </>
                                )
                            )
                        }
                        <ModalErrors
                            title="Erro"
                            message={messageModalErrorStep2}
                            openModal={modalErrorsStep2}
                            fnCloseModal={() => setModalErrorsStep2(!modalErrorsStep2)}
                        />
                    </ProgressStep>
                    <ProgressStep
                        progressBarColor='#4040ff'
                        label="Finalizar"
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        previousBtnText="Voltar"
                        finishBtnText="Finalizar"
                        onSubmit={onSubmit}
                    >
                        <Text style={styles.itemNome}>Resumo Itens</Text>
                        <View >
                            {/* <Text style={styles.itemNome}>Itens</Text> */}
                            {itensVenda.map((item, i) => (
                                item.tipo == "Produto" ?
                                    (
                                        <View style={[styles.itemContainer, { marginBottom: 1 }]} key={i}>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={styles.itemNome}>{item.tipo == "Produto" ? "Produto" : "Serviço"}</Text>
                                                    <Text >{item.nome}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.itemNome}>Valor</Text>
                                                    <Text>{formatterbrl(item.valor)}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.itemNome}>Quantidade</Text>
                                                    <Text>{item.quantidade}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                    :
                                    (
                                        <View style={[styles.itemContainer, { marginBottom: 1 }]} key={i}>
                                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 1 }}>
                                                <View>
                                                    <Text style={styles.itemNome}>{item.tipo == "Produto" ? "Produto" : "Serviço"}</Text>
                                                    <Text>{item.nome}</Text>
                                                </View>
                                                <View style={{ marginLeft: 58 }}>
                                                    <Text style={styles.itemNome}>Valor</Text>
                                                    <Text>{formatterbrl(item.valor)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                            ))}
                        </View>
                        <Text style={[styles.itemNome, { marginTop: 15 }]}>Resumo Pagamento</Text>
                        <View style={styles.itemContainer}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.itemNome}>Forma de pagamento</Text>
                                <Text>{selectedPagamento}</Text>
                            </View>
                            {selectedPagamento == "Cartão de Crédito" &&
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.itemNome}>Nº Parcelas</Text>
                                    <Text>{numeroParcelas}</Text>
                                </View>
                            }
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.itemNome}>Valor Total</Text>
                                <Text>{formatterbrl(totalCompra)}</Text>
                            </View>

                        </View>
                        <ModalSucces
                            title="Sucesso"
                            message="Venda realizada com sucesso!"
                            openModal={modalSucces}
                            fnCloseModal={handleModalSucces}
                        />
                    </ProgressStep>
                </ProgressSteps>
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
    },
    titulo: {
        fontSize: 35,
        fontWeight: 'bold',
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
        position: 'relative',
        marginRight: 10,
        marginBottom: 6
    },
    closeButton: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'red',
        width: 25,
        height: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 10,
        height: 10
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
    title: {
        marginBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',
    },
    value: {
        alignSelf: 'flex-end',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginRight: 10
    },
});
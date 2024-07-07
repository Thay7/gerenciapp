import { useEffect, useState } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useNavigation } from '@react-navigation/native';

//import componentes personalizados 
import { useApi } from '../../../Api/useApi';
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { InputApp } from '../../../components/InputApp';
import { formatterbrl } from '../../../utils/formatterbrl';
import { ModalReaproveitarPedidoCompra } from '../../../components/ModalReaproveitarPedidoCompra';
import { InputSelectPagamento } from '../../../components/InputSelectPagamento';
import { InputSelectItens } from '../../../components/InputSelectItens';
import { InputSelectSimples } from '../../../components/InputSelectSimples';
import { formatterdate } from '../../../utils/formatterdate';
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';
import { Loading } from '../../../components/Loading';

//import icons
import ic_remove from '../../../icons/ic_remove.png'
import { ButtonBack } from '../../../components/Buttons/ButtonBack';

export const NovoPedidoCompra = () => {
    //Step 1 - Itens
    const [optionsItens, setOptionsItens] = useState([]);

    useEffect(() => {
        buscarProdutosSelect()
    }, [])

    const buscarProdutosSelect = async () => {
        let json = await useApi.listarProdutos()
        setOptionsItens(json)
    };;

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [objPedidoCompra, setObjPedidoCompra] = useState(null);

    //Infos
    const [itensCompra, setItensCompra] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);

    //Onchange do select dos itens
    const handleOnValueChange = (value) => {
        setSelectedProduct(value);
        verificaItemPresente(value);

        //Inicializando o produto sempre com quantidade 1
        if (value.tipo == "Produto")
            handleChangeQtde(value, '1');
    };

    const verificaItemPresente = (itemClicado) => {
        // Verifica se o item clicado já está na lista
        const itemAlreadyInCompra = itensCompra.some(item => item.id === itemClicado.id);

        // Adiciona o item clicado à lista
        if (!itemAlreadyInCompra)
            itensCompra.push(itemClicado);

        //Removendo o item da lista de opções
        const updatedOptions = optionsItens.filter(item => item.id !== itemClicado.id);
        setOptionsItens(updatedOptions);
    };

    const handleRemoveItem = (value) => {
        //Adicionando o item ao select
        itensCompra.forEach(element => {
            if (element.id == value.id) {
                optionsItens.push(element);
            }
        });

        //Removendo o item
        const updatedItensVenda = itensCompra.filter(item => item.id !== value.id);
        setItensCompra(updatedItensVenda);
        setSelectedProduct(null);

        if (!itensCompra.length > 0)
            setTotalCompra(0);
    };

    const handleChangeQtde = (item, value) => {
        //Removendo o item sem a quantidade
        const updatedItensVenda = itensCompra.filter(item => item.id !== value.id);
        setItensCompra(updatedItensVenda);

        //Adicionando à quantidade ao item
        itensCompra.forEach(element => {
            if (element.id == item.id) {
                element.quantidade = value;
            }
        });
    };

    //Calcular total da compra a cada nova ação dos itens
    useEffect(() => {
        let totalCompra = 0;
        for (let i = 0; i < itensCompra.length; i++) {
            if (itensCompra[i].hasOwnProperty('quantidade'))
                totalCompra += itensCompra[i].valor_compra * itensCompra[i].quantidade;
            else {
                totalCompra += itensCompra[i].valor_compra;
            }
        };
        setTotalCompra(totalCompra);
    }, [selectedProduct, itensCompra])

    const removeBtnStep1 = itensCompra.length > 0 ? false : true;

    //Validações antes de ir para o step 2
    const [errorsStep1, setErrorsStep1] = useState(false);
    const [modalErrorsStep1, setModalErrorsStep1] = useState(false);

    const handleOnNextStep1 = (reaproveitarPedido) => {
        if (reaproveitarPedido) {
            setErrorsStep1(false);
            setModalErrorsStep1(false);
        }
        else {
            let error = 0;

            for (let i = 0; i < itensCompra.length; i++) {
                if (itensCompra[i].tipo == "Produto") {
                    if (itensCompra[i].quantidade == 0 || itensCompra[i].quantidade == null) {
                        error++;
                    }
                }
            }

            if (error > 0) {
                setErrorsStep1(true);
                setModalErrorsStep1(true);
            }
            else {
                setErrorsStep1(false);
                setModalErrorsStep1(false);
            }
        }
    };

    //Step 2 - Pagamento
    const [optionsPagamento, setOptionsPagamento] = useState([
        'Boleto',
        'Pix'
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

    const handleOnNextStep2 = (reaproveitarPedido) => {
        if (reaproveitarPedido) {
            setErrorsStep2(false);
            setModalErrorsStep2(false);
        }
        else {
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
            else {
                setErrorsStep2(false);
                setModalErrorsStep2(false);
            }
        }
    };

    const removeBtnStep2 = selectedPagamento == 'Pix' || selectedPagamento == 'Boleto' ? false : true;

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

    //Step 3 - Fornecedor

    useEffect(() => {
        buscarFornecedores()
    }, [])

    const buscarFornecedores = async () => {
        let json = await useApi.listarFornecedores()
        setOptionsFornecedor(json)
    };

    const [optionsFornecedor, setOptionsFornecedor] = useState([]);
    const [selectedFornecedor, setSelectedFornecedor] = useState(null);
    const [modalSucess, setModalSucess] = useState(false);

    const removeBtnStep3 = selectedFornecedor != null ? false : true;

    const handleOnValueFornecedorChange = (value) => {
        setSelectedFornecedor(value);
    };

    //Step 4 - Finalização
    const [loading, setLoading] = useState(false);

    const handleNovoPedidoCompra = async () => {
        setLoading(true)
        if (await useApi.cadastrarPedidoCompra(objPedidoCompra) == 200) {
            setLoading(false);

            //Montando mensagem a ser enviada ao fornecedor ao wpp com o pedido
            let textoPedido = `Olá ${selectedFornecedor.nome_fantasia}!\nAqui está meu pedido:\n\n`;

            itensCompra.forEach(element => {
                textoPedido += `${element.nome} - Quantidade: ${element.quantidade}\n`
            });

            textoPedido += `\nForma de pagamento: ${selectedPagamento}`
            numeroParcelas > 1 ? textoPedido += `\nNúmero de parcelas: ${numeroParcelas}` : textoPedido += ''

            const textoCodificado = encodeURIComponent(textoPedido);
            const numeroFornecedorTeste = "5584981839328";
            const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroFornecedorTeste}&text=${textoCodificado}`;

            Linking.openURL(linkWhatsApp).catch(err => console.error('Erro ao redirecionar:', err));

            objPedidoCompra.recebido = 0;
            setModalSucess(true);
            setTimeout(() => {
                navigation.navigate('PedidoDeCompra', {
                    novoPedidoCompra: objPedidoCompra
                });
            }, 3000);
        } else {
            setModalErrorsStep2(true);
            setModalErrorsStep2("Erro ao realizar pedido de compra. Entre em contato com o suporte.");
            setTimeout(() => {
                navigation.navigate('PedidoDeCompra');
            }, 3000);
        }
    }

    useEffect(() => {
        const dataHoraAtual = new Date();
        setObjPedidoCompra({
            itens: itensCompra,
            forma_pagamento: selectedPagamento,
            numero_parcelas: numeroParcelas,
            valor_total: totalCompra,
            data_hora: formatterdate(dataHoraAtual),
            fornecedor: selectedFornecedor
        })
    }, [itensCompra, selectedPagamento, numeroParcelas, totalCompra, selectedFornecedor])

    const [modalSucces, setModalSucces] = useState(false);
    const onSubmit = () => {
        if (
            objPedidoCompra.itens &&
            objPedidoCompra.forma_pagamento &&
            objPedidoCompra.numero_parcelas &&
            objPedidoCompra.valor_total &&
            objPedidoCompra.data_hora &&
            objPedidoCompra.fornecedor
        ) {
            handleNovoPedidoCompra();
        }
    };

    const navigation = useNavigation()

    const handleModalSucces = () => {
        navigation.navigate('PedidoDeCompra');
        setModalSucces(false);
    }

    // Modal reaproveitar pedido compra
    const [pedidosCompraList, setPedidosCompraList] = useState(
        [
            // {
            //     numeroCompra: '012023',
            //     itens: [
            //         { id: 1, nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
            //         { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
            //         { id: 3, nome: 'Caixa Rolamento biz', valor: '110', quantidade: '2' },
            //         { id: 4, nome: 'Viseira', valor: '110', quantidade: '2' },
            //         { id: 5, nome: 'Luz Pisca - Biz', valor: '110', quantidade: '2' },
            //         { id: 6, nome: 'Cabo de Freio', valor: '110', quantidade: '2' },
            //         { id: 7, nome: 'Camara de ar 18', valor: '120', quantidade: '2' },
            //         { id: 8, nome: 'Patins de freio', valor: '120', quantidade: '2' },
            //         { id: 9, nome: 'Pneu moto', valor: '120', quantidade: '2' }
            //     ],
            //     formaDePagamento: 'Boleto',
            //     numeroParcelas: '1',
            //     valorTotal: '230',
            //     dataHora: '10/09/2023 14:20',
            //     status: 'Efetuado'
            // },
            // {
            //     numeroCompra: '022023',
            //     itens: [
            //         { id: 6, nome: 'Cabo de Freio', valor: '110', quantidade: '2' },
            //         { id: 9, nome: 'Pneu moto', valor: '120', quantidade: '2' }
            //     ],
            //     formaDePagamento: 'Pix',
            //     numeroParcelas: '1',
            //     valorTotal: '34',
            //     dataHora: '10/09/2023 14:00',
            //     status: 'Recebido'
            // },
            // {
            //     numeroCompra: '032023',
            //     itens: [
            //         { id: 8, nome: 'Patins de freio', valor: '120', quantidade: '2' },
            //         { id: 5, nome: 'Luz Pisca - Biz', valor: '110', quantidade: '2' },
            //     ],
            //     formaDePagamento: 'Pix',
            //     numeroParcelas: '1',
            //     valorTotal: '34',
            //     dataHora: '10/09/2023 14:00',
            //     status: 'Recebido'
            // },
            // {
            //     numeroCompra: '042023',
            //     itens: [
            //         { id: 4, nome: 'Viseira', valor: '110', quantidade: '2' },
            //         { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
            //     ],
            //     formaDePagamento: 'Pix',
            //     numeroParcelas: '1',
            //     valorTotal: '34',
            //     dataHora: '10/09/2023 14:00',
            //     status: 'Recebido'
            // },
            // {
            //     numeroCompra: '052023',
            //     itens: [
            //         { nome: 'Cabo de Freio', valor: '50', quantidade: '2' },
            //         { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
            //     ],
            //     formaDePagamento: 'Pix',
            //     numeroParcelas: '1',
            //     valorTotal: '34',
            //     dataHora: '10/09/2023 14:00',
            //     status: 'Recebido'
            // },
            // {
            //     numeroCompra: '062023',
            //     itens: [
            //         { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
            //         { nome: 'Pneu Moto', valor: '100', quantidade: '2' }
            //     ],
            //     formaDePagamento: 'Pix',
            //     numeroParcelas: '1',
            //     valorTotal: '34',
            //     dataHora: '10/09/2023 14:00',
            //     status: 'Recebido'
            // },
            // {
            //     numeroCompra: '072023',
            //     itens: [
            //         { nome: 'Cabo de Freio', valor: '50', quantidade: '2' },
            //         { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
            //     ],
            //     formaDePagamento: 'Pix',
            //     numeroParcelas: '1',
            //     valorTotal: '34',
            //     dataHora: '10/09/2023 14:00',
            //     status: 'Recebido'
            // },
        ]
    );

    useEffect(() => {
        fnListarPedidosCompras()
    }, []);

    const fnListarPedidosCompras = async () => {
        let json = await useApi.listarPedidosCompras()
        setPedidosCompraList(json)
    }

    const [openModalPedidoCompra, setOpenModalPedidoCompra] = useState(false);
    const [reaproveitarPedidoCompra, setReaproveitarPedidoCompra] = useState(false);
    const [itensReaproveitamento, setItensReaproveitamento] = useState([]);

    const fnReaproveitarPedido = () => {
        setOpenModalPedidoCompra(true);
        setItensCompra([]);
    };

    const fnHandleSelectedItem = (objPedidoCompra) => {
        objPedidoCompra.itens.forEach(element => {
            handleOnValueChange(element);
        });

        setItensReaproveitamento(objPedidoCompra.itens);
        setReaproveitarPedidoCompra(true)
        setOpenModalPedidoCompra(!openModalPedidoCompra)
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonBack navigate="PedidoDeCompra" />
                <Text style={styles.titulo}>Novo Pedido Compra</Text>
            </View>
            <ModalReaproveitarPedidoCompra
                title="Selecionar pedido compra"
                openModal={openModalPedidoCompra}
                pedidosCompraList={pedidosCompraList}
                fnCloseModal={() => setOpenModalPedidoCompra(false)}
                handleSelectedItem={fnHandleSelectedItem}
            />
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
                    onNext={() => handleOnNextStep1(false)}
                    errors={errorsStep1}
                >
                    {loading && <Loading />}
                    <InputSelectItens
                        title="Selecione os itens"
                        options={optionsItens}
                        selectedValue={selectedProduct}
                        onValueChange={(value) => handleOnValueChange(value)}
                        pedidoCompra
                    />
                    <ButtonApp
                        title={!reaproveitarPedidoCompra || (reaproveitarPedidoCompra && itensCompra.length <= 0) ? "Reaproveitar pedido de compra" : "Selecionar outro pedido de compra"}
                        color="#fff"
                        backgroundColor="#4040ff"
                        onPress={fnReaproveitarPedido}
                        marginBottom={10}
                    />
                    {itensCompra.length > 0 && <Text style={[styles.itemNome]}>Itens Compra</Text>}
                    <View>
                        {itensCompra.map((item, i) => (
                            <View style={styles.itemContainer} key={i}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => handleRemoveItem(item)}>
                                    <Image source={ic_remove} style={styles.icon} />
                                </TouchableOpacity>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={styles.itemNome}>{item.tipo != null ? item.tipo : 'Produto'}</Text>
                                        <Text >{item.nome}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemNome}>Valor</Text>
                                        <Text>{formatterbrl(item.valor_compra)}</Text>
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
                        ))}
                        {
                            itensCompra.length > 0 &&
                            <View >
                                <Text style={styles.value}>Valor Total:</Text>
                                <Text style={styles.value}>{formatterbrl(totalCompra)}</Text>
                            </View>
                        }
                    </View>
                    <ModalErrors
                        title="Aviso"
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
                        enable
                    />
                    {selectedPagamento != null && (
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
                            <Text style={styles.value}>Valor Total:</Text>
                            <Text style={styles.value}>{formatterbrl(totalCompra)}</Text>
                        </>
                    )}
                    < ModalErrors
                        title="Erro"
                        message={messageModalErrorStep2}
                        openModal={modalErrorsStep2}
                        fnCloseModal={() => setModalErrorsStep2(!modalErrorsStep2)}
                    />
                </ProgressStep>
                <ProgressStep
                    label="Fornecedor"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    nextBtnText="Próximo"
                    previousBtnText="Voltar"
                    removeBtnRow={removeBtnStep3}
                >
                    <InputSelectSimples
                        title="Selecione o forecedor"
                        options={optionsFornecedor}
                        selectedValue={selectedFornecedor}
                        onValueChange={(value) => handleOnValueFornecedorChange(value)}
                    />
                    {selectedFornecedor != null &&
                        <>
                            <Text style={[styles.itemNome, { marginTop: 10 }]}>Detalhes Fornecedor</Text>
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemNome}>Nome Fantasia</Text>
                                <InputApp
                                    value={selectedFornecedor.nome_fantasia}
                                    keyboardType="numeric"
                                    marginBottom={true}
                                    height={30}
                                    borderRadius={5}
                                />
                                <Text style={styles.itemNome}>Razão Social</Text>
                                <InputApp
                                    value={selectedFornecedor.razao_social}
                                    keyboardType="numeric"
                                    marginBottom={true}
                                    height={30}
                                    borderRadius={5}
                                />
                                <Text style={styles.itemNome}>CNPJ</Text>
                                <InputApp
                                    value={selectedFornecedor.cnpj}
                                    keyboardType="numeric"
                                    marginBottom={true}
                                    height={30}
                                    borderRadius={5}
                                />
                                <Text style={styles.itemNome}>Contato</Text>
                                <InputApp
                                    value={selectedFornecedor.contato}
                                    keyboardType="numeric"
                                    marginBottom={true}
                                    height={30}
                                    borderRadius={5}
                                />
                            </View>
                        </>
                    }
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
                        {itensCompra.map((item, i) => (

                            <View style={[styles.itemContainer, { marginBottom: 1 }]} key={i}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={styles.itemNome}>{item.tipo != null ? item.tipo : 'Produto'}</Text>
                                        <Text style={{ fontSize: 15 }}>{item.nome}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemNome}>Valor</Text>
                                        <Text style={{ fontSize: 15 }}>{formatterbrl(item.valor_compra)}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemNome}>Quantidade</Text>
                                        <Text style={{ fontSize: 15 }}>{item.quantidade}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    {selectedFornecedor != null &&
                        <>
                            < Text style={[styles.itemNome, { marginTop: 15 }]}>Resumo Fornecedor</Text>
                            <View style={styles.itemContainer}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.itemNome}>Nome Fantasia</Text>
                                    <Text style={{ fontSize: 15 }}>{selectedFornecedor.nome_fantasia}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.itemNome}>CNPJ</Text>
                                    <Text style={{ fontSize: 15 }}>{selectedFornecedor.cnpj}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.itemNome}>Contato</Text>
                                    <Text style={{ fontSize: 15 }}>{selectedFornecedor.contato}</Text>
                                </View>
                            </View>
                            <Text style={[styles.itemNome, { marginTop: 15 }]}>Resumo Pagamento</Text>
                            <View style={styles.itemContainer}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.itemNome}>Forma de pagamento</Text>
                                    <Text style={{ fontSize: 15 }}>{selectedPagamento}</Text>
                                </View>
                                {selectedPagamento == "Boleto" &&
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.itemNome}>Nº Parcelas</Text>
                                        <Text style={{ fontSize: 15 }}>{numeroParcelas}</Text>
                                    </View>
                                }
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.itemNome}>Valor Total</Text>
                                    <Text style={{ fontSize: 15 }}>{formatterbrl(totalCompra)}</Text>
                                </View>
                            </View>
                        </>
                    }
                    <ModalSucces
                        title="Sucesso"
                        message="Peiddo compra realizado com sucesso!"
                        openModal={modalSucces}
                        fnCloseModal={handleModalSucces}
                    />
                </ProgressStep>
            </ProgressSteps>
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
        alignItems: 'center'
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
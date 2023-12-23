import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useNavigation } from '@react-navigation/native';

//import componentes personalizados 
import { ButtonApp } from '../../../components/Buttons/ButtonApp';
import { InputApp } from '../../../components/InputApp';
import { formatterbrl } from '../../../utils/formatterbrl';
import { ModalReaproveitarPedidoCompra } from '../../../components/ModalReaproveitarPedidoCompra';
import { InputSelectPagamento } from '../../../components/InputSelectPagamento';
import { InputSelectItens } from '../../../components/InputSelectItens';
import { InputSelectSimples } from '../../../components/InputSelectSimples';

//import icons
import ic_remove from '../../../icons/ic_remove.png'
import { ModalErrors } from '../../../components/ModalErrors';
import { ModalSucces } from '../../../components/ModalSucces';


export const NovoPedidoCompra = () => {
    //Step 1 - Itens
    const [optionsItens, setOptionsItens] = useState(
        [
            { id: 1, nome: 'Caixa Oléo Mobil', valor: 10, tipo: 'Produto' },
            { id: 2, nome: 'Caixa Oléo Dulub', valor: 12, tipo: 'Produto' },
            { id: 3, nome: 'Caixa Rolamento biz', valor: 12, tipo: 'Produto' },
            { id: 4, nome: 'Viseira', valor: 12, tipo: 'Produto' },
            { id: 5, nome: 'Luz Pisca - Biz', valor: 12, tipo: 'Produto' },
            { id: 6, nome: 'Cabo de Freio', valor: 12, tipo: 'Produto' },
            { id: 7, nome: 'Camara de ar 18', valor: 12, tipo: 'Produto' },
            { id: 8, nome: 'Patins de freio', valor: 12, tipo: 'Produto' },
            { id: 9, nome: 'Pneu moto', valor: 12, tipo: 'Produto' }
        ]
    );
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [objVenda, setObjVenda] = useState({
        itens: null,
        pagamento: null
    });

    //Infos venda
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
        // Verifica se o item clicado já está na lista de vendas
        const itemAlreadyInCompra = itensCompra.some(item => item.id === itemClicado.id);

        // Adiciona o item clicado à lista de vendas
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

        //Removendo o item da venda
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
        console.log('entrou no useeffect')
        let totalCompra = 0;
        for (let i = 0; i < itensCompra.length; i++) {
            if (itensCompra[i].hasOwnProperty('quantidade'))
                totalCompra += itensCompra[i].valor * itensCompra[i].quantidade;
            else {
                totalCompra += itensCompra[i].valor;
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
    const [optionsFornecedor, setOptionsFornecedor] = useState([
        { id: 1, nomeFantasia: 'AutoPeças Master', razaoSocial: 'Master Autopeças Ltda', cnpj: '12.345.678/0001-90', contato: '(84) 9 9999-9991' },
        { id: 2, nomeFantasia: 'MecânicaParts', razaoSocial: 'Mecânica Parts Distribuidora de Peças Automotivas EIRELI', cnpj: '98.765.432/0001-21', contato: '(84) 9 9999-9992' },
    ]);
    const [selectedFornecedor, setSelectedFornecedor] = useState(null);
    const removeBtnStep3 = selectedFornecedor != null ? false : true;

    const handleOnValueFornecedorChange = (value) => {
        setSelectedFornecedor(value);
    };

    //Step 4 - Finalização
    //Montando o JSON da venda para enviar ao banco
    const [modalSucces, setModalSucces] = useState(false);
    const onSubmit = () => {
        setObjVenda({
            //itensVenda.nome, itensVenda.quantidade, itensVenda.valor
            itens: itensCompra,
            pagamento: [{ formaPagamento: selectedPagamento }, { numeroParcelas: numeroParcelas }, { valorTotal: totalCompra }],
            dataHora: new Date()
        })

        if (objVenda != null) {

            let textoPedido = `Olá ${selectedFornecedor.nomeFantasia}!\nAqui está meu pedido:\n\n`;

            itensCompra.forEach(element => {
                textoPedido += `${element.nome} - Quantidade: ${element.quantidade}\n`
                console.log(textoPedido)
            });

            textoPedido += `\nForma de pagamento: ${selectedPagamento}`
            numeroParcelas > 1 ? textoPedido += `\nNúmero de parcelas: ${numeroParcelas}` : textoPedido += ''

            const textoCodificado = encodeURIComponent(textoPedido);
            const numeroFornecedorTeste = "5584981839328";
            const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroFornecedorTeste}&text=${textoCodificado}`;

            Linking.openURL(linkWhatsApp).catch(err => console.error('Erro ao redirecionar:', err));
        }

        //salvar o pedido no banco para listagem posterior - colocar botao para usuario informar se o pedido foi realizado de fato
        navigation.navigate('PedidoDeCompra');
    };

    const navigation = useNavigation()

    const handleModalSucces = () => {
        navigation.navigate('PedidoDeCompra');
        setModalSucces(false);
    }

    // Reaproveitar pedido compra
    const [pedidosCompraList, setPedidosCompraLista] = useState(
        [
            {
                numeroCompra: '012023',
                itens: [
                    { id: 1, nome: 'Caixa Oléo Mobil', valor: '120', quantidade: '2' },
                    { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                    { id: 3, nome: 'Caixa Rolamento biz', valor: '110', quantidade: '2' },
                    { id: 4, nome: 'Viseira', valor: '110', quantidade: '2' },
                    { id: 5, nome: 'Luz Pisca - Biz', valor: '110', quantidade: '2' },
                    { id: 6, nome: 'Cabo de Freio', valor: '110', quantidade: '2' },
                    { id: 7, nome: 'Camara de ar 18', valor: '120', quantidade: '2' },
                    { id: 8, nome: 'Patins de freio', valor: '120', quantidade: '2' },
                    { id: 9, nome: 'Pneu moto', valor: '120', quantidade: '2' }
                ],
                formaDePagamento: 'Boleto',
                numeroParcelas: '1',
                valorTotal: '230',
                dataHora: '10/09/2023 14:20',
                status: 'Efetuado'
            },
            {
                numeroCompra: '022023',
                itens: [
                    { id: 6, nome: 'Cabo de Freio', valor: '110', quantidade: '2' },
                    { id: 9, nome: 'Pneu moto', valor: '120', quantidade: '2' }
                ],
                formaDePagamento: 'Pix',
                numeroParcelas: '1',
                valorTotal: '34',
                dataHora: '10/09/2023 14:00',
                status: 'Recebido'
            },
            {
                numeroCompra: '032023',
                itens: [
                    { id: 8, nome: 'Patins de freio', valor: '120', quantidade: '2' },
                    { id: 5, nome: 'Luz Pisca - Biz', valor: '110', quantidade: '2' },
                ],
                formaDePagamento: 'Pix',
                numeroParcelas: '1',
                valorTotal: '34',
                dataHora: '10/09/2023 14:00',
                status: 'Recebido'
            },
            {
                numeroCompra: '042023',
                itens: [
                    { id: 4, nome: 'Viseira', valor: '110', quantidade: '2' },
                    { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                ],
                formaDePagamento: 'Pix',
                numeroParcelas: '1',
                valorTotal: '34',
                dataHora: '10/09/2023 14:00',
                status: 'Recebido'
            },
            {
                numeroCompra: '052023',
                itens: [
                    { nome: 'Cabo de Freio', valor: '50', quantidade: '2' },
                    { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                ],
                formaDePagamento: 'Pix',
                numeroParcelas: '1',
                valorTotal: '34',
                dataHora: '10/09/2023 14:00',
                status: 'Recebido'
            },
            {
                numeroCompra: '062023',
                itens: [
                    { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                    { nome: 'Pneu Moto', valor: '100', quantidade: '2' }
                ],
                formaDePagamento: 'Pix',
                numeroParcelas: '1',
                valorTotal: '34',
                dataHora: '10/09/2023 14:00',
                status: 'Recebido'
            },
            {
                numeroCompra: '072023',
                itens: [
                    { nome: 'Cabo de Freio', valor: '50', quantidade: '2' },
                    { id: 2, nome: 'Caixa Oléo Dulub', valor: '110', quantidade: '2' },
                ],
                formaDePagamento: 'Pix',
                numeroParcelas: '1',
                valorTotal: '34',
                dataHora: '10/09/2023 14:00',
                status: 'Recebido'
            },
        ]
    );

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
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Nova Pedido Compra</Text>
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
                        <InputSelectItens
                            title="Selecione os itens"
                            options={optionsItens}
                            selectedValue={selectedProduct}
                            onValueChange={(value) => handleOnValueChange(value)}
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
                        />

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
                        {selectedPagamento != null && (
                            <>
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
                                        value={selectedFornecedor.nomeFantasia}
                                        keyboardType="numeric"
                                        marginBottom={true}
                                        height={30}
                                        borderRadius={5}
                                    />
                                    <Text style={styles.itemNome}>Razão Social</Text>
                                    <InputApp
                                        value={selectedFornecedor.razaoSocial}
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
                                            <Text style={{ fontSize: 15 }}>{formatterbrl(item.valor)}</Text>
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
                                        <Text style={{ fontSize: 15 }}>{selectedFornecedor.nomeFantasia}</Text>
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
                            message="Venda realizada com sucesso!"
                            openModal={modalSucces}
                            fnCloseModal={handleModalSucces}
                        />
                    </ProgressStep>
                </ProgressSteps>
            </View>
        </ScrollView >
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
        fontSize: 30,
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
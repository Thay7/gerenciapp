import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

//import componentes personalizados 
import { InputApp } from '../InputApp';
import { InputSelectItens } from '../InputSelectItens';
import { formatterbrl } from '../../utils/formatterbrl';
import { InputSelectPagamento } from '../InputSelectPagamento/indes';

//import icon
import ic_remove from '../../icons/ic_remove.png'

export const Stepper = () => {
    //Step 1 - Itens
    const [optionsItens, setOptionsItens] = useState(
        [
            { id: 1, nome: 'Oléo Mobil', valor: 10, tipo: "Produto" },
            { id: 2, nome: 'Produto 2', valor: 12, tipo: "Produto" },
            { id: 3, nome: 'Produto 3', valor: 12, tipo: "Produto" },
            { id: 4, nome: 'Produto 4', valor: 12, tipo: "Produto" },
            { id: 5, nome: 'Produto 5', valor: 12, tipo: "Produto" },
            { id: 6, nome: 'Produto 6', valor: 12, tipo: "Produto" },
            { id: 7, nome: 'Troca de Oléo', valor: 12, tipo: "Serviço" },
            { id: 8, nome: 'Serviço 8', valor: 12, tipo: "Serviço" },
            { id: 9, nome: 'Serviço 9', valor: 12, tipo: "Serviço" },
            { id: 10, nome: 'Serviço 10', valor: 12, tipo: "Serviço" },
            { id: 11, nome: 'Serviço 11', valor: 12, tipo: "Serviço" },
        ]
    );

    const [selectedProduct, setSelectedProduct] = useState(null);

    //Infos venda
    const [itensVenda, setItensVenda] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);

    //Onchange do select
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
    }, [handleOnValueChange, handleRemoveItem, handleChangeQtde])

    //Validações antes de ir para o próximo step
    const handleOnNextStep1 = () => {
        let error = 0;
        for (let i = 0; i < itensVenda.length; i++) {
            if (itensVenda[i].quantidade == 0 || itensVenda[i].quantidade == null) {
                error++;
            }
        }
        if (error > 0) {
            console.log(error);
        }
    };

    const removeBtnStep1 = itensVenda.length > 0 ? false : true;

    //Step 2 - Pagamento
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

    const handleChangeDesconto = (item, value) => {
        //Removendo o item sem a quantidade
        const updatedItensVenda = itensVenda.filter(item => item.id !== value.id);
        setItensVenda(updatedItensVenda);

        //Adicionando à quantidade ao item
        itensVenda.forEach(element => {
            if (element.id == item.id) {
                element.desconto = value;
            }
        });
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

    return (
        <ScrollView>
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
                    onNext={() => handleOnNextStep1()}
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
                                <Text style={styles.value}>Valor Total: {formatterbrl(totalCompra)}</Text>
                            </View>
                        }
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Pagamento"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    nextBtnText="Próximo"
                    previousBtnText="Voltar"
                    removeBtnRow={removeBtnStep2}
                >
                    <InputSelectPagamento
                        title="Selecione a forma de pagamento"
                        options={optionsPagamento}
                        selectedValue={selectedPagamento}
                        onValueChange={(value) => handleOnValueChangePagamento(value)}
                    />
                    {selectedPagamento != null && <Text style={styles.itemNome}>Resumo Venda</Text>}
                    {(selectedPagamento == "Dinheiro" || selectedPagamento == "Pix" || selectedPagamento == "Cartão de Debito") &&
                        itensVenda.map((item, i) => (
                            <View style={styles.itemContainer} key={i}>
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
                            <View style={styles.itemContainer} key={i}>
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
                        ))}
                    {selectedPagamento == "Cartão de Crédito" ?
                        (
                            <>
                                <Text style={[styles.itemNome, { marginTop: 10 }]}>Detalhes Pagamento</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                    <View>
                                        <InputApp
                                            title="Nº Parcelas"
                                            value="1"
                                            // onChangeText={(value) => handleChangeDesconto(item, value)}
                                            keyboardType="numeric"
                                            marginBottom={false}
                                            height={30}
                                            width={100}
                                            borderRadius={5}
                                            alignSelf="flex-end"
                                        />
                                    </View>
                                    <View style={{ marginLeft: 58 }}>
                                        <InputApp
                                            title="Valor Total"
                                            value={totalCompra.toString()}
                                            // onChangeText={(value) => handleChangeDesconto(item, value)}
                                            keyboardType="numeric"
                                            marginBottom={false}
                                            height={30}
                                            width={100}
                                            borderRadius={5}
                                            alignSelf="flex-end"
                                        />
                                    </View>
                                </View>
                            </>
                        ) :
                        (
                            selectedPagamento != null && <Text style={styles.value}>Valor Total: {formatterbrl(totalCompra)}</Text>
                        )
                    }
                </ProgressStep>
                <ProgressStep
                    progressBarColor='#4040ff'
                    label="Finalizar"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    previousBtnText="Voltar"
                    finishBtnText="Finalizar"
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 3!</Text>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </ScrollView >
    )
};

const styles = StyleSheet.create({
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
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { InputApp } from '../InputApp';
import { InputSelect } from '../InputSelect';
import { useState } from 'react';
import { formatterbrl } from '../../utils/formatterbrl';

export const Stepper = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productsList, setProductsList] = useState(
        [
            { id: 1, nome: 'Produto 1', valor: 12 },
            { id: 2, nome: 'Produto 2', valor: 12 },
            { id: 3, nome: 'Produto 3', valor: 12 },
            { id: 4, nome: 'Produto 4', valor: 12 },
            { id: 5, nome: 'Produto 5', valor: 12 },
            { id: 6, nome: 'Produto 6', valor: 12 },
            { id: 7, nome: 'Produto 7', valor: 12 },
            { id: 8, nome: 'Produto 8', valor: 12 },
            { id: 9, nome: 'Produto 9', valor: 12 },
            { id: 10, nome: 'Produto 10', valor: 12 },
            { id: 11, nome: 'Produto 11', valor: 12 },
        ]
    );

    //Itens da venda
    const [produtosVenda, setProdutosVenda] = useState([]);

    const handleOnValueChange = (value) => {
        setSelectedProduct(value);

        if (!produtosVenda.includes(value))
            produtosVenda.push(value);

        // Remover o produto da lista de produtos disponíveis
        const updatedProductsList = productsList.filter(item => item.id !== value.id);
        setProductsList(updatedProductsList);
    };

    const buttonTextStyle = {
        color: '#4040ff',
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

    const removeBtnStep1 = produtosVenda.length > 0 ? false : true;


    return (
        <ScrollView>
            <ProgressSteps
                {...progressStepsStyle}
            >
                <ProgressStep
                    completedStepIconColor='#4040ff'
                    label="Produtos"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    nextBtnText="Próximo"
                    previousBtnText="Voltar"
                    removeBtnRow={removeBtnStep1}
                >
                    <InputSelect
                        title="Selecione os Produtos"
                        options={productsList}
                        selectedValue={selectedProduct}
                        onValueChange={(value) => handleOnValueChange(value)}
                    />
                    <View>
                        {produtosVenda.length > 0 &&
                            <Text style={styles.title}>Produtos Selecionados</Text>
                        }
                        {produtosVenda.map((item, i) => (
                            <View style={styles.itemContainer} key={i}>
                                <Text style={styles.itemNome}>{item.nome}</Text>
                                <Text>Valor: {formatterbrl(item.valor)}</Text>
                            </View>
                        ))}
                    </View>
                </ProgressStep>
                <ProgressStep
                    progressBarColor='#4040ff'
                    label="Pagamento"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    nextBtnText="Próximo"
                    previousBtnText="Voltar"
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 2!</Text>
                    </View>
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

    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        marginBottom: 5,
        fontSize: 24,
        fontWeight: 'bold',
    }
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';
import { useRoute } from "@react-navigation/native";

import { Loading } from '../../components/Loading'
import { ButtonBack } from '../../components/Buttons/ButtonBack';
import { InputApp } from '../../components/InputApp';
import { InputSelectSimples } from '../../components/InputSelectSimples';
import { ButtonApp } from '../../components/Buttons/ButtonApp';
import { ModalErrors } from '../../components/ModalErrors';

export const ListarProdutosServicos = () => {
    const navigation = useNavigation()
    const [optionsSelect, setOptionsSelect] = useState(['Produtos', 'Serviços']);
    const [selectedOption, setSelectedOption] = useState('');
    const [modalErrors, setModalErrors] = useState(false);

    const handleOnValueChange = (value) => {
        setSelectedOption(value);
    };

    const handleRedirect = () => {
        if (selectedOption != '') {
            if (selectedOption == 'Produtos')
                navigation.navigate('Produtos')
            else
                navigation.navigate('Servicos')

            setSelectedOption('');
        }
        else {
            setModalErrors(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Home" />
                    <Text style={styles.titulo}>Lista Produtos/Servicos</Text>
                </View>
            </View>
            <ScrollView >
                <InputSelectSimples
                    options={optionsSelect}
                    selectedValue={selectedOption}
                    onValueChange={(value) => handleOnValueChange(value)}
                />
                <ButtonApp
                    title="Pesquisar"
                    backgroundColor="#4040ff"
                    color="#FFF"
                    onPress={handleRedirect}
                />
                <ModalErrors
                    title="Aviso"
                    message="Selecione Produto ou Serviço"
                    openModal={modalErrors}
                    fnCloseModal={() => setModalErrors(!modalErrors)}
                />
            </ScrollView >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemSub: {
        fontSize: 16,
        color: '#666'
    }
});


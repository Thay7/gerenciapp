import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
//import { useApi } from '../../Api/useApi';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { ModalSearch } from '../../components/ModalSearch/index';
//import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
//import { ButtonSearch } from '../../components/Buttons/ButtonSearch';
import { Stepper } from '../../../components/Stepper';

export const NovaVenda = () => {
    const [vendasList, setVendasList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        listaEstoque()
    }, []);

    const listaEstoque = async () => {
        setLoading(true)
        //let json = await useApi.listarEstoque()
        //setVendasList(json)
        setVendasList([])
        setLoading(false)
    }

    const navigation = useNavigation()

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Nova Venda</Text>
                </View>
                <Stepper

                >
                </Stepper>
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
    }
});
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';
import { ButtonBack } from '../../components/Buttons/ButtonBack';

export const Cadastros = () => {
    const [cadastrosList, setCadastrosList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listaCadastros()
    }, []);

    const listaCadastros = async () => {
        setLoading(true);
        let json = await useApi.listarCadastros();
        setCadastrosList(json);
        setLoading(false);
    }
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonBack navigate="Home" />
                <Text style={styles.titulo}>Cadastros</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 16 }}>
                    {cadastrosList.map((item, index) => (
                        <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => {
                            navigation.navigate('ListaCadastros', { item: item })
                        }}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.itemNome}>{item.nome}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView >
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
        marginBottom: 16
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
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSub: {
        fontSize: 16,
        color: '#666',
    },
    cleanFilterText: {
        color: 'red',
        alignSelf: 'flex-end',
        marginBottom: 5
    },
    rowBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
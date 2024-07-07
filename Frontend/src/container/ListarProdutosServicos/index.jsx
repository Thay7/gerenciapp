import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ButtonBack } from '../../components/Buttons/ButtonBack';

export const ListarProdutosServicos = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header}>
                    <ButtonBack navigate="Home" />
                    <Text style={styles.titulo}>Lista Produtos/Servicos</Text>
                </View>
            </View>
            <ScrollView >
                <TouchableOpacity style={styles.itemContainer} onPress={() => {
                    navigation.navigate('Produtos')
                }}>
                    <View >
                        <Text style={styles.itemNome}>Produtos</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={() => {
                    navigation.navigate('Servicos')
                }}>
                    <View >
                        <Text style={styles.itemNome}>Serviços</Text>
                    </View>
                </TouchableOpacity>
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
        justifyContent: 'space-between',
        marginBottom: 10
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
        marginVertical: 4
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});


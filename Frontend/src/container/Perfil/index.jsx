import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Button } from 'react-native'
import { InputApp } from '../../components/InputApp'
import { ButtonApp } from '../../components/Buttons/ButtonApp'
import ic_editar_perfil from '../../icons/Perfil/ic_editar_perfil.png'

export const Perfil = () => {
    const [userInformation, setUserInformations] = useState({
        name: 'Maria Ozanilda Rodrigues Martins',
        email: 'nilda.rodrigues@gmail.com',
        cnpj: '48.523.384/0001-53',
        companyName: 'Borracharia do Valdir',
        cep: '59900000',
        address: 'Rua Maria Jose Dantas',
        number: '1415',
        neighborhood: 'Arizona',
        city: 'Pau dos Ferros',
        state: 'Rio Grande do Norte'
    })

    const formatCep = (value) => {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
        return value;
    }

    const formatCnpj = (value) => {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5");
        return value;
    }

    const handleInputChange = (fieldName, value) => {
        setUserInformations({
            ...userInformation,
            [fieldName]: value,
        })
    }

    const [isEditableUser, setIsEditableUser] = useState(false)
    const [isEditableCompany, setIsEditableCompany] = useState(false)

    const handleEditUser = () => {
        setIsEditableUser(true);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>Meu Estoque</Text>
                    <Text style={styles.subHeaderText}>Borracharia do Valdir</Text>
                </View>
            </View>
            <View style={styles.containerUser}>
                <View style={styles.section}>
                    <View style={styles.headerSection}>
                        <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.value}>{userInformation.name}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email: </Text>
                        <Text style={styles.value}>{userInformation.email}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.headerSection}>
                        <Text style={styles.sectionTitle}>Dados Empresa</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CNPJ: </Text>
                        <Text>{userInformation.cnpj}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.value}>{userInformation.companyName}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CEP: </Text>
                        <Text style={styles.value}>{userInformation.cep}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Endereço: </Text>
                        <Text style={styles.value}>{userInformation.address}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Número: </Text>
                        <Text style={styles.value}>{userInformation.number}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Bairro: </Text>
                        <Text style={styles.value}>{userInformation.neighborhood}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Cidade: </Text>
                        <Text style={styles.value}>{userInformation.city}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Estado: </Text>
                        <Text style={styles.value}>{userInformation.state}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        height: 80,
        marginTop: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
    },
    subHeaderText: {
        fontSize: 20,
        color: '#666666',
    },
    containerUser: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 1,
    },
    section: {
        marginVertical: 10,
        width: '100%',
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 20,
    },
    inputContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3
    },
    label: {
        fontWeight: 'bold',
        fontSize: 17
    },
    containerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        marginBottom: 5
    }
})

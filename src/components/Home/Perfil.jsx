import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { InputApp } from '../InputApp'
import { ButtonApp } from '../ButtonApp'
import ic_editar_perfil from '../../icons/Perfil/ic_editar_perfil.png'
import { Image } from 'react-native'



export const Perfil = () => {
    const [userInformation, setUserInformations] = useState({
        name: 'Maria Ozanilda Rodrigues Martins',
        email: 'nilda.rodrigues@gmail.com',
        cnpj: '48523384000153',
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
                        <TouchableOpacity
                            onPress={() => setIsEditableUser(true)}
                        >
                            <Image
                                source={ic_editar_perfil}
                                style={{ width: 35, height: 35 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="Nome"
                            value={userInformation.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                            editable={isEditableUser}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="Email"
                            value={userInformation.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            editable={isEditableUser}
                        />
                    </View>
                    {isEditableUser &&
                        <View style={styles.containerButtons}>
                            <ButtonApp
                                title="Salvar"
                                backgroundColor="#4040ff"
                                color="#FFF"
                                marginBottom={10}
                                width={140}
                            />
                            <ButtonApp
                                title="Cancelar"
                                backgroundColor="#FF0000"
                                color="#FFF"
                                marginBottom={10}
                                width={140}
                                onPress={() => setIsEditableUser(false)}
                            />
                        </View>
                    }
                </View>
                <View style={styles.section}>
                    <View style={styles.headerSection}>
                        <Text style={styles.sectionTitle}>Dados Empresa</Text>
                        <TouchableOpacity
                            onPress={() => setIsEditableCompany(true)}
                        >
                            <Image
                                source={ic_editar_perfil}
                                style={{ width: 35, height: 35 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="CNPJ"
                            value={formatCnpj(userInformation.cnpj)}
                            onChangeText={(value) => setUserInformations({ ...userInformation, cnpj: value })}
                            editable={isEditableCompany}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="Nome"
                            value={userInformation.companyName}
                            onChangeText={(text) => handleInputChange('companyName', text)}
                            editable={isEditableCompany}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="CEP"
                            value={formatCep(userInformation.cep)}
                            onChangeText={(value) => setUserInformations({ ...userInformation, cep: value })}
                            keyboardType="numeric"
                            editable={isEditableCompany}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="Endereço"
                            value={userInformation.address}
                            onChangeText={(text) => handleInputChange('address', text)}
                            editable={isEditableCompany}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="Número"
                            value={userInformation.number}
                            onChangeText={(text) => handleInputChange('number', text)}
                            editable={isEditableCompany}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="Bairro"
                            value={userInformation.neighborhood}
                            onChangeText={(text) => handleInputChange('neighborhood', text)}
                            editable={isEditableCompany}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="Cidade"
                            value={userInformation.city}
                            onChangeText={(text) => handleInputChange('city', text)}
                            editable={isEditableCompany}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <InputApp
                            title="Estado"
                            value={userInformation.state}
                            onChangeText={(text) => handleInputChange('state', text)}
                            editable={isEditableCompany}
                        />
                    </View>
                    {isEditableCompany &&
                        <View style={styles.containerButtons}>
                            <ButtonApp
                                title="Salvar"
                                backgroundColor="#4040ff"
                                color="#FFF"
                                marginBottom={10}
                                width={140}
                            />
                            <ButtonApp
                                title="Cancelar"
                                backgroundColor="#FF0000"
                                color="#FFF"
                                marginBottom={10}
                                width={140}
                                onPress={() => setIsEditableCompany(false)}
                            />
                        </View>
                    }
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
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        // maxWidth: 800,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 16,
    },
    inputContainer: {
        marginBottom: 10
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

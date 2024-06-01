import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApi } from '../../Api/useApi';
import { InputApp } from '../../components/InputApp';
import { Loading } from '../../components/Loading';
import { ButtonEdit } from '../../components/Buttons/ButtonEdit';
import { ButtonApp } from '../../components/Buttons/ButtonApp';
import { ButtonDelete } from '../../components/Buttons/ButtonDelete';
import { ModalErrors } from '../../components/ModalErrors';
import { ModalSucces } from '../../components/ModalSucces';
import { ModalConfirm } from '../../components/ModalConfirm'
import { ButtonLogOut } from '../../components/Buttons/ButtonLogOut';

export const Perfil = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);

    //Modais
    const [modalErrors, setModalErrors] = useState(false);
    const [titleModal, setTitleModal] = useState('Aviso');
    const [mensagemModal, setMensagemModal] = useState('');

    const [formData, setFormData] = useState({
        nome: '',
        usuario: '',
        email: ''
    });

    const fetchUserInfo = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                const response = await useApi.dadosPerfil(userId);
                setFormData({
                    nome: response.usuario.nome,
                    usuario: response.usuario.usuario,
                    email: response.usuario.email,

                });
            } catch (err) {
                setMensagemModal('Erro ao obter informações do usuário:', err);
                setModalErrors(true);
            }
        } else {
            setMensagemModal('Usuário não autenticado.');
            setModalErrors(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const logout = async (navigation) => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Perfil</Text>
                <View style={styles.headerIcons}>
                    <ButtonLogOut onPress={() => logout(navigation)} />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    {loading ? <Loading /> : (
                        <>
                            <InputApp
                                title="Nome"
                                editable={false}
                                value={formData.nome}
                                fullWidth
                                borderRadius={10}
                                marginBottom
                                onChangeText={(text) => handleInputChange("nome", text)}
                            />
                            <InputApp
                                title="Usuário"
                                editable={false}
                                value={formData.usuario}
                                fullWidth
                                borderRadius={10}
                                marginBottom
                                onChangeText={(text) => handleInputChange("nome", text)}
                            />
                            <InputApp
                                title="Email"
                                editable={false}
                                value={formData.email}
                                fullWidth
                                borderRadius={10}
                                marginBottom
                                onChangeText={(text) => handleInputChange("cod_produto", text)}
                            />
                        </>
                    )}
                    <ModalErrors
                        title={titleModal}
                        message={mensagemModal}
                        openModal={modalErrors}
                        fnCloseModal={() => setModalErrors(!modalErrors)}
                    />
                </View>
            </ScrollView >
        </View >
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
        marginBottom: 20
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerIcons: {
        display: 'flex',
        flexDirection: 'row',
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemSub: {
        fontSize: 16,
        color: '#666',
    },
    cleanFilterText: {
        color: 'red',
        alignSelf: 'flex-end',
        marginBottom: 5
    }
});
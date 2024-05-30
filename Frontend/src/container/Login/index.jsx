import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Componentes
import { InputApp } from "../../components/InputApp";
import { ButtonApp } from '../../components/Buttons/ButtonApp'
import logoGerenciApp from '../../icons/logoGerenciApp.png'
import { useApi } from "../../Api/useApi";
import { ModalErrors, modalErrors } from "../../components/ModalErrors/index"

export const Login = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [modalErrors, setModalErrors] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [menssagemModal, setMenssagemModal] = useState('');

    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        login: '',
        senha: ''
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const fnLogin = async () => {
        // setLoading(true)
        try {
            const response = await useApi.login(formData);
            if (response.status === 200) {
                const token = response.data.token;
                await AsyncStorage.setItem('token', token);
                navigation.navigate('Home');
            } else {
                setTitleModal('Erro')
                setMenssagemModal('Credenciais inválidas.');
                setModalErrors(true);
            }
        } catch (error) {
            setTitleModal('Erro')
            setMenssagemModal('Ocorreu um erro ao fazer login.');
            setModalErrors(true);
        }
        // setLoading(false);
        setFormData({
            login: '',
            senha: ''
        })
    };

    const handleLogin = () => {
        if (formData.login == "" || formData.senha == "") {
            setTitleModal('Erro');
            setMenssagemModal('Preencha todos os campos.');
            setModalErrors(true);
        } else {
            fnLogin();
        };
    };

    const handleLogoAnimationEnd = () => {
        setShowLoginForm(true);
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            navigation.navigate('Home');
        } else {
            navigation.navigate('Login');
        }
    };

    useEffect(() => {
        checkToken();
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.View
                animation="zoomIn"
                duration={3000}
                onAnimationEnd={handleLogoAnimationEnd}
            >
                {!showLoginForm && <View style={styles.contentHeader}>
                    <Image source={logoGerenciApp} style={styles.logoImage} />
                </View>}
            </Animatable.View>
            {showLoginForm && (
                <Animatable.View
                    animation="slideInUp"
                    duration={700}
                >
                    <View>
                        <Text style={styles.loginText}>
                            Login
                        </Text>
                        <InputApp
                            title="Usuário"
                            placeholder="Informe seu usuário"
                            value={formData.login}
                            onChangeText={(text) => handleInputChange("login", text)}
                            marginBottom={true}
                            borderRadius={10}

                        />
                        <InputApp
                            title="Senha"
                            placeholder="Informe sua senha"
                            secureTextEntry={true}
                            value={formData.senha}
                            onChangeText={(text) => handleInputChange("senha", text)}
                            marginBottom={true}
                            borderRadius={10}
                        />
                        <ButtonApp
                            title="Entrar"
                            backgroundColor="#4040ff"
                            color="#FFF"
                            marginTop={5}
                            onPress={handleLogin}
                            width={300}
                        />
                    </View>
                    <ModalErrors
                        title={titleModal}
                        message={menssagemModal}
                        openModal={modalErrors}
                        fnCloseModal={() => setModalErrors(!modalErrors)}
                    />
                </Animatable.View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    logoImage: {
        width: 400,
        height: 300,
        marginRight: 20
    },
    loginText: {
        fontSize: 40,
        marginBottom: 30
    }
})

import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';

//Componentes
import { InputApp } from "../../components/InputApp";
import { ButtonApp } from '../../components/Buttons/ButtonApp'
import logoGerenciApp from '../../icons/logoGerenciApp.png'

export const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [showLoginForm, setShowLoginForm] = useState(false);

    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Home')
    }

    const handleLogoAnimationEnd = () => {
        setShowLoginForm(true);
    };

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
                            value={login}
                            onChangeText={setLogin}
                            marginBottom={true}
                            borderRadius={10}
                        />
                        <InputApp
                            title="Senha"
                            placeholder="Informe sua senha"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
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

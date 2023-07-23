import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native'

//Componentes
import { InputApp } from "../../components/InputApp";
import { ButtonApp } from '../../components/Buttons/ButtonApp'
import ic_logo from '../../icons/ic_logo.png'

export const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>

            <Image source={ic_logo} style={styles.logoImage} />
            <Text style={styles.logo}>
                GerenciApp
            </Text>
            <Text style={styles.loginText}>
                Login
            </Text>
            <InputApp
                title="Usuário"
                placeholder="Informe seu usuário"
                value={login}
                onChangeText={setLogin}
            />
            <InputApp
                title="Senha"
                placeholder="Informe sua senha"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        fontSize: 50,
        marginBottom: 30
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    loginText: {
        fontSize: 35,
        marginBottom: 15
    }
})

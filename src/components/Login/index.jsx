import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { InputApp } from '../InputApp'
import { ButtonApp } from '../ButtonApp'

const Login = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>
                Login
            </Text>
            <InputApp
                title="Usuário"
                placeholder="Informe seu usuário"
            />
            <InputApp
                title="Senha"
                placeholder="Informe sua senha"
                secureTextEntry={true}
            />
            <ButtonApp
                title="Entrar"
                backgroundColor="#4040ff"
                color="#FFF"
                marginTop={5}
                onPress={onPress}
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
    loginText: {
        fontSize: 25,
        marginBottom: 15
    }
})

export default Login;
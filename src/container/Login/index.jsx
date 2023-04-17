import React, { useState } from "react";
import Login from "../../components/Login";
import { useNavigation } from '@react-navigation/native';
import { Text } from "react-native";

export const LoginScreen = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Home')
    }

    return (
        <Login
            login={login}
            setLogin={setLogin}
            password={password}
            setPassword={setPassword}
            onPress={handleLogin}
        />
    )
}
import React from "react";
import Login from "../../components/Login";
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Home')
    }

return (
    <Login
        onPress={handleLogin}
    />
)
}

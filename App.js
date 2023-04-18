import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './src/container/Login';
import { HomeScreen } from './src/container/Home';
import { Perfil } from './src/components/Home/Perfil';
import { Image } from 'react-native';
import ic_inicio from './src/icons/Home/ic_inicio.png'
import ic_perfil from './src/icons/Home/ic_perfil.png'
import EstoqueScreen from './src/container/Estoque';

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Estoque"
          component={EstoqueScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          children={() => (
            <Tab.Navigator>
              <Tab.Screen
                name="Início"
                component={HomeScreen}
                options={{
                  headerShown: false, tabBarIcon: () => (
                    <Image
                      source={ic_inicio}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  )
                }}
              />
              <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={() => ({
                  headerShown: false,
                  tabBarIcon: () => (
                    <Image
                      source={ic_perfil}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  )
                })}
              />
            </Tab.Navigator>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

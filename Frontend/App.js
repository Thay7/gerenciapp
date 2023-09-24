import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

//Icons do Tab
import ic_inicio from './src/icons/Home/ic_inicio.png'
import ic_perfil from './src/icons/Home/ic_perfil.png'

//Componentes
import { Login } from './src/container/Login';
import { Home } from './src/container/Home';
import { Perfil } from './src/container/Perfil';

//Módulo Vendas
import { Vendas } from './src/container/Vendas';
import { DetalhesVenda } from './src/container/Vendas/DetalhesVenda'
import { NovaVenda } from './src/container/Vendas/NovaVenda';

//Módulo Estoque
import { Estoque } from './src/container/Estoque';
import { DetalhesEstoque } from './src/container/Estoque/DetalhesEstoque';
import { EntradaEstoque } from './src/container/Estoque/EntradaEstoque';

//Módulo Produtos
import { Produtos } from './src/container/Produtos'
import { DetalhesProduto } from './src/container/Produtos/DetalhesProduto';
import { CadastroDeProdutos } from './src/container/Produtos/CadastroDeProdutos';

//Módulo Pedido Compra
import { PedidoDeCompra } from './src/container/PedidoDeCompra'

//Módulo Dashboard
import { Dashboard } from './src/container/Dashboard'

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vendas"
          component={Vendas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NovaVenda"
          component={NovaVenda}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetalhesVenda"
          component={DetalhesVenda}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Estoque"
          component={Estoque}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetalhesEstoque"
          component={DetalhesEstoque}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EntradaEstoque"
          component={EntradaEstoque}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Produtos"
          component={Produtos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetalhesProduto"
          component={DetalhesProduto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroDeProdutos"
          component={CadastroDeProdutos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PedidoDeCompra"
          component={PedidoDeCompra}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          children={() => (
            <Tab.Navigator>
              <Tab.Screen
                name="Início"
                component={Home}
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

import axios from 'axios';

const api = axios.create({
    baseURL: `http://192.168.0.6:5000/api/`,
    timeout: 5000
})

export const useApi = {
    //Itens
    listarItens: async () => {
        const response = await api.get('itens/listar')
        return response.data
    },
    cadastrarItem: async (formData) => {
        try {
            const response = await api.post(`itens/cadastrar`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    editarItem: async (formData) => {
        try {
            const id = formData.id;
            const response = await api.put(`itens/editar/${id}`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    deletarItem: async (id) => {
        try {
            const response = await api.delete(`itens/deletar/${id}`);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    //Vendas
    listarVendas: async () => {
        const response = await api.get('vendas/listar')
        return response.data
    },
    cadastrarVenda: async (formData) => {
        try {
            const response = await api.post(`vendas/cadastrar`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    editarVenda: async (formData) => {
        try {
            const id = formData.id;
            console.log('id na api front: ' + id)
            const response = await api.put(`vendas/editar/${id}`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    //Pedidos compra
    listarPedidosCompras: async () => {
        const response = await api.get('pedidosCompra/listar')
        return response.data;
    },
    cadastrarPedidoCompra: async (formData) => {
        try {
            const response = await api.post('pedidosCompra/cadastrar', formData)
            if (response.status == 200) {
                return 200;
            }
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    confirmarRetorno: async (numero_pedido_compra) => {
        try {
            console.log('entrou na api. nº pedido compra: ' + numero_pedido_compra)
            const response = await api.put(`pedidosCompra/confirmarRetorno/${numero_pedido_compra}`)
            if (response.status == 200) {
                return 200;
            }
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    //Fornecedor
    listarFornecedores: async () => {
        const response = await api.get('fornecedores/listar')
        return response.data;
    },
}
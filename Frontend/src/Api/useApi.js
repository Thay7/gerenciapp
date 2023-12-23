import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.4:5000',
    timeout: 5000,
})

export const useApi = {
    listarProdutos: async () => {
        const response = await api.get('/api/listar')
        return response.data
    },
    cadastrarProdutos: async (formData) => {
        try {
            const response = await api.post(`/api/cadastrarProdutos`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    editarProdutos: async (newData) => {
        try {
            const response = await api.put(`/api/atualizarProduto`, newData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    listarEstoque: async () => {
        const response = await api.get('/api/listaEstoque')
        return response.data
    },
    listaProdutosSemEstoque: async () => {
        const response = await api.get('/api/listaProdutosSemEstoque')
        return response.data
    },
    cadastrarProdutoNoEstoque: async (formData) => {
        try {
            const response = await api.post(`/api/cadastrarEstoque`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    }
}
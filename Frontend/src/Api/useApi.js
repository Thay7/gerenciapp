import axios from 'axios';

const api = axios.create({
    baseURL: 'http://34.134.114.172:3005',
    timeout: 1000,
})

export const useApi = {
    listarProdutos: async () => {
        const response = await api.get('/api/listaProdutos')
        return response.data
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
}
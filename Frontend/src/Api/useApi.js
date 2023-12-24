import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.4:5000/api/',
    timeout: 5000,
})

export const useApi = {
    listarProdutos: async () => {
        const response = await api.get('produtos/listar')
        return response.data
    },
    cadastrarProduto: async (formData) => {
        try {
            const response = await api.post(`produtos/cadastrar`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    editarProduto: async (formData) => {
        try {
            const id = formData.id;
            const response = await api.put(`produtos/editar/${id}`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    deletarProduto: async (id) => {
        console.log(id + 'front')
        try {
            const response = await api.delete(`produtos/deletar/${id}`);
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
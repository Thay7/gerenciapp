import axios from 'axios';

const api = axios.create({
    baseURL: 'http://34.134.114.172:3005',
    timeout: 1000,
})

export const useApi = {
    produtos: async () => {
        const response = await api.get('/api/listaPecas')
        console.log(response)
        return response.data
    }
}
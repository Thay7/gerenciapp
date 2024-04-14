import axios from 'axios';

const api = axios.create({
    baseURL: `http://192.168.0.6:5000/api/`,
    timeout: 5000
})

export const useApi = {
    //Produtos
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
    },
    //Servicos
    listarServicos: async () => {
        const response = await api.get('servicos/listar')
        return response.data
    },
    cadastrarServico: async (formData) => {
        try {
            const response = await api.post(`servicos/cadastrar`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            return 500;
        }
    },
    editarServico: async (formData) => {
        try {
            const id = formData.id;
            const response = await api.put(`servicos/editar/${id}`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            return 500;
        }
    },
    deletarServico: async (id) => {
        try {
            const response = await api.delete(`servicos/deletar/${id}`);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
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
    deletarVenda: async (formData) => {
        try {
            const id_venda = formData.id;
            const response = await api.delete(`vendas/deletar/${id_venda}`);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    listarItensParaVenda: async () => {
        const response = await api.get('vendas/listarItensParaVenda')
        return response.data
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
            return 500;
        }
    },
    confirmarRecebimento: async (numero_pedido_compra) => {
        try {
            const response = await api.put(`pedidosCompra/confirmarRecebimento/${numero_pedido_compra}`)
            if (response.status == 200) {
                return 200;
            }
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    editarPedido: async (formData) => {
        try {
            const numero_pedido_compra = formData.numero_pedido_compra;
            const response = await api.put(`pedidosCompra/editar/${numero_pedido_compra}`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    deletarPedido: async (formData) => {
        try {
            const numero_pedido_compra = formData.numero_pedido_compra;
            const response = await api.delete(`pedidosCompra/deletar/${numero_pedido_compra}`);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            console.error(error);
            return 500;
        }
    },
    //Estoque
    listarProdutosSemEstoque: async () => {
        const response = await api.get('estoque/listarProdutosSemEstoque')
        return response.data
    },
    verificaQuantidadeItem: async (formData) => {
        try {
            const response = await api.post(`estoque/verificaQuantidadeItem`, formData);
            return response.status;
        } catch (error) {
            return 500;
        }
    },
    listarEstoque: async () => {
        const response = await api.get('estoque/listar')
        return response.data
    },
    entradaEstoque: async (formData) => {
        try {
            const response = await api.post(`estoque/cadastrar`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            return 500;
        }
    },
    editarEstoque: async (formData) => {
        try {
            const id = formData.id;
            const response = await api.put(`estoque/editar/${id}`, formData);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            return 500;
        }
    },
    deletarEstoque: async (id) => {
        try {
            const response = await api.delete(`itens/deletar/${id}`);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            return 500;
        }
    },
    //Fornecedor
    listarFornecedores: async () => {
        const response = await api.get('fornecedores/listar')
        return response.data;
    },
    //Relatorios
    listarAnosDisponiveisVenda: async () => {
        const response = await api.get('relatorios/listarAnosDisponiveisVenda')
        return response.data;
    },
    listarMesesDisponiveisVenda: async () => {
        const response = await api.get('relatorios/listarMesesDisponiveisVenda')
        return response.data;
    },
    //Vendas por mes/ano
    listarDadosRelatorioVendasMesAno: async (formData) => {
        const response = await api.post('relatorios/listarDadosRelatorioVendasMesAno', formData)
        return response.data;
    },
    //Itens mais vendidos
    listarDadosRelatorioItensMaisVendidos: async (formData) => {
        const response = await api.post('relatorios/listarDadosRelatorioItensMaisVendidos', formData)
        return response.data;
    }
}
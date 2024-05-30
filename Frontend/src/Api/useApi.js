import axios from 'axios';

const api = axios.create({
    // baseURL: process.env.API_URL,
    baseURL: 'http://192.168.0.8:5000/api/',
    timeout: 5000
})

export const useApi = {
    //Login
    login: async (formData) => {
        const response = await api.post(`login/login`, formData)
        return response;
    },
    //Home
    listarResumoDia: async () => {
        const response = await api.get('home/listarResumoDia')
        if (response.status == 200) {
            return response.data
        } else {
            return 500;
        }
    },
    //Perfil
    dadosPerfil: async (id) => {
        const response = await api.get(`perfil/dadosPerfil/${id}`)
        if (response.status == 200) {
            return response.data
        } else {
            return 500;
        }
    },
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
    confirmarRecebimento: async (formData) => {
        try {
            const response = await api.put(`pedidosCompra/confirmarRecebimento`, formData)
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
    listarAnosDisponiveisVenda: async () => {
        const response = await api.get('relatorios/listarAnosDisponiveisVenda')
        return response.data;
    },
    listarMesesDisponiveisVenda: async () => {
        const response = await api.get('relatorios/listarMesesDisponiveisVenda')
        return response.data;
    },
    listarDadosRelatorioVendasMesAno: async (formData) => {
        const response = await api.post('relatorios/listarDadosRelatorioVendasMesAno', formData)
        return response.data;
    },
    listarDadosRelatorioItensMaisVendidos: async (formData) => {
        const response = await api.post('relatorios/listarDadosRelatorioItensMaisVendidos', formData)
        return response.data;
    },
    listarAnosDisponiveisPedidosCompra: async () => {
        const response = await api.get('relatorios/listarAnosDisponiveisPedidosCompra')
        return response.data;
    },
    listarMesesDisponiveisPedidosCompra: async () => {
        const response = await api.get('relatorios/listarMesesDisponiveisPedidosCompra')
        return response.data;
    },
    listarDadosRelatorioHistoricoPedidosCompra: async (formData) => {
        const response = await api.post('relatorios/listarDadosRelatorioHistoricoPedidosCompra', formData)
        return response.data;
    },
    listarDadosRelatorioComprasFornecedor: async (formData) => {
        const response = await api.post('relatorios/listarDadosRelatorioComprasFornecedor', formData)
        return response.data;
    },
    listarDadosRelatorioConsolidado: async (formData) => {
        const response = await api.post('relatorios/listarDadosRelatorioConsolidado', formData)
        return response.data;
    },
    //Cadastros
    listarCadastros: async () => {
        const response = await api.get('cadastros/listarCadastros')
        return response.data
    },
    editarUsuario: async (formData) => {
        try {
            const id = formData.id;
            const response = await api.put(`cadastros/editarUsuario/${id}`, formData);
            if (response.status == 200)
                return 200;
        } catch (error) {
            return 500;
        }
    },
    editarFornecedor: async (formData) => {
        try {
            const id = formData.id;
            const response = await api.put(`cadastros/editarFornecedor/${id}`, formData);
            if (response.status == 200)
                return 200;
        } catch (error) {
            return 500;
        }
    },
    editarMovCaixa: async (formData) => {
        try {
            const id = formData.id;
            const response = await api.put(`cadastros/editarMovCaixa/${id}`, formData);
            if (response.status == 200)
                return 200;
        } catch (error) {
            return 500;
        }
    },
    cadastrarUsuario: async (formData) => {
        try {
            const response = await api.post(`cadastros/cadastrarUsuario`, formData);
            if (response.status == 200)
                return 200;
            return 400;
        } catch (error) {
            return 500;
        }
    },
    cadastrarFornecedor: async (formData) => {
        try {
            const response = await api.post(`cadastros/cadastrarFornecedor`, formData);
            if (response.status == 200)
                return 200;
            return 400;
        } catch (error) {
            return 500;
        }
    },
    cadastrarMovimentoCaixa: async (formData) => {
        try {
            const response = await api.post(`cadastros/cadastrarMovimentoCaixa`, formData);
            if (response.status == 200)
                return 200;
            return 400;
        } catch (error) {
            return 500;
        }
    },
    deletarUsuario: async (id) => {
        try {
            const response = await api.delete(`cadastros/deletarUsuario/${id}`);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            return 500;
        }
    },
    deletarFornecedor: async (id) => {
        try {
            const response = await api.delete(`cadastros/deletarFornecedor/${id}`);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            return 500;
        }
    },
    deletarMovCaixa: async (id) => {
        try {
            const response = await api.delete(`cadastros/deletarMovCaixa/${id}`);
            if (response.status == 200) {
                return 200;
            }
            return 400;
        } catch (error) {
            return 500;
        }
    }
}
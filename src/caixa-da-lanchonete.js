class CaixaDaLanchonete {

    cardapio = {
        cafe: { descricao: "Café", valor: 3.00 },
        chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
        suco: { descricao: "Suco Natural", valor: 6.20 },
        sanduiche: { descricao: "Sanduíche", valor: 6.50 },
        queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
        salgado: { descricao: "Salgado", valor: 7.25 },
        combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
        combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
    };

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return "Não há itens no carrinho de compras!";
        }

        let total = 0;
        const formasDePagamento = ["credito", "debito", "dinheiro"];

        let listaDePedido = [];

        for (const item of itens) {
            let codigoEQuantidade = item.split(",");

            if (!(formasDePagamento.includes(metodoDePagamento))) {
                return "Forma de pagamento inválida!";
            }

            let codigo;
            let quantidade;

            if (codigoEQuantidade.length < 2) {
                return "Item inválido!";
            }

            codigo = codigoEQuantidade[0];
            quantidade = parseInt(codigoEQuantidade[1]);

            if ((quantidade) == 0) {
                return "Quantidade inválida!";
            }

            if (!(codigo in this.cardapio)) {
                return "Item inválido!";
            }

            listaDePedido.push(codigo);

            let valorTotalSendoComprado = this.cardapio[codigo].valor * quantidade;

            total = total + valorTotalSendoComprado
        }

        if (listaDePedido.includes("chantily") && !listaDePedido.includes("cafe")) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (listaDePedido.includes("queijo") && !listaDePedido.includes("sanduiche")) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (metodoDePagamento === "dinheiro") {
            let totalComDesconto = total * 0.95;
            return ("R$ " + totalComDesconto.toFixed(2).toString().replace(".", ","))
        } else if (metodoDePagamento === "credito") {
            let totalComAcrescimo = total * 1.03;
            return ("R$ " + totalComAcrescimo.toFixed(2).toString().replace(".", ","))
        }

        return ("R$ " + total.toFixed(2).toString().replace(".", ","))
    }

}

export { CaixaDaLanchonete };

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
        //Verifica se nao há itens no carrinho de compras
        if (itens.length === 0) { 
            return "Não há itens no carrinho de compras!";
          }
        
          let total = 0;
          const formasDePagamento = ["credito" , "debito" , "dinheiro"];
          
          let listaDePedido = [];
          
        //Percorre cada elemento em itens
          for (const item of itens) {
            //Separa código e quantidade usando a vírgula
           let codigoEQuantidade = item.split(",");

            //Verifica se a forma de pagamento é inválida
           if (!(formasDePagamento.includes(metodoDePagamento))){
            return "Forma de pagamento inválida!";
           }

           let codigo; 
           let quantidade;

           //Verifica se existe ao menos um código e uma quantidade
           if (codigoEQuantidade.length < 2){
            return "Item inválido!";
           } 
           
           //Atribui codigo e quantidade da lista (codigo e quantidade)
            codigo = codigoEQuantidade[0];
            quantidade = parseInt(codigoEQuantidade[1]);

            //Verifica se a quantidade é inválida
           if ((quantidade) == 0){
            return "Quantidade inválida!";
           }
           //Verifica se o item existe no cardápio
           if (!(codigo in this.cardapio)){
            return "Item inválido!";
           }

           //Adiciona ao final da lista de pedido o codigo
           listaDePedido.push(codigo);

           //calcula o valor total do que esta sendo comprado
           let valorTotalSendoComprado = this.cardapio[codigo].valor * quantidade;

           //total vai receber o valor total dos itens atuais
           total = total + valorTotalSendoComprado 
        }

        //Verifica se um item extra (chantily) foi pedido sem o principal (café)
        if (listaDePedido.includes("chantily") && !listaDePedido.includes("cafe")) {
            return "Item extra não pode ser pedido sem o principal";
        }

        //Verifica se um item extra (queijo) foi pedido sem o principal (sanduiche)
        if (listaDePedido.includes("queijo") && !listaDePedido.includes("sanduiche")) {
            return "Item extra não pode ser pedido sem o principal";
        }

        //Verifica se o metodo de pagamento é dinheiro ou credito e adiciona desconto ou acrescimo
        if (metodoDePagamento === "dinheiro"){
            let totalComDesconto = total * 0.95;
            return ("R$ " + totalComDesconto.toFixed(2).toString().replace("." , ","))        
        } else if (metodoDePagamento === "credito"){
            let totalComAcrescimo = total * 1.03;
            return ("R$ " + totalComAcrescimo.toFixed(2).toString().replace("." , ","))
        }

        //Se o metodo de pagamento for débito, retorna o valor sem desconto ou acrescimo
        return ("R$ " + total.toFixed(2).toString().replace("." , ",")) 
    }  

}

export { CaixaDaLanchonete };

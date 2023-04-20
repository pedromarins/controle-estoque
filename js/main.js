const baseURL = "http://localhost:3000/"
const conteudo_tabela = document.querySelector('.conteudo tbody')

async function request() {
    try{
      const response = await fetch(baseURL + "cadastroProdutos");
      return response.json()
    }catch(e) {
      console.error(e);
    };
};

request().then(function(response) {
  console.log(response)
    response.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${produto.id}</td>
          <td>${produto.nome}</td>
          <td>${produto.marca}</td>
          <td>${produto.qtd}</td>
          <td>
            <button>editar</button>
            <button>remover</button>
          </td>
        `;
        conteudo_tabela.appendChild(tr);
      });
})
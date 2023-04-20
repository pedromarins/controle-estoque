const baseURL = "http://localhost:3000/"
const conteudo_tabela = document.querySelector('.conteudo tbody')
const item = {
  nome: "Produto A",
  marca: "Marca A",  
  qtd: 10
}


async function createItem(item) {
  try {
    const response = await fetch(baseURL + "cadastroProdutos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(response)
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

createItem(item).then(function(response) {
  console.log(response)
})


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
});




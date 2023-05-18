const baseURL = "http://localhost:3000/"
const conteudo_tabela = document.querySelector('.conteudo tbody')
const adicionar = document.querySelector('#adicionar-produto')
const cadastro = document.querySelector('#cadastro')
let item = {
  nome: "",
  marca: "",  
  qtd: 0
}

adicionar.addEventListener('click', () => {
  cadastro.classList.toggle('cadastro-ativo')
})

cadastro.addEventListener('submit', (e) => {
  e.preventDefault();
  
  item.nome = e.target.querySelector('[name=nome]').value
  item.marca = e.target.querySelector('[name=marca]').value
  item.qtd = e.target.querySelector('[name=qtd]').value

  createItem(item).then(function(response) {
    console.log(response)
  })
})


async function createItem(item) {
  try {
    const response = await fetch(baseURL + "cadastroProdutos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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




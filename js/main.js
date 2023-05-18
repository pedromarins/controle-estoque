const baseURL = "http://localhost:3000/"
const conteudo_tabela = document.querySelector('.conteudo tbody')
const adicionar = document.querySelector('#adicionar-produto')
const cadastro = document.querySelector('#cadastro')
const conteudo = document.querySelector('#conteudo')
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

    getProdutos().then(function(response) {
      criaItens(response)
    });
  })

  
})

conteudo.addEventListener("click", (e) => {
  if(e.target.className=='remover-item') {
    const id = e.target.parentNode.parentNode.querySelector('.produto-id').textContent

    deleteItem(id).then(function(response) {
      console.log(response)
      
      getProdutos().then(function(response) {
        console.log('atualizando')
        criaItens(response)
      });
    })

    
  }
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

async function deleteItem(id) {
  try {
    const response = await fetch(baseURL + "cadastroProdutos" + "/" + id, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getProdutos() {
    try{
      const response = await fetch(baseURL + "cadastroProdutos");
      return response.json()
    }catch(e) {
      console.error(e);
    };
};

getProdutos().then(function(response) {
    criaItens(response)
});

function criaItens(dados) {
  console.log('chegou na criaItens')
  conteudo_tabela.innerHTML = ''
  console.log(conteudo_tabela)
    dados.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="produto-id">${produto.id}</td>
          <td class="produto-nome">${produto.nome}</td>
          <td class="produto-marca">${produto.marca}</td>
          <td class="produto-qtd">${produto.qtd}</td>
          <td>
            <button>editar</button>
            <button class="remover-item">Remover item</button>
          </td>
        `;
        conteudo_tabela.appendChild(tr);
      });
}


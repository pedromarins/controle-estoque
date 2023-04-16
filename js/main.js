import { GetTodosProdutos } from "../services/api/index.mjs";
const conteudo_tabela = document.querySelector('.conteudo tbody');

GetTodosProdutos().then(function (response) {
  if (response instanceof Error) alert(response);
  else {
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
  };
})
const baseURL = "../produtos.json"


async function GetTodosProdutos() {
    let response;

    try {
        response = await (await fetch(baseURL, { method: 'GET' }));
    } catch (e) {
        console.log("Aqui está o erro", e);
    };

    if (response.ok) return response.json();
    console.table(response)
    return new Error(`${response.status} Erro ao listar todos os produtos!`);
};



export { GetTodosProdutos };
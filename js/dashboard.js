const API = 'https://motivated-grace-production-39eb.up.railway.app'

const grade = document.getElementById('grade-produtos')
const campoBusca = document.getElementById('busca')
let todosProdutos = []

function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function desenharCards(lista) {
    if (lista.length === 0) {
        grade.innerHTML = '<p>Nenhum produto encontrado.</p>'
        return
    }

    grade.innerHTML = lista.map((p) => `
        <div class="card-produto">
            <img src="${p.imagem || 'https://via.placeholder.com/180x120?text=Sem+imagem'}" alt="${p.nome}">
            <h4>${p.nome}</h4>
            <p>${p.categoria} ${p.marca ? '— ' + p.marca : ''}</p>
            <p>${formatarPreco(p.preco)}</p>
            <p class="${p.qtdEstoque < 10 ? 'estoque-baixo' : ''}">Estoque: ${p.qtdEstoque}</p>
        </div>
    `).join('')
}

async function carregarProdutos() {
    const resposta = await fetch(`${API}/produtos`)
    todosProdutos = await resposta.json()
    desenharCards(todosProdutos)
}

campoBusca.addEventListener('input', () => {
    const termo = campoBusca.value.toLowerCase()
    const filtrados = todosProdutos.filter((p) => p.nome.toLowerCase().includes(termo))
    desenharCards(filtrados)
})

carregarProdutos()

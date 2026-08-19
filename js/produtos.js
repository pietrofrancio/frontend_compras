const API = 'https://motivated-grace-production-39eb.up.railway.app'

const form = document.getElementById('form-produto')
const aviso = document.getElementById('aviso')
const corpoTabela = document.getElementById('corpo-tabela-produtos')
const botaoSalvar = document.getElementById('botao-salvar')
const botaoCancelar = document.getElementById('botao-cancelar')
const botaoCargaLote = document.getElementById('botao-carga-lote')

function mostrarAviso(texto, tipo) {
    aviso.innerHTML = `<div class="aviso ${tipo === 'ok' ? 'ok' : ''}">${texto}</div>`
}

function limparFormulario() {
    form.reset()
    document.getElementById('codProduto').value = ''
    botaoSalvar.textContent = 'Cadastrar'
}

function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function carregarProdutos() {
    const resposta = await fetch(`${API}/produtos`)
    const produtos = await resposta.json()

    corpoTabela.innerHTML = ''
    produtos.forEach((p) => {
        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${p.codProduto}</td>
            <td>${p.nome}</td>
            <td>${p.categoria}</td>
            <td>${formatarPreco(p.preco)}</td>
            <td>${p.percentualDesconto || 0}%</td>
            <td>${p.qtdEstoque}</td>
            <td class="col-acoes">
                <button type="button" onclick="editarProduto(${p.codProduto})">Editar</button>
                <button type="button" class="secundario" onclick="excluirProduto(${p.codProduto})">Excluir</button>
            </td>
        `
        corpoTabela.appendChild(linha)
    })
}

async function editarProduto(id) {
    const resposta = await fetch(`${API}/produtos/${id}`)
    if (!resposta.ok) return mostrarAviso('Produto não encontrado.')

    const p = await resposta.json()
    document.getElementById('codProduto').value = p.codProduto
    document.getElementById('nome').value = p.nome
    document.getElementById('categoria').value = p.categoria
    document.getElementById('marca').value = p.marca || ''
    document.getElementById('descricao').value = p.descricao || ''
    document.getElementById('preco').value = p.preco
    document.getElementById('percentualDesconto').value = p.percentualDesconto || 0
    document.getElementById('qtdEstoque').value = p.qtdEstoque
    document.getElementById('imagem').value = p.imagem || ''

    botaoSalvar.textContent = 'Salvar alterações'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function excluirProduto(id) {
    if (!confirm('Excluir este produto?')) return

    const resposta = await fetch(`${API}/produtos/${id}`, { method: 'DELETE' })
    const dados = await resposta.json()

    if (!resposta.ok) return mostrarAviso(dados.erro)

    mostrarAviso('Produto excluído.', 'ok')
    carregarProdutos()
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const id = document.getElementById('codProduto').value
    const corpo = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        marca: document.getElementById('marca').value,
        descricao: document.getElementById('descricao').value,
        preco: Number(document.getElementById('preco').value),
        percentualDesconto: Number(document.getElementById('percentualDesconto').value || 0),
        qtdEstoque: Number(document.getElementById('qtdEstoque').value),
        imagem: document.getElementById('imagem').value
    }

    const url = id ? `${API}/produtos/${id}` : `${API}/produtos`
    const metodo = id ? 'PUT' : 'POST'

    const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
    const dados = await resposta.json()

    if (!resposta.ok) return mostrarAviso(dados.erro)

    mostrarAviso(id ? 'Produto atualizado.' : 'Produto cadastrado.', 'ok')
    limparFormulario()
    carregarProdutos()
})

botaoCancelar.addEventListener('click', limparFormulario)

botaoCargaLote.addEventListener('click', async () => {
    mostrarAviso('Importando produtos da API externa...')
    const resposta = await fetch(`${API}/produtos/carga-lote`)
    const dados = await resposta.json()

    if (!resposta.ok) return mostrarAviso(dados.erro)

    mostrarAviso(dados.mensagem, 'ok')
    carregarProdutos()
})

carregarProdutos()

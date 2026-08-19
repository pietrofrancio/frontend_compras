const API = 'https://motivated-grace-production-39eb.up.railway.app'

const form = document.getElementById('form-compra')
const aviso = document.getElementById('aviso')
const corpoTabela = document.getElementById('corpo-tabela-compras')
const seletorUsuario = document.getElementById('idUsuario')
const seletorProduto = document.getElementById('idProduto')

function mostrarAviso(texto, tipo) {
    aviso.innerHTML = `<div class="aviso ${tipo === 'ok' ? 'ok' : ''}">${texto}</div>`
}

function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function carregarSelects() {
    const [usuarios, produtos] = await Promise.all([
        fetch(`${API}/usuarios`).then((r) => r.json()),
        fetch(`${API}/produtos`).then((r) => r.json())
    ])

    seletorUsuario.innerHTML = usuarios
        .map((u) => `<option value="${u.codUsuario}">${u.nome} ${u.sobrenome}</option>`)
        .join('')

    seletorProduto.innerHTML = produtos
        .map((p) => `<option value="${p.codProduto}">${p.nome} (estoque: ${p.qtdEstoque})</option>`)
        .join('')
}

async function carregarCompras() {
    const resposta = await fetch(`${API}/compras`)
    const compras = await resposta.json()

    corpoTabela.innerHTML = ''
    compras.forEach((c) => {
        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${c.codCompra}</td>
            <td>${c.usuario ? c.usuario.nome + ' ' + c.usuario.sobrenome : c.idUsuario}</td>
            <td>${c.produto ? c.produto.nome : c.idProduto}</td>
            <td>${c.tipoMovimento}</td>
            <td>${c.qtdMovimentada}</td>
            <td>${formatarPreco(c.precoFinal)}</td>
            <td>${c.formaPagamento}</td>
            <td>${c.statusCompra}</td>
            <td>${c.dataCompra}</td>
            <td class="col-acoes">
                <button type="button" class="secundario" onclick="excluirCompra(${c.codCompra})">Excluir</button>
            </td>
        `
        corpoTabela.appendChild(linha)
    })
}

async function excluirCompra(id) {
    if (!confirm('Excluir esta movimentação? O estoque não será revertido automaticamente.')) return

    const resposta = await fetch(`${API}/compras/${id}`, { method: 'DELETE' })
    const dados = await resposta.json()

    if (!resposta.ok) return mostrarAviso(dados.erro)

    mostrarAviso('Movimentação excluída.', 'ok')
    carregarCompras()
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const corpo = {
        idUsuario: Number(seletorUsuario.value),
        idProduto: Number(seletorProduto.value),
        tipoMovimento: document.getElementById('tipoMovimento').value,
        qtdMovimentada: Number(document.getElementById('qtdMovimentada').value),
        descontoAplicado: Number(document.getElementById('descontoAplicado').value || 0),
        formaPagamento: document.getElementById('formaPagamento').value,
        statusCompra: document.getElementById('statusCompra').value,
        dataCompra: document.getElementById('dataCompra').value
    }

    const resposta = await fetch(`${API}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
    const dados = await resposta.json()

    if (!resposta.ok) return mostrarAviso(dados.erro)

    mostrarAviso('Movimentação registrada com sucesso.', 'ok')
    form.reset()
    carregarSelects()
    carregarCompras()
})

carregarSelects()
carregarCompras()

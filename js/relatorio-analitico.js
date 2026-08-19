const API = 'https://motivated-grace-production-39eb.up.railway.app'

function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function carregarProdutosCriticos() {
    const corpo = document.getElementById('corpo-criticos')
    const resposta = await fetch(`${API}/relatorios/produtos-criticos`)
    const dados = await resposta.json()

    if (dados.length === 0) {
        corpo.innerHTML = '<tr><td colspan="4">Nenhum produto em nível crítico no momento.</td></tr>'
        return
    }

    corpo.innerHTML = dados.map((item) => `
        <tr>
            <td>${item.codigo_produto}</td>
            <td>${item.nome}</td>
            <td>${item.categoria}</td>
            <td>${item.quantidade_atual}</td>
        </tr>
    `).join('')
}

async function carregarVolumeCompras() {
    const corpo = document.getElementById('corpo-volume')
    const resposta = await fetch(`${API}/relatorios/volume-compras`)
    const dados = await resposta.json()

    if (dados.length === 0) {
        corpo.innerHTML = '<tr><td colspan="4">Nenhuma saída de estoque registrada ainda.</td></tr>'
        return
    }

    corpo.innerHTML = dados.map((item) => `
        <tr>
            <td>${item.codigo_produto}</td>
            <td>${item.nome}</td>
            <td>${item.quantidade_total}</td>
            <td>${formatarPreco(item.valor_movimentado)}</td>
        </tr>
    `).join('')
}

carregarProdutosCriticos()
carregarVolumeCompras()

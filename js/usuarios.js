const API = 'https://motivated-grace-production-39eb.up.railway.app'

const form = document.getElementById('form-usuario')
const aviso = document.getElementById('aviso')
const corpoTabela = document.getElementById('corpo-tabela-usuarios')
const botaoSalvar = document.getElementById('botao-salvar')
const botaoCancelar = document.getElementById('botao-cancelar')
const botaoCargaLote = document.getElementById('botao-carga-lote')

function mostrarAviso(texto, tipo) {
    aviso.innerHTML = `<div class="aviso ${tipo === 'ok' ? 'ok' : ''}">${texto}</div>`
}

function limparFormulario() {
    form.reset()
    document.getElementById('codUsuario').value = ''
    botaoSalvar.textContent = 'Cadastrar'
}

async function carregarUsuarios() {
    const resposta = await fetch(`${API}/usuarios`)
    const usuarios = await resposta.json()

    corpoTabela.innerHTML = ''
    usuarios.forEach((u) => {
        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${u.codUsuario}</td>
            <td>${u.nome} ${u.sobrenome}</td>
            <td>${u.email}</td>
            <td>${u.idade}</td>
            <td>${u.telefone || '-'}</td>
            <td>${u.cidade || '-'} ${u.estado ? '/ ' + u.estado : ''}</td>
            <td class="col-acoes">
                <button type="button" onclick="editarUsuario(${u.codUsuario})">Editar</button>
                <button type="button" class="secundario" onclick="excluirUsuario(${u.codUsuario})">Excluir</button>
            </td>
        `
        corpoTabela.appendChild(linha)
    })
}

async function editarUsuario(id) {
    const resposta = await fetch(`${API}/usuarios/${id}`)
    if (!resposta.ok) return mostrarAviso('Usuário não encontrado.')

    const u = await resposta.json()
    document.getElementById('codUsuario').value = u.codUsuario
    document.getElementById('nome').value = u.nome
    document.getElementById('sobrenome').value = u.sobrenome
    document.getElementById('idade').value = u.idade
    document.getElementById('email').value = u.email
    document.getElementById('telefone').value = u.telefone || ''
    document.getElementById('endereco').value = u.endereco || ''
    document.getElementById('cidade').value = u.cidade || ''
    document.getElementById('estado').value = u.estado || ''

    botaoSalvar.textContent = 'Salvar alterações'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function excluirUsuario(id) {
    if (!confirm('Excluir este usuário?')) return

    const resposta = await fetch(`${API}/usuarios/${id}`, { method: 'DELETE' })
    const dados = await resposta.json()

    if (!resposta.ok) return mostrarAviso(dados.erro)

    mostrarAviso('Usuário excluído.', 'ok')
    carregarUsuarios()
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const id = document.getElementById('codUsuario').value
    const corpo = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        idade: Number(document.getElementById('idade').value),
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    }

    const url = id ? `${API}/usuarios/${id}` : `${API}/usuarios`
    const metodo = id ? 'PUT' : 'POST'

    const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
    const dados = await resposta.json()

    if (!resposta.ok) return mostrarAviso(dados.erro)

    mostrarAviso(id ? 'Usuário atualizado.' : 'Usuário cadastrado.', 'ok')
    limparFormulario()
    carregarUsuarios()
})

botaoCancelar.addEventListener('click', limparFormulario)

botaoCargaLote.addEventListener('click', async () => {
    mostrarAviso('Importando usuários da API externa...')
    const resposta = await fetch(`${API}/usuarios/carga-lote`)
    const dados = await resposta.json()

    if (!resposta.ok) return mostrarAviso(dados.erro)

    mostrarAviso(dados.mensagem, 'ok')
    carregarUsuarios()
})

carregarUsuarios()

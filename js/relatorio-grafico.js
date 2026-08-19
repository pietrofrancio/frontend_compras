const API = 'https://motivated-grace-production-39eb.up.railway.app'

const CORES = {
    principal: '#1c1c1c',
    destaque: '#8b2e2e',
    grade: 'rgba(28, 28, 28, 0.15)'
}

async function montarGraficoEstoque() {
    const resposta = await fetch(`${API}/relatorios/produtos-criticos`)
    const dados = await resposta.json()

    const ctx = document.getElementById('grafico-estoque').getContext('2d')

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dados.map((p) => p.nome),
            datasets: [{
                label: 'Quantidade em estoque',
                data: dados.map((p) => p.quantidade_atual),
                backgroundColor: CORES.principal,
                borderColor: CORES.destaque,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: CORES.principal } }
            },
            scales: {
                x: { ticks: { color: CORES.principal }, grid: { color: CORES.grade } },
                y: { ticks: { color: CORES.principal }, grid: { color: CORES.grade }, beginAtZero: true }
            }
        }
    })
}

async function montarGraficoVolume() {
    const resposta = await fetch(`${API}/relatorios/volume-compras/top5`)
    const dados = await resposta.json()

    const ctx = document.getElementById('grafico-volume').getContext('2d')

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dados.map((p) => p.nome),
            datasets: [{
                label: 'Valor financeiro movimentado (R$)',
                data: dados.map((p) => p.valor_movimentado),
                backgroundColor: CORES.destaque,
                borderColor: CORES.principal,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { labels: { color: CORES.principal } }
            },
            scales: {
                x: { ticks: { color: CORES.principal }, grid: { color: CORES.grade }, beginAtZero: true },
                y: { ticks: { color: CORES.principal }, grid: { color: CORES.grade } }
            }
        }
    })
}

montarGraficoEstoque()
montarGraficoVolume()

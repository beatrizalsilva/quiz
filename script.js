const perguntas = [
    {
        pergunta: "Qual é a finalidade do comando 'console.log()' em JavaScript?",
        respostas: ["Exibir uma mensagem de erro", "Imprimir dados no console", "Criar uma variável",],
        correta: 1
    },
    {
        pergunta: "Qual é a função do operador '===' em JavaScript?",
        respostas: ["Comparação de valores sem considerar o tipo", "Atribuição de valores", "Comparação escrita de valores e tipos"],
        correta: 2
    },
    {
        pergunta: "Como se declara uma variável em JavaScript?",
        respostas: ["let myVar;", "const myVar = 10;", "Ambas as opções estão corretas"],
        correta: 2
    },
    {
        pergunta: "Qual é o operador lógico para 'ou' em JavaScript?",
        respostas: ["||", "&&", "!"],
        correta: 0
    },
    {
        pergunta: "Qual é a maneira correta de escrever um comentário de linha única em JavaScript?",
        respostas: ["/* Este é um comentário de linha única */", "// Este é um comentário de linha única", "<!-- Este é um comentário de linha única -->"],
        correta: 1
    },
    {
        pergunta: "O que o método 'map()' faz em um array JavaScript?",
        respostas: ["Adiciona um novo elemento ao array", "Remove um elemento do array", "Cria um novo array com os resultados da chamada de uma função para cada elemento do array"],
        correta: 2
    },
    {
        pergunta: "Qual é a função usada para converter uma string em um número inteiro em JavaScript?",
        respostas: ["parseInt()", "parseFloat()", "toNumber()"],
        correta: 0
    },
    {
        pergunta: "Qual método JavaScript é usado para remover o último elemento de um array e retorna o elemento removido?",
        respostas: ["pop()", "shift()", "removeLast()"],
        correta: 0
    },
    {
        pergunta: "Como se adiciona um evento a um elemento HTML usando JavaScript?",
        respostas: ["Apenas com CSS", "Usando o atributo 'event'", "Através do método 'addEventListener'"],
        correta: 2
    },
    {
        pergunta: "Como se realiza uma iteração sobre os elementos de um array em JavaScript?",
        respostas: ["Usando a estrutura 'if-else'", "Com a declaração 'switch'", "Utilizando loops como 'for' ou 'forEach'"],
        correta: 2
    }
]

const quiz = document.querySelector("#quiz")
const template = document.querySelector("template")

// cria um novo conjunto para guardar informações das respostas selecionadas (não repete dado)
const corretas = new Set()
// length faz a somatória a partir do 1
const totalDePerguntas = perguntas.length
const mostrarTotal = document.querySelector("#acertos span")
mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas

// laço para pergunta
for (const item of perguntas) {
    // o método cloneNode vai clonar o template da pergunta
    const quizItem = template.content.cloneNode(true)

    // modifica o h3 para que a pergunta saia
    quizItem.querySelector("h3").textContent = item.pergunta

    // laço para respostas
    for(let resposta of item.respostas) {
        // dentro do dl procura o dt, clona templete de resposta
        const dt = quizItem.querySelector("dl dt").cloneNode(true)

        // modifica o span para que saia as opções de resposta
        dt.querySelector("span").textContent = resposta

        // faz com que cada input receba uma resposta diferente
        dt.querySelector("input").setAttribute("name", "pergunta-" + perguntas.indexOf(item))
        
        // ajusta o valor (value) do index de cada resposta
        dt.querySelector("input").value = item.respostas.indexOf(resposta)

        // criar evento para mundar o input
        dt.querySelector("input").onchange = (event) => {
            const estaCorreta = event.target.value == item.correta
            // contabiliza os acertos e se mudar de opnião, tira o ponto de acerto
            corretas.delete(item)
            if(estaCorreta) {
                corretas.add(item)
            }
            mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas
        }

        // coloca as opções de resposta na tela
        quizItem.querySelector("dl").appendChild(dt)
    }

    // remove a 'Resposta A' das opções na tela
    quizItem.querySelector("dl dt").remove()

    // o método appendChild() vai fazer com que as perguntas apareçam na tela
    quiz.appendChild(quizItem)
}
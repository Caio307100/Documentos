const botaoExtras = document.getElementById("secret")
const body = document.body
const secundario = document.querySelector("main").querySelector(".secundario")
const principal = document.querySelector("main").querySelector(".principal")
const codigo = "7392-KX47-PL91"
const col1 = document.querySelector(".col1")
let jogos = []
let botaoEnviar = document.createElement("button")
let mensagemAnterior
let form = document.createElement("form")
class Jogos {
    constructor(nome, img) {
        this.nome = nome
        this.img = img
    }
    card(){
        this.nome = this.nome
        let div = document.createElement("div")
        div.className = "jogo"
        let img = document.createElement("img")
        img.src = this.img
        let h2 = document.createElement("h2")
        h2.innerText = this.nome
        let formJogar = document.createElement("form")
        formJogar.method = "GET"
        let span = document.createElement("span")
        span.innerText = this.nome
        span.style.opacity = "0%"
        span.style.cursor = "none"
        let button = document.createElement("button")
        button.innerText = "Jogar"
        button.type = "submit"

        formJogar.appendChild(span)
        formJogar.appendChild(button)
        div.appendChild(img)
        div.appendChild(h2)
        div.appendChild(formJogar)

        principal.appendChild(div)
    }
}
function verificarAcesso(input, mensagem) {
    if (input.value == ""){
        alert("Está vazio o campo")
    }
    else{
        if (input.value == codigo){
            let botaoAdicionarJogos = document.createElement("button")
            botaoAdicionarJogos.innerText = "Adicionar Jogos"
            botaoAdicionarJogos.className = "botaoAdicionar"
            botaoAdicionarJogos.onclick = () => {
                adicionar(mensagem)
            }
            document.querySelector("header").style.opacity = "100%"
            secundario.innerHTML = ""
            botaoExtras.parentElement.innerHTML = ""
            col1.appendChild(botaoAdicionarJogos)
        }
        else{
            alert("Codigo errado")
        }
    }
}
function adicionar(mensagem){
    document.querySelector("header").style.opacity = "50%"
    document.querySelector(".principal").style.opacity = "50%"
    const ALLmensagem = mensagem.querySelectorAll("*")
    const ALLinput = mensagem.querySelectorAll("input")
    if (ALLinput.length == 2){
        secundario.appendChild(mensagem)
    }
    else{
        let inputImg
        let p
        let INPUT = document.createElement("input")
        INPUT.id = "nome"
        let pnEncontrado = false
        let botao
        for (elemento of ALLmensagem){
            if (elemento.tagName == "H2"){
                elemento.innerText = "Adicionar jogo"
            }
            if (elemento.tagName == "P"){
                p = elemento
            }
            if (elemento.tagName == "BUTTON"){
                elemento.onclick = () => {
                    verificarAdicao(INPUT, inputImg, mensagem)
                }
                elemento.innerText = "Adicionar"
                botao = elemento
                botao.remove()
            }
            if (elemento.tagName == "INPUT"){
                elemento.value = ""
                elemento.id = "img"
                inputImg = elemento
            }
            if (elemento.innerText == "Digite o nome do jogo"){
                pnEncontrado = true
            }
        }
        if (pnEncontrado){
        }
        else{
            let pN = document.createElement("p")
            pN.innerText = "Digite o nome do jogo"
            pN.style.color = "white"
            mensagem.insertBefore(pN, mensagem.children[1])
        }
        p.innerText = "Digite o (local ou url) da imagem"
        mensagem.insertBefore(INPUT, mensagem.children[2])
        mensagem.insertBefore(p, mensagem.children[3])
        mensagem.insertBefore(botao, mensagem.children[mensagem.length])
        secundario.appendChild(mensagem)
    }
}
function verificarAdicao(INPUT, inputImg, mensagem) {
    if (INPUT.value == "" || inputImg.value == ""){
        alert("Está vazio um dos campos")
    }
    else{
        let nome = INPUT.value.toLowerCase()
        let Pletra = nome[0].toUpperCase()
        mensagemAnterior = mensagem.cloneNode(true)
        mensagem.innerHTML = ""
        nome = nome.replace(nome[0], "")
        nome = `${Pletra}${nome}`
        jogos.push(new Jogos(nome, inputImg.value))
        principal.innerHTML = ""
        for (jogo of jogos){
            jogo.card()
        }

        let pE = document.createElement("p")
        pE.innerText = "Endereço do jogo"
        pE.style.color = "white"
        let inputE = document.createElement("input")
        inputE.placeholder = "Exemplo: /pasta/jogo.exe"
        inputE.id = "endereco"
        botaoEnviar.type = "submit"
        botaoEnviar.innerText = "Guardar endereço do jogo"
        botaoEnviar.dataset.nome = nome
        botaoEnviar.dataset.img = inputImg.value
        form.appendChild(pE)
        form.appendChild(inputE)
        form.appendChild(botaoEnviar)
        mensagem.insertBefore(form, mensagem.children[4])
    }
}
botaoExtras.addEventListener("click", () => {
    botaoExtras.disabled = true
    document.querySelector("header").style.opacity = "50%"
    let mensagem = document.createElement("div")
    let h2 = document.createElement("h2")
    let p = document.createElement("p")
    let input = document.createElement("input")
    let botaoVerificarCodigo = document.createElement("button")
    botaoVerificarCodigo.innerText = "Acessar"
    botaoVerificarCodigo.style.marginTop = "10px"
    botaoVerificarCodigo.onclick = () => {
        verificarAcesso(input, mensagem)
    }
    mensagem.style.display = "flex"
    mensagem.style.flexDirection = "column"
    h2.innerText = "Somente para admins"
    h2.style.color = "white"
    p.innerText = "Digite o codigo para ter acesso:"
    p.style.color = "white"
    mensagem.appendChild(h2)
    mensagem.appendChild(p)
    mensagem.appendChild(input)
    mensagem.appendChild(botaoVerificarCodigo)
    secundario.appendChild(mensagem)
})
form.addEventListener("submit", (evento) => {
  evento.preventDefault()
  let botaoClicado = evento.submitter
  let endereco = form.querySelector("#endereco").value
  let nome = botaoClicado.dataset.nome
  let img = botaoClicado.dataset.img
  fetch("http://localhost:3000/jogos", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        endereco: endereco,
        img:img
      })
  })
})

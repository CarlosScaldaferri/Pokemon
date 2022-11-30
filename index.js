/*
Dados retirados do site:
    https://awesomeopensource.com/project/jdorfman/awesome-json-datasets
*/
import pokemons from './pokemons.json' assert {type: 'json'}

const btnPesquisar = document.getElementById("btnPesquisar")
const inptNomePokemon = document.getElementById("inptNomePokemon")
const dvContainerImagens = document.getElementById('dvContainerImagens')
const dvImagensD = document.getElementById('dvImagensD')
const dvImagensE = document.getElementById('dvImagensE')
const btnProximaImagem = document.getElementById('btnProximaImagem')
const btnAnteriorImagem = document.getElementById('btnAnteriorImagem')
const btnPrimeiroImagem = document.getElementById('btnPrimeiroImagem')
const btnUltimoImagem = document.getElementById('btnUltimoImagem')
const dvContainerNome = document.getElementById('dvPrincipalCima')
const dvRodape = document.getElementById('dvRodape')
const dvContador = document.getElementById("dvContador")
const dvBotoes = document.getElementById("dvBotoes")

let dvDireitaCima = document.getElementById("dvDireitaCima")
let dvDireitaBaixo = document.getElementById("dvDireitaBaixo")

let nomePokemon = ""
let pokemonsFiltrados = null
let IndiceAtual = 0 


document.addEventListener('DOMContentLoaded', function() {dvBotoes.style.visibility = 'hidden'; pesquisaPokemon()})

btnPrimeiroImagem.addEventListener("click", function() 
{
  if (pokemonsFiltrados !== null || pokemonsFiltrados !== undefined)
  {
    IndiceAtual = 0 
    criaFilhos()
  }
})

btnUltimoImagem.addEventListener("click", function() 
{
  if (pokemonsFiltrados !== null || pokemonsFiltrados !== undefined)
  {
    IndiceAtual = pokemonsFiltrados.length -1
    criaFilhos()
  }
})

btnProximaImagem.addEventListener("click", function() 
{
  if (pokemonsFiltrados !== null || pokemonsFiltrados !== undefined)
  {
    IndiceAtual++
    if(IndiceAtual >= pokemonsFiltrados.length)
    {
      IndiceAtual = 0
    }
    criaFilhos()
  }
})

btnAnteriorImagem.addEventListener("click", function()
{
  if (pokemonsFiltrados !== null || pokemonsFiltrados !== undefined)
  {
    IndiceAtual--
    if(IndiceAtual < 0)
    {
      IndiceAtual = pokemonsFiltrados.length -1
    }
    criaFilhos()
  }
})
inptNomePokemon.addEventListener("keyup", function() 
{
  pesquisaPokemon()
})

function pesquisaPokemon()
{  
  nomePokemon = document.getElementById("inptNomePokemon").value 
  IndiceAtual = 0
  event.preventDefault()
  pokemonsFiltrados = filtraPokemon(nomePokemon)
  criaFilhos()
}

function criaFilhos()
{
  dvContainerImagens.innerHTML = ""
  dvImagensD.innerText   = ""
  dvImagensE.innerText   = ""
  dvContador.innerHTML = ""
  dvContainerNome.innerHTML = "" 
  dvRodape.innerHTML = "" 
  dvDireitaCima.innerHTML = ""  
  dvDireitaBaixo.innerHTML = ""
  dvBotoes.style.visibility = 'hidden'

  if (pokemonsFiltrados[IndiceAtual] !== undefined && pokemonsFiltrados[IndiceAtual] !== null)
  {
    dvBotoes.style.visibility = 'visible'
    let img = null
    let textoD = null
    let textoE = null
    let nome = null

    img = document.createElement(`img`)
    img.src = pokemonsFiltrados[IndiceAtual].img
    img.id = "img"
    img.className = "img"        
    dvContainerImagens.appendChild(img)

    textoD = document.createElement("relatorio")  
    textoD.innerText = `${pokemonsFiltrados[IndiceAtual].name.toUpperCase()}\n\n Altura: ${pokemonsFiltrados[IndiceAtual].height}\nPeso: ${pokemonsFiltrados[IndiceAtual].weight}\nTipo: ${pokemonsFiltrados[IndiceAtual].type}\nPontos fracos: ${pokemonsFiltrados[IndiceAtual].weaknesses}\nProximas evoluções: ${nextEvolution(pokemonsFiltrados[IndiceAtual])}\nCapturado: ${sN(pokemonsFiltrados[IndiceAtual].captured)}`
    textoD.id = "relatorio"
    textoD.className = "relatorio"
    dvDireitaCima.appendChild(textoD)

    nome = document.createElement("pokemonNome")  
    nome.innerText = pokemonsFiltrados[IndiceAtual].name.toUpperCase()
    nome.id = "pokemonNome"
    nome.className = "pokemonNome"
    dvContainerNome.appendChild(nome)
  
    dvContador.innerText = `Pokemon ${IndiceAtual + 1} de ${pokemonsFiltrados.length}`

    dadosGerais()  
    
    criaFilhosPequenos()
  }
}

function criaFilhosPequenos()
{
  let img = null
  for (let index = 1; index <= 6; index++) {

    if (IndiceAtual + index < pokemonsFiltrados.length)
    {
      img = document.createElement(`img`)
      img.src = pokemonsFiltrados[IndiceAtual + index].img.replace("imagens", "imagensPequenas")
      img.id = "imgP"
      img.className = "imgP" 
      dvImagensD.appendChild(img)
    }
  }

  for (let index = 5; index >= 0; index--) {

    if (IndiceAtual - index > 0)
    {      
      img = document.createElement(`img`)
      img.src = pokemonsFiltrados[IndiceAtual - index -1] .img.replace("imagens", "imagensPequenas")
      img.id = "imgP"
      img.className = "imgP" 
      dvImagensE.appendChild(img)
    }
  }
}

function filtraPokemon(busca)
{
    const resultado = []
    pokemons.forEach(pokemon => {
        if (pokemon.name.toUpperCase().indexOf(busca.toUpperCase()) > -1)
        {
            resultado.push(pokemon)
        }
    })
    return resultado
}

function sN(boleano)
{
    if (boleano)
        return "Sim" 
    else 
        return "Não"
}

function nextEvolution(pokemon)
{
  let evolucoes = ""
  if (pokemon.next_evolution !== null && pokemon.next_evolution !== undefined)
  {
    pokemon.next_evolution.forEach(evolucao => {
      evolucoes = evolucoes + `${evolucao.name},`
    });
  }
  if (evolucoes == "")
    evolucoes = "Nenhuma"
  else 
    evolucoes = evolucoes.slice(0, evolucoes.length -1)

  return evolucoes
}

function dadosGerais()
{
  function mediaPeso(soma, pokemon) {
      return soma + Number(pokemon.weight.replace(" kg", ""))
  }
  function mediaAltura(soma, pokemon) {
      return soma + Number(pokemon.height.replace(" m", ""))
  }
  function todosCapturados(soma, pokemon) {
    return soma && pokemon.captured
  }
  let capturados
  capturados = document.createElement(`rodape`)
  capturados.innerText = `Dados gerais:\n\nMédia de peso dos pokemons: ${(pokemonsFiltrados.reduce(mediaPeso, 0) / pokemonsFiltrados.length).toFixed(2)} kg\nMédia de altura dos pokemons: ${(pokemonsFiltrados.reduce(mediaAltura, 0) / pokemonsFiltrados.length).toFixed(2)} metros\nTodos foram capturados? ${sN(pokemonsFiltrados.reduce(todosCapturados, true)) }`
  capturados.id = "dadosGerais"
  capturados.className = "dadosGerais"        
  dvDireitaBaixo.appendChild(capturados)      
}
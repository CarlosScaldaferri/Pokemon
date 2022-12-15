/*
Dados retirados do site:
    https://awesomeopensource.com/project/jdorfman/awesome-json-datasets
*/
import pokemons from './pokemons.json' assert {type: 'json'}

const inptNomePokemon = document.getElementsByClassName("inptNomePokemon")[0]
const dvContainerImagens = document.getElementsByClassName('dvImagemPrincipal')[0]
const dvImagensD = document.getElementsByClassName('dvCentroDireita')[0]
const dvImagensE = document.getElementsByClassName('dvCentroEsquerda')[0]
const btnProximaImagem = document.getElementsByClassName('btnProximaImagem')[0]
const btnAnteriorImagem = document.getElementsByClassName('btnAnteriorImagem')[0]
const dvContainerNome = document.getElementsByClassName('dvPokemonNome')[0]
const dvContador = document.getElementsByClassName("dvContador")[0]
let dvTextoCima = document.getElementsByClassName("dvTextoCima")[0]
let dvTextoBaixo = document.getElementsByClassName("dvTextoBaixo")[0]
let nomePokemon = ""
let pokemonsFiltrados = null
let IndiceAtual = 0 


document.onkeydown = teclasNavegacao;

window.addEventListener('resize', function() {pesquisaPokemon(IndiceAtual)});

function teclasNavegacao(tecla) {
  if (pokemonsFiltrados !== null || pokemonsFiltrados !== undefined)
  {
    tecla = tecla || window.event;
    if (tecla.keyCode == '37') {
        IndiceAtual--
        if (IndiceAtual == -1)
        {
          IndiceAtual = pokemonsFiltrados.length - 1
        }
        pesquisaPokemon(IndiceAtual)
    }
    else if (tecla.keyCode == '39') {
      IndiceAtual++
      if (IndiceAtual == pokemons.length)
      {
        IndiceAtual = 0      
      }
      pesquisaPokemon(IndiceAtual)      
    }
  }
}

document.addEventListener('DOMContentLoaded', function(e) {
    e.preventDefault()
    IndiceAtual =  Math.floor(Math.random() * pokemons.length -1)    
    pesquisaPokemon(IndiceAtual)  
})

btnProximaImagem.addEventListener("click", function(e) 
{
  if (pokemonsFiltrados !== null || pokemonsFiltrados !== undefined)
  {
    IndiceAtual++
    if(IndiceAtual >= pokemonsFiltrados.length)
    {
      IndiceAtual = 0
    }
    pesquisaPokemon(IndiceAtual)
  }
})
btnAnteriorImagem.addEventListener("click", function(e)
{
  if (pokemonsFiltrados !== null || pokemonsFiltrados !== undefined)
  {
    IndiceAtual--
    if(IndiceAtual < 0)
    {
      IndiceAtual = pokemonsFiltrados.length -1
    }
    carregaDados()
  }
})

inptNomePokemon.addEventListener("keypress", function(e) 
{  
  if (e.key === "Enter")
  {
    e.preventDefault()
    pesquisaPokemon()    
    return false
  }
})

function pesquisaPokemon(indice = 0)
{  
  nomePokemon = inptNomePokemon.value
  IndiceAtual = indice
  pokemonsFiltrados = filtraPokemon(nomePokemon)   
  carregaDados()  
}

function carregaDados()
{
  dvContainerImagens.innerHTML = ""
  dvImagensD.innerText   = ""
  dvImagensE.innerText   = ""
  dvContainerNome.innerHTML = "" 
  dvTextoCima.innerHTML = ""  
  dvTextoBaixo.innerHTML = ""
  dvContador.innerHTML = ""

  if (pokemonsFiltrados[IndiceAtual] !== undefined && pokemonsFiltrados[IndiceAtual] !== null)
  {
    let img = null
    let textoD = null
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
    dvTextoCima.appendChild(textoD)

    nome = document.createElement("lblPokemonNome")  
    nome.innerText = pokemonsFiltrados[IndiceAtual].name.toUpperCase()  
    nome.id = "lblPokemonNome"
    nome.className = "lblPokemonNome"
    dvContainerNome.appendChild(nome)
  
    dvContador.innerText = `Pokemon ${IndiceAtual + 1} de ${pokemonsFiltrados.length}`
    
    dadosGerais()  
    
    carregaImagensPequenas()
  }
}

function carregaImagensPequenas()
{
  let larguraEsquerda = document.getElementsByClassName('dvCentroEsquerda')[0].clientWidth
  let numeroElementos = Math.trunc(larguraEsquerda / 70)
  let img = null
  for (let index = 1; index <= numeroElementos; index++) {
    if (IndiceAtual + index < pokemonsFiltrados.length)
    {
      img = document.createElement(`img`)
      img.src = pokemonsFiltrados[IndiceAtual + index].img
      img.id = "imgP"
      img.className = "imgP"       
      img.addEventListener("click", function() {IndiceAtual = IndiceAtual + index; carregaDados()})
      dvImagensD.appendChild(img)
    }
  }

  let larguraDireita = document.getElementsByClassName('dvCentroDireita')[0].clientWidth
  let numeroDireita = Math.trunc(larguraDireita / 70) 
  for (let index = numeroDireita -1; index >= 0; index--) {
    if (IndiceAtual - index > 0)
    {      
      img = document.createElement(`img`)
      img.src = pokemonsFiltrados[IndiceAtual - index -1].img
      img.id = "imgP"
      img.className = "imgP"      
      img.addEventListener("click", function() {IndiceAtual = IndiceAtual - index -1; carregaDados()})
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
  capturados.innerText = `DADOS GERAIS\n\nMédia de peso dos pokemons: ${(pokemonsFiltrados.reduce(mediaPeso, 0) / pokemonsFiltrados.length).toFixed(2)} kg\nMédia de altura dos pokemons: ${(pokemonsFiltrados.reduce(mediaAltura, 0) / pokemonsFiltrados.length).toFixed(2)} metros\nTodos foram capturados? ${sN(pokemonsFiltrados.reduce(todosCapturados, true)) }`
  capturados.id = "dadosGerais"
  capturados.className = "dadosGerais"  
  dvTextoBaixo.appendChild(capturados)      
}

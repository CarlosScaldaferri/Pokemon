/*
Dados retirados do site:
    https://awesomeopensource.com/project/jdorfman/awesome-json-datasets
*/
import pokemons from './pokemons.json' assert {type: 'json'}

const inptNomePokemon = document.getElementById("inptNomePokemon")
const dvContainerImagens = document.getElementById('dv2222')
const dvImagensD = document.getElementById('dv2321')
const dvImagensE = document.getElementById('dv2121')
const btnProximaImagem = document.getElementById('btnProximaImagem')
const btnAnteriorImagem = document.getElementById('btnAnteriorImagem')
const dvContainerNome = document.getElementById('dv2211')
const dvContador = document.getElementById("dv2231")
let dvDireitaCima = document.getElementById("dv2311")
let dvDireitaBaixo = document.getElementById("dv2331")

let nomePokemon = ""
let pokemonsFiltrados = null
let IndiceAtual = 0 

document.onkeydown = teclasNavegacao;

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
        carregaDados()
    }
    else if (tecla.keyCode == '39') {
      IndiceAtual++
      if (IndiceAtual == pokemons.length)
      {
        IndiceAtual = 0      
      }
      carregaDados()      
    }
  }

}

document.addEventListener('DOMContentLoaded', function() {pesquisaPokemon()})

btnProximaImagem.addEventListener("click", function() 
{
  if (pokemonsFiltrados !== null || pokemonsFiltrados !== undefined)
  {
    IndiceAtual++
    if(IndiceAtual >= pokemonsFiltrados.length)
    {
      IndiceAtual = 0
    }
    carregaDados()
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
    carregaDados()
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
  carregaDados()
}

function carregaDados()
{
  console.log("entrou carregaDados()")
  dvContainerImagens.innerHTML = ""
  dvImagensD.innerText   = ""
  dvImagensE.innerText   = ""
  dvContainerNome.innerHTML = "" 
  dvDireitaCima.innerHTML = ""  
  dvDireitaBaixo.innerHTML = ""
  dvContador.innerHTML = ""

  if (pokemonsFiltrados[IndiceAtual] !== undefined && pokemonsFiltrados[IndiceAtual] !== null)
  {
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

    nome = document.createElement("lblPokemonNome")  
    nome.innerText = pokemonsFiltrados[IndiceAtual].name  
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
  let img = null
  for (let index = 1; index <= 6; index++) {

    if (IndiceAtual + index < pokemonsFiltrados.length)
    {
      img = document.createElement(`img`)
      img.src = pokemonsFiltrados[IndiceAtual + index].img
      //.replace("imagens", "imagensPequenas")
      img.id = "imgP"
      img.className = "imgP" 
      img.style.top = 20
      dvImagensD.appendChild(img)
    }
  }

  for (let index = 5; index >= 0; index--) {

    if (IndiceAtual - index > 0)
    {      
      img = document.createElement(`img`)
      img.src = pokemonsFiltrados[IndiceAtual - index -1].img
      //.replace("imagens", "imagensPequenas")
      img.id = "imgP"
      img.className = "imgP"
      img.style.top = 20
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
  capturados.innerText = `DADOS GERAIS:\n\nMédia de peso dos pokemons: ${(pokemonsFiltrados.reduce(mediaPeso, 0) / pokemonsFiltrados.length).toFixed(2)} kg\nMédia de altura dos pokemons: ${(pokemonsFiltrados.reduce(mediaAltura, 0) / pokemonsFiltrados.length).toFixed(2)} metros\nTodos foram capturados? ${sN(pokemonsFiltrados.reduce(todosCapturados, true)) }`
  capturados.id = "dadosGerais"
  capturados.className = "dadosGerais"        
  dvDireitaBaixo.appendChild(capturados)      
}

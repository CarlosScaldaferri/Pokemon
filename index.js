/*
Dados retirados do site:
    https://awesomeopensource.com/project/jdorfman/awesome-json-datasets
*/
import pokemons from './pokemons.json' assert {type: 'json'}

const btnPesquisar = document.getElementById("btnPesquisar")
const inptNomePokemon = document.getElementById("inptNomePokemon")
const dvContainerImagens = document.getElementById('dvContainerImg')
const dvContainerTexto = document.getElementById('dvContainerTexto')
const btnProximaImagem = document.getElementById('btnProximaImagem')
const btnAnteriorImagem = document.getElementById('btnAnteriorImagem')
let nomePokemon = ""
let pokemonsFiltrados = null
let currentImageIndex = 0 
let relatorioFinal

btnProximaImagem.addEventListener("click", function() 
{
  if (relatorioFinal !== null)
  {
    relatorioFinal.imagens[currentImageIndex].classList.remove("selected")
    relatorioFinal.texto[currentImageIndex].classList.remove("selected")
    currentImageIndex++
    if(currentImageIndex >= relatorioFinal.imagens.length)
    {
      currentImageIndex = 0
    }
    relatorioFinal.imagens[currentImageIndex].classList.add("selected")
    relatorioFinal.texto[currentImageIndex].classList.add("selected")
    let contador = document.getElementById("contador")
    contador.innerText = `Pokemon ${currentImageIndex + 1} de ${relatorioFinal.imagens.length}`
  }
})

btnAnteriorImagem.addEventListener("click", function()
{
  if (relatorioFinal !== null)
  {
    relatorioFinal.imagens[currentImageIndex].classList.remove("selected")
    relatorioFinal.texto[currentImageIndex].classList.remove("selected")
    currentImageIndex--
    if(currentImageIndex < 0)
    {
      currentImageIndex = relatorioFinal.imagens.length -1
    }
    relatorioFinal.imagens[currentImageIndex].classList.add("selected")
    relatorioFinal.texto[currentImageIndex].classList.add("selected") 
    let contador = document.getElementById("contador")
    contador.innerText = `Pokemon ${currentImageIndex + 1} de ${relatorioFinal.imagens.length}`
  }
})

inptNomePokemon.addEventListener("keyup", function() 
{
  nomePokemon = document.getElementById("inptNomePokemon").value 
})

btnPesquisar.addEventListener("click", function(event) 
{
  event.preventDefault()
  pokemonsFiltrados = filtraPokemon(nomePokemon)
  dadosGerais()
  relatorioFinal = imprimeRelatorio()
  if (relatorioFinal == undefined)
  {
      console.log("Pokemon(s) não encontrado(s)")
  }
})

function imprimeRelatorio() 
{
  if (pokemonsFiltrados.length !== 0)
  {
    let dvDadosGerais    
    let dados
    dvDadosGerais = document.getElementById("dvDadosGerais")
    dvDadosGerais.innerHTML = ''; 
    dados = document.createElement(`dados`)
    dados.innerText = `Foram encontrado(s) ${pokemonsFiltrados.length} pokemon(s).`
    dados.id = "dados"
    dados.className = "dados"        
    dvDadosGerais.appendChild(dados)

    let img = null
    let texto = null

    pokemonsFiltrados.innerHTML = '';
    dvContainerImg.innerHTML = '';
    dvContainerTexto.innerHTML = '';
    
    pokemonsFiltrados.forEach(function (pokemon, i) {
      img = document.createElement(`img`)
      img.src = pokemon.img
      img.id = "img"
      img.className = "img"        
      dvContainerImagens.appendChild(img)

      texto = document.createElement("relatorio")  
      texto.innerText = `${pokemon.name.toUpperCase()}\nAltura: ${pokemon.height}\nPeso: ${pokemon.weight}`        
      texto.id = "relatorio"
      texto.className = "relatorio"
      dvContainerTexto.appendChild(texto)

      if (i == 0)
      {
        img.classList.add("selected")
        texto.classList.add("selected")
        let contador = document.getElementById("contador")
        contador.innerText = `Pokemon ${currentImageIndex + 1} de ${pokemonsFiltrados.length}`        
      }
    })
    return {
      imagens: document.querySelectorAll("#img"),
      texto: document.querySelectorAll("#relatorio"),
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

// function nextEvolution(pokemon)
// {
//   const evolucoes = ""
//   if (pokemon.next_evolution !== null && pokemon.next_evolution !== undefined)
//   {
//     pokemon.next_evolution.forEach(evolucao => {
//       evolucoes = evolucoes + `${evolucao.name},`
//     });
//   }
//   if (evolucoes == "")
//     evolucoes = "Nenhuma"
//   else 
//     evolucoes = evolucoes.slice(1, evolucoes.length -1)

//   return evolucoes
// }
function dadosGerais()
{
  // const peso
  // peso = document.createElement(`dadosGerais`)
  // peso.innerText = `Média de peso dos pokemons: ${(pokemonsFiltrados.reduce(mediaPeso, 0) / pokemonsFiltrados.length).toFixed(2)} kg`
  // peso.id = "dadosGerais"
  // peso.className = "dadosGerais"        
  // dvContainerImagens.appendChild(peso)
  // function mediaPeso(soma, pokemon) {
  //     return soma + Number(pokemon.weight.replace(" kg", ""))
  // }

  // const altura
  // altura = document.createElement(`dadosGerais`)
  // altura.innerText = `Média de altura dos pokemons: ${(pokemonsFiltrados.reduce(mediaAltura, 0) / pokemonsFiltrados.length).toFixed(2)} metros`
  // altura.id = "dadosGerais"
  // altura.className = "dadosGerais"        
  // dvContainerImagens.appendChild(altura)  
  // function mediaAltura(soma, pokemon) {
  //     return soma + Number(pokemon.height.replace(" m", ""))
  // }

  // const capturados
  // capturados = document.createElement(`dadosGerais`)
  // capturados.innerText = `Todos foram capturados? ${sN(pokemonsFiltrados.reduce(todosCapturados, true)) }`
  // capturados.id = "dadosGerais"
  // capturados.className = "dadosGerais"        
  // dvContainerImagens.appendChild(capturados)      
  // function todosCapturados(soma, pokemon) {
  //     return soma && pokemon.captured
  // }

}
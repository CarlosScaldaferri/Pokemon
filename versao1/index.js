/*
Dados retirados do site:
    https://awesomeopensource.com/project/jdorfman/awesome-json-datasets
*/
import pokemons from '../pokemons.json' assert {type: 'json'}

let globalCurrentIndex = 0
let globaFilteredPokemons = []

function search(pokemons, chavePesquisa)
{
    globalCurrentIndex = 0
    console.clear()
    globaFilteredPokemons = []
    pokemons.forEach(pokemon => {
        if (pokemon.name.toUpperCase().indexOf(chavePesquisa.toUpperCase()) > -1)
        {
          globaFilteredPokemons.push(pokemon)
          console.log(`${pokemon.name.toUpperCase()}\n\n${report(pokemon)}\n\n`)
        }
    });    
  
    return globaFilteredPokemons
}

function report(pokemon)
{
    return `Altura: ${pokemon.height}\nPeso: ${pokemon.weight}\nTipo: ${pokemon.type}\nPontos fracos: ${pokemon.weaknesses}\nProximas evoluções: ${nextEvolution(pokemon)}\nCapturado: ${sN(pokemon.captured)}`
}

inptPokemonName.addEventListener("keypress", function(e) 
{  
  if (e.key === "Enter")
  {
    document.getElementById("dvPokemonName").innerHTML = ""
    document.getElementById("dvPokemonCount").innerHTML = ""
    document.getElementById("dvCenterLeft").innerHTML = ""
    document.getElementById("dvCenterRight").innerHTML = ""
    document.getElementById("dvMainImg").innerHTML = ""
    document.getElementById("dvTopReportBottom").innerHTML = ""
    document.getElementById("dvBottomReport").innerHTML = ""

    e.preventDefault()

    let inptPokemonName = document.getElementById("inptPokemonName").value
    let dvMainImg = document.getElementById("dvMainImg")

    dvMainImg.innerHTML = ""

    if (inptPokemonName == "")
    {
        globalCurrentIndex = 0
        console.clear()
        globaFilteredPokemons = []
        let nome = document.createElement("lblPokemonNome")  
        nome.innerText = "Pesquisa vazia"
        nome.id = "lblPokemonNome"
        nome.className = "lblPokemonNome"        
        dvMainImg.appendChild(nome)
    } else
    {
        globaFilteredPokemons = search(pokemons, inptPokemonName)        
        if (globaFilteredPokemons.length == 0)
        {
            let nome = document.createElement("lblPokemonNome")  
            nome.innerText = "Não encontrado"
            nome.id = "lblPokemonNome"
            nome.className = "lblPokemonNome"
            dvMainImg.appendChild(nome)
        } else
        {
          fillItems()
        }
    }
  }
})

function fillItems()
{
  document.getElementById("dvPokemonName").innerHTML = ""
  document.getElementById("dvPokemonCount").innerHTML = ""
  document.getElementById("dvCenterLeft").innerHTML = ""
  document.getElementById("dvCenterRight").innerHTML = ""
  document.getElementById("dvMainImg").innerHTML = ""
  document.getElementById("dvTopReportBottom").innerHTML = ""
  document.getElementById("dvBottomReport").innerHTML = ""

  if (globaFilteredPokemons.length !== 0) 
  {
    //Carrega elementos do centro
    let img = document.createElement("img")
    img.src = globaFilteredPokemons[globalCurrentIndex].img
    img.id = "MainImg"
    img.className = "MainImg"   
    document.getElementById("dvMainImg").appendChild(img) 

    let nome = document.createElement("label")  
    nome.innerText = globaFilteredPokemons[globalCurrentIndex].name.toUpperCase()  
    nome.id = "lblPokemonNome"
    nome.className = "lblPokemonNome"
    document.getElementById("dvPokemonName").appendChild(nome)

    document.getElementById("dvPokemonCount").innerText = `Pokemon ${globalCurrentIndex + 1} de ${globaFilteredPokemons.length}`

    let textR = document.createElement("div")  
    textR.innerText = report(globaFilteredPokemons[globalCurrentIndex])
    textR.className = "dvTopReportChild"
    document.getElementById("dvTopReportBottom").appendChild(textR)

    let bottomReport = document.createElement("div")
    let weight = `${(globaFilteredPokemons.reduce((a, b) => a + Number(b.weight.replace(" kg", "")), 0) / globaFilteredPokemons.length).toFixed(2)}`
    let height = `${(globaFilteredPokemons.reduce((a, b) => a + Number(b.height.replace(" m", "")), 0) / globaFilteredPokemons.length).toFixed(2)}`
    let captured = `${sN(globaFilteredPokemons.reduce((a, b) => a + b.captured, false))}`
    bottomReport.innerText = `DADOS GERAIS\n\nMédia de peso dos pokemons: ${weight} kg\nMédia de altura dos pokemons: ${height} metros\nTodos foram capturados? ${sN(captured)}` 
    bottomReport.className = "dvReportChild"  
    document.getElementById("dvBottomReport").appendChild(bottomReport) 
    
    //Carrega imagens pequenas
    const numeroImagens = Math.floor(document.getElementById("dvCenterRight").offsetWidth / document.getElementById("dvCenterRight").offsetHeight);
    for (let index = 1; index <= numeroImagens; index++) {
      if (globalCurrentIndex + index < globaFilteredPokemons.length)
      {
        img = document.createElement("img")
        img.src = globaFilteredPokemons[globalCurrentIndex + index].img
        img.id = "imgP"
        img.className = "imgP"       
        document.getElementById("dvCenterRight").appendChild(img)
      }
    }
    for (let index = numeroImagens -1; index >= 0; index--) {
      if (globalCurrentIndex - index > 0)
      { 
        img = document.createElement("img")
        img.src = globaFilteredPokemons[globalCurrentIndex - index -1].img
        img.id = "imgP"
        img.className = "imgP"      
        document.getElementById("dvCenterLeft").appendChild(img)
      }
    }
  }
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

function sN(boleano)
{
    if (boleano)
        return "Sim" 
    else 
        return "Não"
}

document.getElementById("btnNext").addEventListener("click", function(e) 
{
  if (globaFilteredPokemons !== [])
  {
    globalCurrentIndex++
    if(globalCurrentIndex >= globaFilteredPokemons.length)
    {
      globalCurrentIndex = 0
    }
    fillItems()
  }
})
document.getElementById("btnPrevious").addEventListener("click", function(e)
{
  if (globaFilteredPokemons !== [])
  {   
    globalCurrentIndex-- 
    if(globalCurrentIndex < 0)
    {
      globalCurrentIndex = globaFilteredPokemons.length -1
    }
    fillItems()
  }
})

window.addEventListener('resize', function() {
  fillItems()
});


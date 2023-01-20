/*
Dados retirados do site:
    https://awesomeopensource.com/project/jdorfman/awesome-json-datasets
*/
import pokemons from '../pokemons.json' assert {type: 'json'}

let globalCurrentIndex = 0
let globaFilteredPokemons = []

window.addEventListener("load", function(event) {
  event.preventDefault()
  globaFilteredPokemons = search(pokemons, "", Math.floor(Math.random() * (150 + 1)), true)
  fillItems(false)
})


function search(pokemons, chavePesquisa, currentIndex = 0, isToFillAll = false)
{  
    globalCurrentIndex = currentIndex
    console.clear()
    globaFilteredPokemons = []
    pokemons.forEach(pokemon => {
        if (pokemon.name.toUpperCase().indexOf(chavePesquisa.toUpperCase()) > -1 || isToFillAll)
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

inptPokemonName.addEventListener("keypress", function(event) 
{  
  if (event.key === "Enter")
  {
    document.getElementById("dvPokemonName").innerHTML = ""
    document.getElementById("dvPokemonCount").innerHTML = ""
    document.getElementById("dvCenterLeft").innerHTML = ""
    document.getElementById("dvCenterRight").innerHTML = ""
    document.getElementById("dvMainImg").innerHTML = ""
    document.getElementById("dvTopReportBottom").innerHTML = ""
    document.getElementById("btnPrevious").style.display = 'none';
    document.getElementById("btnNext").style.display = 'none';

    event.preventDefault()

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
            nome.innerText = "Pokemon não encontrado"
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

function fillItems(isToPrintGeneralData = true)
{
  document.getElementById("dvPokemonName").innerHTML = ""
  document.getElementById("dvPokemonCount").innerHTML = ""
  document.getElementById("dvCenterLeft").innerHTML = ""
  document.getElementById("dvCenterRight").innerHTML = ""
  document.getElementById("dvMainImg").innerHTML = ""
  document.getElementById("dvTopReportBottom").innerHTML = ""
  document.getElementById("btnPrevious").style.display = 'none';
  document.getElementById("btnNext").style.display = 'none';

  if (globaFilteredPokemons.length !== 0) 
  {
    document.getElementById("btnPrevious").style.display = 'block';
    document.getElementById("btnNext").style.display = 'block';    
    //Carrega elementos do centro    
    let img = document.createElement("img")
    img.src = globaFilteredPokemons[globalCurrentIndex].img
    img.id = "MainImg"
    img.className = "MainImg"   
    document.getElementById("dvMainImg").appendChild(img) 

    let nome = document.createElement("a")  
    nome.innerText = globaFilteredPokemons[globalCurrentIndex].name.toUpperCase()  
    nome.id = "lblPokemonNome"
    nome.className = "lblPokemonNome"
    nome.href = `https://www.pokemon.com/br/pokedex/${globaFilteredPokemons[globalCurrentIndex].name}`
    nome.target = "_blank"
    document.getElementById("dvPokemonName").appendChild(nome)
    document.getElementById("dvPokemonCount").innerText = `Pokemon ${globalCurrentIndex + 1} de ${globaFilteredPokemons.length}`

    let textR = document.createElement("div")  
    textR.innerText = report(globaFilteredPokemons[globalCurrentIndex])
    textR.className = "dvTopReportChild"
    document.getElementById("dvTopReportBottom").appendChild(textR)

    if (isToPrintGeneralData)
    {
      let weight = `${(globaFilteredPokemons.reduce((a, b) => a + Number(b.weight.replace(" kg", "")), 0) / globaFilteredPokemons.length).toFixed(2)}`
      let height = `${(globaFilteredPokemons.reduce((a, b) => a + Number(b.height.replace(" m", "")), 0) / globaFilteredPokemons.length).toFixed(2)}`
      let captured = `${sN(globaFilteredPokemons.reduce((a, b) => a + b.captured, false))}`
      console.log(`DADOS GERAIS\n\nMédia de peso dos pokemons: ${weight} kg\nMédia de altura dos pokemons: ${height} metros\nTodos foram capturados? ${sN(captured)}`)
    }
    
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
    fillItems(false)
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
    fillItems(false)
  }
})

window.addEventListener('resize', function() {
  fillItems(false)
});


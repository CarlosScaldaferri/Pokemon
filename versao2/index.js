  /*
  Dados retirados do site:
      https://awesomeopensource.com/project/jdorfman/awesome-json-datasets
  */
  import pokemons from '../pokemons.json' assert {type: 'json'}

  const inptSearchInput = document.getElementsByClassName("inptSearchInput")[0]

  inptSearchInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter")
    {
      filteredPokemons(pokemons, document.getElementsByClassName("inptSearchInput")[0].value)
    }
  })

  function filteredPokemons(pokemons, busca)
  { 
    document.getElementsByClassName("sctnStatus")[0].innerHTML = ""
    document.getElementsByClassName("sctnItems")[0].innerHTML = ""

    if (busca == "")
    {
      document.getElementsByClassName("sctnStatus")[0].innerText = "A chave de pesquisa está vazia"   
    }
    else {
      let list = ""
      let pokemonsFiltrados = []
      pokemons.forEach(pokemon => {
          if (pokemon.name.toUpperCase().indexOf(busca.toUpperCase()) > -1)
          {
              let internalReport = report(pokemon)
              console.log("\n\n" + pokemon.name.toUpperCase() + "\n" + internalReport)
              list +=              
                  `<div class="dvPokemon">
                    <a class="dvPokemonName" hRef="https://www.pokemon.com/br/pokedex/${pokemon.name}" target="_blank">${pokemon.name.toUpperCase()}</a>
                    <div class="dvPokemon-image">
                    <img class="imgPokemon" src="${pokemon.img}" alt="">
                    </div>
                  <div class="dvPokemonReport">${internalReport}</div></div></a>`
              pokemonsFiltrados.push(pokemon)
          }
      })

      if (list == "")
      {
        document.getElementsByClassName("sctnStatus")[0].innerText = "Pokemon não encontrado"        
      } else{
        document.getElementsByClassName("sctnItems")[0].innerHTML = list
        document.getElementsByClassName("sctnStatus")[0].innerText = `${pokemonsFiltrados.length} Pokemon(s) encontrado(s)`
        const generalData = `DADOS GERAIS\n\nMédia de peso dos pokemons: ${(pokemonsFiltrados.reduce(mediaPeso, 0) / pokemonsFiltrados.length).toFixed(2)} kg\nMédia de altura dos pokemons: ${(pokemonsFiltrados.reduce(mediaAltura, 0) / pokemonsFiltrados.length).toFixed(2)} metros\nTodos foram capturados? ${sN(pokemonsFiltrados.reduce(todosCapturados, true)) }`
        console.log("\n\n" + generalData)        
      }           
    }
  }

  function report(pokemon)
  {
      return `Altura: ${pokemon.height}\nPeso: ${pokemon.weight}\nTipo: ${pokemon.type}\nPontos fracos: ${pokemon.weaknesses}\nProximas evoluções: ${nextEvolution(pokemon)}\nCapturado: ${sN(pokemon.captured)}`
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
  function mediaPeso(soma, pokemon) {
    return soma + Number(pokemon.weight.replace(" kg", ""))
  }
  function mediaAltura(soma, pokemon) {
    return soma + Number(pokemon.height.replace(" m", ""))
  }
  function todosCapturados(soma, pokemon) {
  return soma && pokemon.captured
  }


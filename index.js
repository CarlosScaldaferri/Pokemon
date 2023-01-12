  /*
  Dados retirados do site:
      https://awesomeopensource.com/project/jdorfman/awesome-json-datasets
  */
  import pokemons from '../pokemons.json' assert {type: 'json'}

  const btnSearchInput = document.getElementsByClassName("btnSearchInput")[0]

  btnSearchInput.addEventListener("click", function(){
      filteredPokemons(pokemons, document.getElementsByClassName("inptSearchInput")[0].value)    
  })

  function filteredPokemons(pokemons, busca)
  {  
    const sctnItems = document.getElementsByClassName("sctnItems")[0]
    if (busca == "")
    {
      sctnItems.innerHTML = `<div class="dvNaoEncontrado">A chave de pesquisa está vazia</div>`   
    }
    else {
      let list = ""
      let pokemonsFiltrados = []
      let internalReport = ""

      pokemons.forEach(pokemon => {
          if (pokemon.name.toUpperCase().indexOf(busca.toUpperCase()) > -1)
          {
              internalReport = report(pokemon)
              console.log(internalReport)
              list += `<div class="dvPokemon">
                <div class="dvPokemon-image">
                  <img class="imgPokemon" src="${pokemon.img}" alt="">
                </div>              
              ${internalReport}</div>`
              pokemonsFiltrados.push(pokemon)
          }
      })
      if (list == "")
      {
        list = `<div class="dvNaoEncontrado">Pokemon não encontrado</div>`                  
        document.getElementsByClassName("ftrBootom")[0].innerHTML = ""
      } else{
        const generalData = `DADOS GERAIS\n\nMédia de peso dos pokemons: ${(pokemonsFiltrados.reduce(mediaPeso, 0) / pokemonsFiltrados.length).toFixed(2)} kg\nMédia de altura dos pokemons: ${(pokemonsFiltrados.reduce(mediaAltura, 0) / pokemonsFiltrados.length).toFixed(2)} metros\nTodos foram capturados? ${sN(pokemonsFiltrados.reduce(todosCapturados, true)) }`
        console.log(generalData)
        document.getElementsByClassName("ftrBootom")[0].innerHTML = `<div class="dvGeneralData">${generalData}</div>`        
      }
      sctnItems.innerHTML = list;     
    }
  }
  function report(pokemon)
  {
      return `${pokemon.name.toUpperCase()}
                  Altura: ${pokemon.height}\nPeso: ${pokemon.weight}\nTipo: ${pokemon.type}\nPontos fracos: ${pokemon.weaknesses}\nProximas evoluções: ${nextEvolution(pokemon)}\nCapturado: ${sN(pokemon.captured)}`
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


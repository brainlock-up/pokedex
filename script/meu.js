function run(){
    let monstros = document.querySelector('#pokedivs')
    request().then(pokemons =>{
        pokemons.forEach(pokemon =>{
        monstros.innerHTML +=
        `<div class="poke-card ${pokemon.types[0].type.name}">
            
            <img src="img/${pokeImgId(pokemon.id)}.png">
        
              <div class="box-nome">
                <span class="nome-text">${pokemon.name.toUpperCase()}</span>
              </div>
              <div class="box-tipo">
               ${getPokeTypes(pokemon.types)}
              </div>
        </div>`
        getPokeTypes(pokemon.types);
      })
    }).catch(error=>{
      console.log('error', error)
    })
}
function pokeImgId(pokeId){
    let pokeIdToString = pokeId.toString().length;
    switch (pokeIdToString) {
        case 1 :
            return "00"+pokeId;
            break;
        case 2:
            return "0" + pokeId;
            break;
        default :
            return pokeId;
            break;
    }
}
function getPokeTypes(types){
  let typeFinal="";
    types.forEach(element => {
      let type = element.type.name.toUpperCase(); 
      typeFinal += `<span class="${element.type.name}-text">${type}</span>`;
    });  
  return typeFinal;
}
function request() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let promises = [];
    for (let i = 1; i <= 151; i++) {
      let promise = fetch("https://pokeapi.co/api/v2/pokemon/" + i, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => {
          console.log('error', error);
          throw error;
        });  
      promises.push(promise);
    } 
    return Promise.all(promises);
  }
run()
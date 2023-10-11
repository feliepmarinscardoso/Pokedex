const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonTypesContainer = document.querySelector('.type-container'); // Seleciona o container dos tipos
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const typeContainer = document.querySelector('.pokemon-types'); // Elemento para exibir os tipos
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  
  const data = await fetchPokemon(pokemon);
  
  if (data) {
      // Limpa o conteúdo anterior
      pokemonTypesContainer.innerHTML = '';
      
      pokemonImage.style.display = 'block';
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      input.value = '';
      searchPokemon = data.id;
      
      // Adicione todos os tipos ao container
      data.types.forEach(type => {
          const typeElement = document.createElement('span');
          typeElement.classList.add('pokemon-type');
          typeElement.textContent = type.type.name;
          pokemonTypesContainer.appendChild(typeElement);
      });
      
      if (data.types.length === 1) {
          // Adicione uma classe para estilo caso haja apenas um tipo
          pokemonTypesContainer.classList.add('single-type');
      } else {
          // Remova a classe se houver mais de um tipo
          pokemonTypesContainer.classList.remove('single-type');
      }
      
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  } else {
      pokemonImage.style.display = 'none';
      pokemonName.innerHTML = 'Not found :c';
      pokemonNumber.innerHTML = '404';
      pokemonTypesContainer.innerHTML = '';
      input.value = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value);
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
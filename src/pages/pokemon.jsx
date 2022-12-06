import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { httpRequest, getPokemons } from '../axios/config';
import { LocalstorageManager } from '../helpers/localStorageMananger';
import Header from '../components/header';
import PokemonCard from '../components/PokemonCard';

function Pokemon() {
  const [isloading, setIsLoading] = useState(true);
  const [isLogged, setisLogged] = useState(false); 
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

 const logIn = async () => {
    try {
      await httpRequest.get('/validate', {
        headers: { Authorization: LocalstorageManager.getToken() }, } )
        .then(({ data }) => {
          const { nome } = data;
          setName(nome);
          setIsLoading(false);
          setisLogged(true);
        });
    } catch (AxiosError) {
      if (!token) {
      navigate('/login');
      }
    }
  }; 
  
  const importPokemons = async () => {
    await getPokemons.get(`/pokemon?limit=10&offset=${offset}`)
    .then((response) => { 
        setPokemon(response.data.results);
    });
  };    

const addOffset = () => {
  setOffset(offset + 10);
  setIsButtonDisabled(false);
  console.log(offset);
} 

const subOffset = () => {
  if(offset > 0 ) setOffset(offset -10);
  setIsButtonDisabled(true);
} 
  
  useEffect(() => {
    setToken( LocalstorageManager.getToken());
    logIn();
    importPokemons();
  }, []);

  useEffect(() => {
    importPokemons();
  }, [offset]);

  return (
    <main class="main-center-pokemons">
      {isloading && <h1>Carregando...</h1>}
      {isLogged &&
        <Header name={name} />   
      }
    <div class="content-column">
      { (isLogged || pokemon) && pokemon.map((pokemon, index) => (
            <div class="box"> 
        <PokemonCard
          key={ index }
          name={ pokemon.name }
          url={ pokemon.url }
        />
      </div>
      ))}
      </div>
      <footer class="footer-component">
        <button
        id="sub"
        disabled={isButtonDisabled}
        onClick={subOffset}        
        >
         	&lt;
        </button>
        <p>{ (offset/10) } </p>
        <button
        id="add"
        onClick={addOffset}
        >
          &gt;
        </button>
      </footer>
    </main>
  );
}

export default Pokemon;

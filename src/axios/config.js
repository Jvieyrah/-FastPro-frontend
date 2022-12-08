import axios from 'axios';

const httpRequest = axios.create({
  baseURL: 'https://fastpro-backend-production.up.railway.app',
});

const getPokemons = axios.create({
   baseURL: 'https://pokeapi.co/api/v2',
 });

export { httpRequest, getPokemons };
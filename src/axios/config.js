import axios from 'axios';

export const httpRequest = axios.create({
  baseURL: 'https://fastpro-backend-production.up.railway.app',
});

export const getPokemons = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

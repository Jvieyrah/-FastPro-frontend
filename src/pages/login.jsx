import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import isLoginValid from '../validations/loginValidation';
import { httpRequest } from '../axios/config';
import { LocalstorageManager } from '../helpers/localStorageMananger';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const valid = isLoginValid(email, password);
    setIsButtonDisabled(!valid);
  }, [email, password]);

  const navigate = useNavigate();

  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      await httpRequest.post('/login', { email, senha: password })
        .then(({ data }) => {          
          const { token } = data;
          LocalstorageManager.setToken(token);
          navigate('/pokemon');
        });
      } catch (AxiosError) {
        console.log (AxiosError);
        setDisplayError(AxiosError.response.data.message);
    }
  };

  return (
    <main class="main-center" >
      <header>
        <img
         class="logo-resize"
         src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
         alt="PokeLogo"
         />
      </header>
      <form
      class="form-signin"
      onSubmit={ loginSubmit }
      >
         <div class="content">
            <div class="box">
           <input
           class = "imput-data"
            data-testid="common_login__input-email"
            type="email"
            id="email"
            placeholder="email@email.com.br"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </div>
        </div>
        <div class="content">
            <div class="box">
          <input
            class = "imput-data"
            data-testid="common_login__input-password"
            type="password"
            id="password"
            placeholder="******"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </div>
        </div>
        <button
          class="button-9"
          data-testid="common_login__button-login"
          type="submit"
          disabled={ isButtonDisabled }
        >
          Login
        </button>
        <button
          class="button-10"
          data-testid="common_login__button-register"
          type="submit"
          onClick={ () => navigate('/cadastrar') }
        >
          Ainda não tenho conta
        </button>
      </form>
      { displayError
       && (
         <p
         data-testid="common_login__element-invalid-email"
         id='error'
         >
           { displayError }
         </p>
       ) }
    </main>
  );
}

export default Login;

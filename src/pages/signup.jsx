import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import isLoginValid from '../validations/loginValidation';
import { httpRequest } from '../axios/config';
import { LocalstorageManager } from '../helpers/localStorageMananger';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const valid = isLoginValid(email, password);
        if (valid || name.length > 4 || phone.length > 8) {
            setIsButtonDisabled(!valid);
        }
    }, [email, password, name, phone]);

    const navigate = useNavigate();

    const signInSubmit = async (event) => {
        event.preventDefault();
        try {
            await httpRequest.post('/signup', { nome: name, email, telefone: phone, senha: password })
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
        <main class="main-center">
            <header>
            <img
         class="logo-resize2"
         src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
         alt="PokeLogo"
         />
                <h1>Preencha todos os dados para se cadastrar.</h1>
            </header>
        
            <form
             class="form-signin"
                onSubmit={signInSubmit}
            >
        <div class="content">  
                    <input
                    class = "imput-data"
                        data-testid="signup-name"
                        type="text"
                        id="name"
                        placeholder="Nome"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
        </div>
        <div class="content">
            <div class="box">
                    <input
                        class = "imput-data"
                        data-testid="signup-email"
                        type="email"
                        id="email"
                        placeholder="email@email.com"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
        </div>
        <div class="content">
                    <input
                        class="imput-data"
                        data-testid="signup-phone"
                        type="text"
                        id="phone"
                        placeholder="Telefone 99 99999-9999"
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
        </div>
        <div class="content">
                    <input
                        class="imput-data"
                        data-testid="signup-password"
                        type="password"
                        id="password"
                        placeholder="Senha 8 digitos ex: Senh@123"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
        </div>
                <button
                    class="button-9"
                    data-testid="signup-btn"
                    type="submit"
                    disabled={isButtonDisabled}
                >
                    Cadastrar
                </button>
            </form>
            {displayError
                && (
                    <p
                    data-testid="common_login__element-invalid-email"
                    id = "error"
                    >
                        {displayError}
                    </p>
                )}
        </main>
    );
}

export default Signup;


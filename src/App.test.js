import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import { DefaultResponse } from './helpers/mocks';
import axios from 'axios';

describe('Valida formulári de login', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });
  jest.mock('./axios/config', () => jest.fn());
  jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(DefaultResponse));

  it('Será validado se ao clicar no botão "Ainda não tenho conta", é redirecionado para a rota "/cadastrar',
    async () => {
      renderPath("/");
      const buttonRegister = screen.getByTestId('common_login__button-register');
      userEvent.click(buttonRegister);
      expect(window.location.pathname).toBe('/cadastrar');
    });

  it('Será validado se ao navegar para a rota /, o input e o botão especificados estão presentes',
    async () => {
      renderPath("/");
      const inputEmail = screen.getByTestId('common_login__input-email');
      const inputPassword = screen.getByTestId('common_login__input-password');
      const buttonLogin = screen.getByTestId('common_login__button-login');
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(buttonLogin).toBeInTheDocument();
      expect(buttonLogin).toBeDisabled();
    });

  it('Será validado se ao digitar um email inválido, o botão de login é desabilitado',
    async () => {
      renderPath("/");
      const inputEmail = screen.getByTestId('common_login__input-email');
      const inputPassword = screen.getByTestId('common_login__input-password');
      const buttonLogin = screen.getByTestId('common_login__button-login');
      userEvent.type(inputEmail, 'email');
      userEvent.type(inputPassword, '012345678');
      expect(buttonLogin).toBeDisabled();
    });

  it('Será validado se ao digitar um email válido e uma senha inválida, o botão de login é desabilitado',
    async () => {
      renderPath("/");
      const inputEmail = screen.getByTestId('common_login__input-email');
      const inputPassword = screen.getByTestId('common_login__input-password');
      const buttonLogin = screen.getByTestId('common_login__button-login');
      userEvent.type(inputEmail, 'email@teste.com');
      userEvent.type(inputPassword, '123');
      expect(buttonLogin).toBeDisabled();
    });

  it('Será validado se ao digitar um email válido e uma senha válida, o botão de login é habilitado',
    async () => {
      renderPath("/");
      const inputEmail = screen.getByTestId('common_login__input-email');
      const inputPassword = screen.getByTestId('common_login__input-password');
      const buttonLogin = screen.getByTestId('common_login__button-login');
      userEvent.type(inputEmail, 'email@teste.com');
      userEvent.type(inputPassword, 'Senh@Val1d@');
      expect(buttonLogin).toBeEnabled();
    });
});

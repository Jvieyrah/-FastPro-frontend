// regesx de validação de e-mail
const emailRegex = /\S+@\S+\.\S+/;
const eight = 8;

function isLoginValid(email, password) {
  const validated = [emailRegex.test(email), password.length >= eight];
  return validated.every((value) => value);
}

export default isLoginValid;

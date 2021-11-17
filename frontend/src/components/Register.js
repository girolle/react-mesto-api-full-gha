import React from 'react';
import { Link } from 'react-router-dom';

function Register (props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function registerInfo(e){
    e.preventDefault();
    props.onRegisterUser({
      password: password,
      email: email
    })
  }

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  function handlePasswordChange(e){
    setPassword(e.target.value);
  }

    return(
        <div className="form">
          <form className="form__container form__container_register" onSubmit={registerInfo} noValidate>
            <h2 className="form__title">Регистрация</h2>
            <input id="email-input" className="form__input form__input_email" onChange={handleEmailChange} placeholder="Email" name="e-mail" type="email" minLength="2" maxLength="40" required />
            <span className="email-input-error email__input-error" />
            <input id="password-input" className="form__input form__input_password" onChange={handlePasswordChange} placeholder="Пароль" name="password" type="password" minLength="2" maxLength="200" required />
            <span className="password-input-error form__input-error" />
            <button className="form__enter" type="submit">Зарегистрироваться</button>
            <p className="form__already-registered">Уже зарегистрированы?&nbsp;
             <Link to="/sign-in" className="form__already-registered form__already-registered_type_button">
                 Войти
             </Link>
            </p>
          </form>
        </div>
    )
}

export default Register;
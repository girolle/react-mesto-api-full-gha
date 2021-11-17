import React from 'react';

function Login (props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function loginInfo(e){
    e.preventDefault();
    props.onAuthorizationUser({
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
          <form className="form__container form__container_login" onSubmit={loginInfo} noValidate>
            <h2 className="form__title">Вход</h2>
            <input id="email-input" className="form__input form__input_email" onChange={handleEmailChange} placeholder="Email" name="e-mail" type="email" minLength="2" maxLength="40" required />
            <span className="email-input-error email__input-error" />
            <input id="password-input" className="form__input form__input_password" onChange={handlePasswordChange} placeholder="Пароль" name="password" type="password" minLength="2" maxLength="200" required />
            <span className="password-input-error form__input-error" />
            <button className="form__enter" type="submit">Войти</button>
          </form>
        </div>
    )
}

export default Login;
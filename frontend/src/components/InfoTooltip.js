import React from 'react';
import SuccessfulRegist from '../image/SuccessfulRegist.svg';
import TryAgainRegist from '../image/TryAgainRegist.svg';

function InfoTooltip(props){
    return(
        <div className={`popup popup_type_${props.name} ${ props.isOpen ? 'popup_opened' : ''}`} >
        <div className="popup__wrapper">
          <div className="popup__container">
              <img className="popup__register-img" 
              src={props.successfulyRegistered ? SuccessfulRegist : TryAgainRegist} alt="Картинка регистрации"/>
              <h2 className="popup__register-title">{props.successfulyRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
          </div>
          <button className="popup__exit" type="button" onClick={props.onClose}/> 
        </div>
      </div>
    )
}

export default InfoTooltip;
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function Card(props) {

    const userInfo = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === userInfo._id;
    const cardDeleteButtonClassName = (`element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`)

    const isLiked = props.card.likes.some(id => id === userInfo._id);
    const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : 'element__like-button_inactive'}`);
    
    function handleClick(){
        props.onCardImageClick(props.card)
    }

    function handleLikeClick(){
      props.onCardClick(props.card)
    }

    function handleDeleteClick(){
      props.onCardDelete(props.card)
    }

    return(
        <div className="element">
        <button className={cardDeleteButtonClassName} type="button"
        onClick={handleDeleteClick}
        />
        <img className="element__image" src={props.card.link} alt={props.card.name} 
        onClick={handleClick}/>
        <div className="element__main">
          <p className="element__title">{props.card.name}</p>
          <div className="element__like-space">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
            <p className="element__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
        </div>
    )
}
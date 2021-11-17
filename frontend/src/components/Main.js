import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Header from './Header';

function Main(props){

    const userInfo = React.useContext(CurrentUserContext); 

    return(
      <>
      <Header 
      loggedIn={props.loggedIn}
      signOut={props.signOut}
      buttonName="Выйти"
      headerUserEmail={props.headerUserEmail}/>
        <main className="content">
          <section className="profile">
            <div className="profile__content">
              <img className="avatar" src={userInfo.avatar} alt="Ваш аватар" 
              onClick={props.onEditAvatar} />
              <div className="profile__info">
                <ul className="profile__unnumbered-list">
                  <li className="profile__list"><h1 className="profile__name">{userInfo.name}</h1></li>
                  <li className="profile__list"><p className="profile__status">{userInfo.about}</p></li>
                </ul>
                <button className="profile__edit-button" type="button" 
                onClick={props.onEditProfile} />
              </div>
            </div>
            <button className="profile__add-button" type="button" 
            onClick={props.onAddPlace} />
          </section>

          <section className="elements">
              {props.cards.map((item) => (
                  <Card 
                  key={item._id}
                  onCardClick={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                  card={item}
                  onCardImageClick={props.onCardClick}
                  onDeleteCardClick={props.onDeleteCardClick}/>
              )
              )}
          </section>
        </main>
      </>
    )
}

export default Main;
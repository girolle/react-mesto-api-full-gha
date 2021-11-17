import React from 'react'; 
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import authApi from '../utils/authApi';

function App() {

  let api = new Api({
    authorization: localStorage.getItem('jwt'),
    baseUrl: 'https://api.domainname.kostya2120.nomoredomains.club',
  });

  const history = useHistory(); 

  const [loggedIn, setLoggedIn] = React.useState(false);
  function handleLogin(){
    setLoggedIn(true);
  } 

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState('');

  function handleCardLike(card){
    const isLiked = card.likes.some(id => id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => 
      state.map(
        (c) => c._id === card._id ? newCard : c)
      )
  })
    .catch((err) => {
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    });
  } 

  function handleCardDelete(card){
  api.deleteCard(card._id)
  .then(() => {
    setCards((cards.filter(item => item._id !== card._id)))
  })
  .catch((err) => {
    console.log(`Ошибка:${err}. Запрос не выполнен`);
  })
  }

  React.useEffect(() => {
    Promise.all([api.userServerInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setUserEmail(userData.email);
        setCards(cardsData);
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }, [localStorage.getItem('jwt')]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      authApi.tokenCheck(jwt)
      .then((tokenData) => {
        if(tokenData){
          handleLogin();
          history.push('/main');
        }
      })
      .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
      })
    }
  }, []);

  const [selectedCard, setSelectedCard] = React.useState(null);
  function handleCardClick(cardData){
    setSelectedCard(cardData);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }
  
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }

  const[isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = React.useState(false);
  function handleDeleteCardClick(){
    setIsDeleteConfirmPopupOpen(true);
  }

  const[isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setSelectedCard(null);
  };

  function handleUpdateUser(newUserInfo){
    api.editProfile(JSON.stringify(newUserInfo))
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  function handleUpdateAvatar(newAvatarInfo){
    api.editAvatar(JSON.stringify(newAvatarInfo))
      .then((userData) => {
          setCurrentUser(userData);
          closeAllPopups();
      })
      .catch((err) => {
          console.log(`Ошибка:${err}. Запрос не выполнен`);
      })
  }

  function handleUpdateCards(newCardInfo){
    api.addCard(JSON.stringify(newCardInfo))
    .then((cardsData) => {
      setCards([cardsData, ...cards])
      closeAllPopups();
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  const [successfulyRegistered, setSuccessfulyRegistered] = React.useState(false);

  function registerNewUser(registerInfo){
    authApi.registration(JSON.stringify(registerInfo))
    .then((registerData) => {
      setSuccessfulyRegistered(true);
      setIsRegisterPopupOpen(true);
    })
    .catch((err) => {
      setSuccessfulyRegistered(false);
      setIsRegisterPopupOpen(true);
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  function authorizationUser(authorizationInfo){
    authApi.authorization(JSON.stringify(authorizationInfo))
    .then((authorizationData) => {
      localStorage.setItem('jwt', authorizationData.token);
      handleLogin();
      history.push('/main');
    })
    .catch((err) => {
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }
  
  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
}

  return (
    <CurrentUserContext.Provider value = {currentUser}>
    <div className="substrate">
      <div className="page">
        <Switch>
            <ProtectedRoute 
            signOut={signOut}
            headerUserEmail={userEmail}
            path="/main"
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onDeleteCardClick={handleDeleteCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}>
            </ProtectedRoute>
            
          <Route path="/sign-up">
           <Header 
           linkName="Войти"
           linkPath="/sign-in"/>
            <Register 
              onRegisterUser={registerNewUser}/>
            <InfoTooltip 
              name="registerNotification"
              isOpen={isRegisterPopupOpen}
              onClose={closeAllPopups}
              successfulyRegistered={successfulyRegistered}/>
          </Route>

          <Route path="/sign-in">
            <Header 
           linkName="Регистрация"
           linkPath="/sign-up"/>
            <Login 
            onAuthorizationUser={authorizationUser}
            handleLogin={handleLogin}/>
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="sign-in" />}
          </Route>

        </Switch>
        <Footer />

        <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        />

        <EditAvatarPopup 
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar} 
        />
       
      <EditProfilePopup 
        onClose={closeAllPopups} 
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser} 
        />

      <AddPlacePopup 
      onClose={closeAllPopups}
      isOpen={isAddPlacePopupOpen}
      onUpdatePlace={handleUpdateCards}
      />

       <PopupWithForm 
       onClose={closeAllPopups}
       name='deleteConfirm'
       title='Вы уверенны?'
       isOpen={isDeleteConfirmPopupOpen}
       children={
        <button className="popup__save" type="submit">Да</button>
       }
       />
       
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

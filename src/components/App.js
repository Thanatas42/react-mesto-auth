import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/Api.js";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext, CurrentUser } from '../contexts/CurrentUserContext';
import { CardsArrayContex, CardsArray } from '../contexts/CardsArrayContex';
import AuthorizationPopup from './AuthorizationPopup';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleCardClick(select) {
    selectCard(select);
    setIsImagePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const [userInfo, setUserInfo] = React.useState(CurrentUser);
  const [cards, setCards] = React.useState(CardsArray);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserInfo({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id
        });
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === userInfo.userId);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(userData) {
    api.updateUser(userData)
      .then((userData) => {
        setUserInfo({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateavatar(userData) {
    api.updateAvatar(userData)
      .then((userData) => {
        setUserInfo({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleAddPlace(placeData) {
    api
      .createCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return ((
    <div className="App body">
      <CurrentUserContext.Provider value={userInfo}>
        <CardsArrayContex.Provider value={cards}>
          <Header />
          <Switch>
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              component={Main} onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick} card={selectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
            <Route path="/sign-up">
              <AuthorizationPopup title="Регистрация" confirm="Зарегистрироваться">
                <p className="auth__span">Уже зарегистрированы? <Link className="auth__span auth__link" to="/sign-in">Войти</Link></p>
              </AuthorizationPopup>
            </Route>
            <Route path="/sign-in">
              <AuthorizationPopup title="Вход" confirm="Войти" />
            </Route>
            <Route>
              {loggedIn ? (
                <Redirect to="/main" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>
          
          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} closeAllPopups={closeAllPopups} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateavatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <PopupWithForm name="sure" title="Вы&nbsp;уверены?" buttonName="Да" isOpen={false} />

          <Footer />
        </CardsArrayContex.Provider>
      </CurrentUserContext.Provider>
    </div>
  ));
}

export default App;
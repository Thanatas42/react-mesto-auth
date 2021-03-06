import React from 'react';
import { useState, useEffect } from "react";
import { Route, Link, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm.js";
import createApi from "../utils/Api.js";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsArrayContex, CardsArray } from '../contexts/CardsArrayContex';
import * as Auth from '../utils/Auth';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from './Login.js';

import InfoToolTip from './InfoToolTip';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  const [selectedCard, selectCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [api, setApi] = useState(null);

  const auth = (jwt) => {
    Auth.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          setApi(createApi(jwt));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) history.push("/user");
  }, [loggedIn, history]);

  const onReg = ({ passwordInput, emailInput }) => {
    return Auth.register(passwordInput, emailInput).then((res) => {
      if (!res) throw new Error("??????-???? ?????????? ???? ??????");
      return res;
    });
  };

  const onLog = ({ passwordInput, emailInput }) => {
    return Auth.authorize(passwordInput, emailInput).then((res) => {
      if (!res || !res.token)
        throw new Error("???????????????????????? ?????? ???????????????????????? ?????? ????????????");
      if (res.token) {
        setLoggedIn(true);
        setApi(createApi(res.token));
        localStorage.setItem("jwt", res.token);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  };


  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setApi(null);
    history.push("/sign-in");
  };

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
    setIsInfoToolTipOpen(false);
  };

  const [CurrentUser, setUserInfo] = React.useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    userId: "",
  });
  const [cards, setCards] = React.useState(CardsArray);
  const [resStatus, setResStatus] = React.useState(false);

  React.useEffect(() => {
    if (!api) {
      console.log("api is null");
      return;
    }
    console.log("api is not null");

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
  }, [api])


  function handleCardLike(card) {

    const isLiked = card.likes.some((i) => i === CurrentUser.userId);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
// ???????????? ???????????????????? ???????????????? ????????????, ???????????????? ??????????????????, ?? ???????????????????????? ???????????? 404, ???? ?????? ???????????? ?? ???????????? ?????????? ?????????? ??????????
  function handleUpdateUser(userData) {
    api.updateUser(userData)
      .then((userData) => {
        console.log(userData)
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

  const location = useLocation();

  function headerTittle() {
    switch (location.pathname) {
      case '/main':
        return (
          <div className='header__auth'>
            <p className='header__title' style={{ paddingRight: '24px' }}>{email}</p>
            <Link className="header__title auth__link" to="/sign-up" onClick={onSignOut}>??????????</Link>
          </div>
        )

      case '/sign-in':
        return (
          <div className='header__auth'>
            <Link className="header__title auth__link" to="/sign-up">??????????????????????</Link>
          </div>
        )

      case '/sign-up':
        return (
          <div className='header__auth'>
            <Link className="header__title auth__link" to="/sign-in">??????????</Link>
          </div>
        )

      default:
        break;
    }
  }

  return ((
    <div className="App body">
      <CurrentUserContext.Provider value={CurrentUser}>
        <CardsArrayContex.Provider value={cards}>
          <Header>
            {headerTittle()}
          </Header>
          <Switch>
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              component={Main} onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick} card={selectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onSignOut={onSignOut} />
            <Route path="/sign-up">
              <Register onReg={onReg} onInfoTool={setIsInfoToolTipOpen} setResStatus={setResStatus}>
                <p className="auth__span">?????? ?????????????????????????????????<Link className="auth__span auth__link" to="/sign-in">??????????</Link></p>
              </Register>
            </Route>
            <Route path="/sign-in">
              <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} onLog={onLog} />
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
          <PopupWithForm name="sure" title="????&nbsp;???????????????" buttonName="????" isOpen={false} />
          <InfoToolTip isOpen={isInfoToolTipOpen} closeAllPopups={closeAllPopups} resStatus={resStatus} />

          <Footer />
        </CardsArrayContex.Provider>
      </CurrentUserContext.Provider>
    </div>
  ));
}

export default App;
import React from 'react';
import { useContext } from "react";
import pencil from "../images/logo/pencil.svg";
import Card from "../components/Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsArrayContex } from '../contexts/CardsArrayContex';


function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const cards = useContext(CardsArrayContex);

    return ((
        <main className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__image" onClick={props.onEditAvatar} src={currentUser.userAvatar} alt="Аватар вашего профиля" />
                    <div className="profile__hover" onClick={props.onEditAvatar}><img className="profile__hover-image" src={pencil} alt="Аватар вашего профиля" /></div>
                </div>
                <article className="profile-info">
                    <div className="profile-info__container">
                        <h1 className="profile-info__name">{currentUser.userName}</h1>
                        <button className="profile-info__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile-info__subname">{currentUser.userDescription}</p>
                </article>
                <button className="profile__add-button" type="button" onClick={props.isAddPlacePopupOpen}></button>
            </section>

            <section>
                <ul className="cards">
                    {cards.map((item, i) => {
                        return (
                            <Card card={item} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                        )
                    })}
                </ul>
            </section>
        </main >
    ));
};

export default Main;
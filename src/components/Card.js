import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    function handleClick() {
        props.onCardClick(props.card);
    };

    const isOwn = props.card.owner._id === currentUser.userId;
    const isLiked = props.card.likes.some((i) => i._id === currentUser.userId);


    return ((
        <li className="card">
            <img className="card__image" src={props.card.link} onClick={handleClick} alt={props.card.name} />
            <button className="card__delete-button" type="button"
                style={isOwn ? { visibility: 'visible' } : { visibility: 'hidden' }}
                onClick={() => { props.onCardDelete(props.card) }}>
            </button>
            <div className="card__container">
                <h2 className="card__title">{props.card.name}</h2>
                <div>
                    <button className={isLiked ? 'card__like-button card__like-button_theme_active' : 'card__like-button'}
                        type="button" onClick={() => {props.onCardLike(props.card)}}>
                    </button>
                    <div className="card__counter">{props.card.likes.length === 0 ? null : props.card.likes.length}</div>
                </div>
            </div>
        </li>
    ));
};

export default Card;
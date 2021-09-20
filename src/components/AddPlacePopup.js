import React from 'react';
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
    //Бросил все силы на 12 работу, решил попозже перевести на управляемые
    const namePlaceRef = useRef();
    const linkPlaceRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            link: linkPlaceRef.current.value,
            name: namePlaceRef.current.value,
        });
    }

    return ((
        <PopupWithForm title="Новое&nbsp;место" buttonName="Сохранить" isOpen={props.isOpen} closeAllPopups={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input className="popup__text"
                    placeholder="Название" type="text" name="name-place"
                    minLength="2" maxLength="30"
                    required ref={namePlaceRef} />
                <span className="popup__input-error" id="name-place-error"></span>
            </div>
            <div className="popup__field">
                <input className="popup__text" placeholder="Ссылка на картинку"
                    type="url" ref={linkPlaceRef} required />
                <span className="popup__input-error" id="link-error"></span>
            </div>
        </PopupWithForm>
    ));
};

export default AddPlacePopup;
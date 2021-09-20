import React from 'react';
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
    const avatarLinkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarLinkRef.current.value
        });
    }

    return ((
        <PopupWithForm name="avatar" title="Обновить&nbsp;аватар" buttonName="Сохранить" isOpen={props.isOpen} closeAllPopups={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input type="url" className="popup__text"
                    placeholder="Введите ссылку"
                    required ref={avatarLinkRef} />
                <span className="popup__input-error" id="avatar-link-error"></span>
            </div>
        </PopupWithForm>
    ));
};

export default EditAvatarPopup;